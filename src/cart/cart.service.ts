import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import {
  AddItemDto,
  ClearCartDto,
  DecreaseQuantityDto,
  IncreaseQuantityDto,
  RemoveFromCartDto,
} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type CartItem = {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  userId: number;
};

@UseGuards(JwtGuard)
@Injectable()
export class CartService {
  constructor(
    private productService: ProductsService,
    private prisma: PrismaService,
  ) {}

  async removeFromCart(dto: RemoveFromCartDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    const isProductFound = await this.prisma.cart.findUnique({
      where: {
        id: parseFloat(dto.productId),
      },
    });

    try {
      if (isUser) {
        if (isProductFound) {
          const deletedItem = await this.prisma.cart.delete({
            where: {
              id: parseInt(dto.productId),
              userId: dto.userId,
            },
          });

          if (deletedItem) {
            return {
              success: true,
              msg: 'Item successfully removed from cart',
            };
          }
        } else {
          throw new NotFoundException(`Product not found`);
        }
      } else {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
    } catch (error) {
      throw new NotFoundException({ msg: error.response.message });
    }
  }

  async clearCart(dto: ClearCartDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    try {
      if (isUser) {
        const deletedItems = await this.prisma.cart.deleteMany({
          where: {
            userId: dto.userId,
          },
        });

        if (deletedItems) {
          return {
            success: true,
            msg: 'Cart cleared',
          };
        }
      } else {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
    } catch (error) {
      throw new NotFoundException({ msg: error.response.message });
    }
  }

  async addItemToCart(dto: AddItemDto) {
    const product = await this.productService.getSingleProduct(dto.productId);
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    try {
      if (isUser) {
        const newCartItem = await this.prisma.cart.create({
          data: {
            category: product.category,
            description: product.description,
            id: product.id,
            image: product.thumbnail,
            price: product.price.toString(),
            title: product.title,
            userId: dto.userId,
            quantity: 1,
          },
        });

        return newCartItem;
      } else {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Product already in cart');
        }
      }
    }
  }

  async increaseItemQuantity(dto: IncreaseQuantityDto) {
    const productExistInCart = await this.prisma.cart.findUnique({
      where: {
        id: dto.productId,
      },
    });
    const currentQuantity = productExistInCart.quantity;

    try {
      if (productExistInCart) {
        const updatedItem = await this.prisma.cart.update({
          where: {
            id: dto.productId,
            userId: dto.userId,
          },
          data: {
            quantity: currentQuantity + 1,
          },
        });

        return updatedItem;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async decreaseItemQuantity(dto: DecreaseQuantityDto) {
    const productExistInCart = await this.prisma.cart.findUnique({
      where: {
        id: dto.productId,
      },
    });
    const currentQuantity = productExistInCart.quantity;

    try {
      if (productExistInCart) {
        if (currentQuantity <= 1) {
          return this.removeFromCart({
            productId: dto.productId.toString(),
            userId: dto.userId,
          });
        } else if (currentQuantity > 1) {
          const updatedItem = await this.prisma.cart.update({
            where: {
              id: dto.productId,
              userId: dto.userId,
            },
            data: {
              quantity: currentQuantity - 1,
            },
          });

          return updatedItem;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
