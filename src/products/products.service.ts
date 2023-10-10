import { Injectable, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { JwtGuard } from 'src/auth/guard';

@Injectable()
export class ProductsService {
  async getProducts() {
    const { data } = await axios.get('https://dummyjson.com/products');
    return data;
  }

  async getSingleProduct(id) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const { data } = response;
      return data;
    } catch (error) {
      // Handle the error here
      console.error('Error fetching product:', error);
      // You can throw the error further or return a custom error response
      throw error;
    }
  }

  async sorting(sortValue: string | number, sortType: string) {
    const priceSortType = 'price';
    const categorySortType = 'category';

    const apiProducts = await this.getProducts();
    const products = apiProducts?.products;

    if (!products || !Array.isArray(products)) {
      // Handle the case where products are not available or not an array
      return [];
    }

    const sortByCategory = () => {
      return products.filter((product) => product.category === sortValue);
    };

    const sortByPrice = () => {
      const filteredProducts = products.filter(
        (product: any) => product.price <= sortValue,
      );
      return sortValue >= standard.high
        ? filteredProducts.sort((a, b) => b.price - a.price)
        : filteredProducts.sort((a, b) => a.price - b.price);
    };

    const standard: { low: number | string; high: number | string } = {
      low: 10,
      high: 200,
    };

    if (sortType === categorySortType) {
      return sortByCategory();
    } else if (sortType === priceSortType) {
      return sortByPrice();
    } else {
      // Handle other sort types if needed
      // You can add more conditions for different sort types here
      return [];
    }
  }

  // async search(sortValue:string) {
  //   const apiProducts = await this.getProducts();
  //   const products = apiProducts?.products;
  //   const sortedProducts = products?.filter((product:any) => {
  //     const lowercaseName = product?.title.toLowerCase();
  //     const lowercaseSortValue = sortValue.toLowerCase();
  //   })
  // }
}
