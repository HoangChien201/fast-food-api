import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto):Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  async findAll():Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        category: true,
    },
    })
  }

  async findOne(id: number):Promise<Product> {
    return this.productRepository.findOneBy({id:id});
  }

  async update(id: number, updateProductDto: UpdateProductDto):Promise<Product | null> {
    const product=await this.productRepository.findOneBy({id:id})
    return this.productRepository.save({
      ...product,
      ...updateProductDto
    });
  }

  async remove(id: number):Promise<void> {
    await this.productRepository.delete(id)
  }
}
