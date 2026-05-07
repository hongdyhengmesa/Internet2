import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private categories = [
    { id: 1, name: 'Phone' },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(
      category => category.id === id,
    );
  }

  create(data: any) {
    const category = {
      id: this.categories.length + 1,
      ...data,
    };

    this.categories.push(category);

    return category;
  }
}