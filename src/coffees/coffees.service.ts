import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'rui xing coffee',
      brand: 'rui xing',
      flavors: ['vanilla', 'coco'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  create(createCoffeeDto) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto
  }

  update(id: number, updateCoffeeDto) {
    const exist = this.findOne(id);
    if (exist) {
    }
  }

  remove(id: number) {
    const index = this.coffees.findIndex(item => item.id === +id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
    }
  }
}
