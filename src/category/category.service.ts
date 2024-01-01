import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }
  
  async findAll():Promise<Category[]> {
    return await this.categoryRepository.find();
  }
  
  async findOne(id: number):Promise<Category> {
    return await this.categoryRepository.findOneBy({id:id});
    
  }
  
  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto)
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    const category=await this.categoryRepository.findOneBy({id:id});
    return this.categoryRepository.save({
      ...category,
      ...updateCategoryDto
    })
  }

  async remove(id: number):Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
