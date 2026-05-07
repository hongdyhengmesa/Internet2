import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      name: 'iPhone',
      price: 1200,
      categoryId: 1,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(
      product => product.id === id,
    );
  }

  create(data: any) {
    const product = {
      id: this.products.length + 1,
      ...data,
    };

    this.products.push(product);

    return product;
  }
}