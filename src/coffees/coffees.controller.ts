import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    console.log(protocol);
    // await new Promise(resolve => setTimeout(resolve, 4000));
    return this.coffeesService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(':Nest:');
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
