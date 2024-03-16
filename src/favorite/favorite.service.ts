import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository:Repository<Favorite>
  ){}

  async create(createFavoriteDto: CreateFavoriteDto):Promise<Favorite> {
    return await this.favoriteRepository.save(createFavoriteDto);
  }

  async findAll():Promise<Favorite[]> {
    return await this.favoriteRepository.find();
  }

  async findOne(product_id: number,user_id: number):Promise<Favorite> {
    return await this.favoriteRepository.findOne({where:{
      product_id:product_id,
      user_id:user_id
    }});
  }

  async findByUser(user_id: number):Promise<Favorite[]> {
    const result=await this.favoriteRepository
    .createQueryBuilder('favorite')
    .select(['favorite.user_id'])
    .leftJoinAndMapOne('favorite.product', Product, 'p', 'p.id = favorite.product_id')
    .where({user_id:user_id})
    .getMany()
    return result
  }

  async update(product_id: number,user_id: number, updateFavoriteDto: UpdateFavoriteDto):Promise<Favorite> {
    const favorite=await this.favoriteRepository.findOne({where:{
      product_id:product_id,
      user_id:user_id
    }});
    return await this.favoriteRepository.save({
      ...favorite,
      ...updateFavoriteDto
    });
  }

  async remove(id: number):Promise<void> {
    await await this.favoriteRepository.delete(id);
  }
}
