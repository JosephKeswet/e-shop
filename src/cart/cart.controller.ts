import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CartService } from './cart.service';
import { AddItemDto, ClearCartDto, DecreaseQuantityDto, IncreaseQuantityDto, RemoveFromCartDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('api/cart')
export class CartController {
    constructor(private cartService: CartService,private prisma:PrismaService){}

    @Get('')
    getCart(@Query('userId') userId:string){
        return this.prisma.cart.findMany({
            where:{
                userId:parseFloat(userId)
            }
        })
    }

    @Delete('/delete')
    deleteItemFromCart(@Body() dto:RemoveFromCartDto){
        return this.cartService.removeFromCart(dto)
    }

    @Delete('/clear')
    clearCart(@Body() dto:ClearCartDto){
        return this.cartService.clearCart(dto)
    }

    @Post('/add')
    addItemToCart(@Body() dto:AddItemDto){
        return this.cartService.addItemToCart(dto)
    }

    @Put('/increase')
    increaseItemQuantity(@Body() dto:IncreaseQuantityDto){
        return this.cartService.increaseItemQuantity(dto)
    }

    @Put('/decrease')
    decreaseItemQuantity(@Body() dto:DecreaseQuantityDto){
        return this.cartService.decreaseItemQuantity(dto)
    }
}
