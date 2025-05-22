import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './entities/sede.entity';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Injectable()
export class SedesService {
  constructor(
    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createSedeDto: CreateSedeDto): Promise<Sede> {
    try {
      const sede = this.sedeRepository.create(createSedeDto);
      await this.sedeRepository.save(sede);
      return sede;
    } catch (error) {
      throw new BadRequestException('No se pudo crear la sede');
    }
  }

  async findAll(): Promise<Sede[]> {
    return this.sedeRepository.find();
  }

  async findOne(uid: string): Promise<Sede> {
   try {
     const sede = await this.sedeRepository.findOneBy({ uid });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    return sede;
    
   } catch (error) {
    console.log(error)
    throw new BadRequestException('No se pudo encontrar la sede');
   }
  }

  async update(uid: string, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    const sede = await this.sedeRepository.findOneBy({ uid });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    const actualizado = this.sedeRepository.merge(sede, updateSedeDto);
    await this.sedeRepository.save(actualizado);
    return actualizado;
  }

  async remove(uid: string): Promise<void> {
    const sede = await this.sedeRepository.findOneBy({ uid });
    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }
    await this.sedeRepository.remove(sede);
  }
}
