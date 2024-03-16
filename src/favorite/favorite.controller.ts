import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto):Promise<Favorite> {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll():Promise<Favorite[]> {
    return this.favoriteService.findAll();
  }

  @Get('/get-by-user/:id')
  findByUser(@Param('id') id:number):Promise<Favorite[]> {
    return this.favoriteService.findByUser(id);
  }

  //----/get?product=1&user=2
  @Get('/get?')
  findOne(@Query('product') product_id: number,@Query('user') user_id: number):Promise<Favorite> {
    return this.favoriteService.findOne(product_id,user_id);
  }

  //----/update?product=1&user=2
  @Patch('/update?')
  update(@Query('product') product_id: number,@Query('user') user_id: number, @Body() updateFavoriteDto: UpdateFavoriteDto):Promise<Favorite> {
    return this.favoriteService.update(+product_id,user_id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.favoriteService.remove(+id);
  }
}
