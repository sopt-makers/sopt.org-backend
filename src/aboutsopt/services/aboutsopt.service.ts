import { ActivityRequestDto } from './../dtos/activity-request.dto';
import { AboutSoptPostDto } from './../dtos/aboutsopt-post.dto';
import { AboutSoptResponseDto } from './../dtos/aboutsopt-response.dto';
import { AboutSoptRequestDto } from './../dtos/aboutsopt-request.dto';
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

  async getAboutSopt(
    aboutSoptRequestDto: AboutSoptRequestDto | number,
  ): Promise<AboutSopt | null> {
    let id = 0;
    if (typeof(aboutSoptRequestDto) === 'number') {
      id = aboutSoptRequestDto
    }
    else{
      id = aboutSoptRequestDto.id
    }
    const aboutsopt = await this.aboutSoptRepository
    .findOne({
      where: { id: id, isPublished:true },
    })
    return aboutsopt
  }

  async getOrInit(
    aboutSoptRequestDto: AboutSoptRequestDto | number,
  ): Promise<AboutSopt | null> {
    let id = 0;
    if (typeof(aboutSoptRequestDto) === 'number') {
      id = aboutSoptRequestDto
    }
    else{
      id = aboutSoptRequestDto.id
    }
    const aboutsopt = await this.aboutSoptRepository
    .findOne({
      where: { id: id },
    })

    if(!aboutsopt){
      return this.initializeAboutSoptById(id)
    }

    return aboutsopt
  }

  private async initializeAboutSoptById(id: number): Promise<AboutSopt | null> {
    await this.aboutSoptRepository.save({id})
    return this.aboutSoptRepository.findOne({where: { id: id }});
  }

  async postAboutSopt(
    aboutSoptPostDto: AboutSoptPostDto
  ):Promise<AboutSopt | null> {
    const aboutsopt = await this.aboutSoptRepository.save(aboutSoptPostDto)

    const activities = aboutSoptPostDto.activities.map(async (activity)=>{
      console.log(activity)
      return this.activityRepository.save(activity)
    })
    const temp = await Promise.all(activities)
    console.log(temp)
    const id = aboutSoptPostDto.id
    return await this.getOrInit(id)

  }

}