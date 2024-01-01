import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findOne(id: number):Promise<Favorite> {
    return await this.favoriteRepository.findOneBy({id:id});
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto):Promise<Favorite> {
    const favorite=await this.favoriteRepository.findOneBy({id:id})
    return await this.favoriteRepository.save({
      ...favorite,
      ...updateFavoriteDto
    });
  }

  async remove(id: number):Promise<void> {
    await await this.favoriteRepository.delete(id);
  }
}
