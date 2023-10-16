import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from './products.service';

@Controller('api/product')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/all')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/single')
  getSingleProduct(@Query('id') id: string) {
    return this.productService.getSingleProduct(id);
  }

  @Get('/sortByCategory')
  sortByCategory(
    @Query('sortValue') sortValue: string,
    @Query('sortType') sortType: string,
  ) {
    return this.productService.sorting(sortValue, sortType);
  }

  @Get('/search')
  search(@Query('sortValue') sortValue: string) {
    return this.productService.search(sortValue);
  }
}
