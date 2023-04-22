import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutSopt } from "../entities/aboutsopt.entity";

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private reviewsRepository: Repository<AboutSopt>,
  ) {}
}