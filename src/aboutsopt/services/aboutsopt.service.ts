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
    .createQueryBuilder(
      'AboutSopt',
    )
    .where('AboutSopt.id = :id', { id: id })
    .leftJoinAndSelect(
      "AboutSopt.activities", "activity"
    ) 
    .getOne();
    return aboutsopt
  }

  async postAboutSopt(
    aboutSoptPostDto: AboutSoptPostDto
  ):Promise<AboutSopt | null> {
    const id = aboutSoptPostDto.id
    const aboutsopt = await this.aboutSoptRepository
    .createQueryBuilder(
      'AboutSopt',
    )
    .where('AboutSopt.id = :id', { id: id })
    .getOne();

    if(aboutsopt){
      return this.updateAboutSopt(aboutSoptPostDto)
    }
    else{
      return this.createAboutSopt(aboutSoptPostDto)
    }
  }

  private async createAboutSopt(
    aboutSoptPostDto: AboutSoptPostDto
  ): Promise<AboutSopt | null>{
    await this.aboutSoptRepository.save(aboutSoptPostDto)
    const id = aboutSoptPostDto.id
    const aboutsopt = await this.getAboutSopt(id)
    
    return aboutsopt
  }

  private async updateAboutSopt(
    aboutSoptPostDto: AboutSoptPostDto
  ): Promise<AboutSopt | null>{
    const id = aboutSoptPostDto.id
    const updateaboutsopt = await this.aboutSoptRepository
    .createQueryBuilder(
      'AboutSopt',
    )
    .update(AboutSopt)
    .set({
      bannerImage: aboutSoptPostDto.bannerImage,
      coreDescription: aboutSoptPostDto.coreDescription,
      coreValue1: aboutSoptPostDto.coreValue1,
      coreValue2: aboutSoptPostDto.coreValue2,
      coreValue3: aboutSoptPostDto.coreValue3,
      planCurriculum: aboutSoptPostDto.planCurriculum,
      designCurriculum: aboutSoptPostDto.designCurriculum,
      androidCurriculum: aboutSoptPostDto.androidCurriculum,
      iosCurriculum: aboutSoptPostDto.iosCurriculum,
      webCurriculum: aboutSoptPostDto.webCurriculum,
      serverCurriculum: aboutSoptPostDto.serverCurriculum,
      
    })
    .where('AboutSopt.id = :id', { id: id })
    .execute();

    const aboutsopt = await this.getAboutSopt(id)
    return aboutsopt
    
  }

  async postActivity(
    activityRequestDto: ActivityRequestDto
  ): Promise<AboutSopt | null>{
    await this.activityRepository.save(activityRequestDto)
    const id = activityRequestDto.semester
    const aboutsopt = await this.getAboutSopt(id)
    return aboutsopt
  }
}