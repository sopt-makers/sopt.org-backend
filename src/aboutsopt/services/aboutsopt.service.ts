import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutSopt } from "../entities/aboutsopt.entity";
import { Activity } from '../entities/activity.entity';

@Injectable()
export class AboutSoptService {
  constructor(
    @InjectRepository(AboutSopt)
    private aboutSoptRepository: Repository<AboutSopt>,

    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,

  ) {}
}