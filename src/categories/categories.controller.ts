import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/')
export class CategoriesController {
    constructor(private categoryService: CategoriesService){}

    @Get('/categories')
    getCategories(){
        return this.categoryService.getCategories()
    }

}
