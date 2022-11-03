import { ApiProperty } from '@nestjs/swagger';

export enum ProjectType {
  APPJAM = 'APPJAM',
  SOPKATHON = 'SOPKATHON',
  SOPTERM = 'SOPTERM',
  STUDY = 'STUDY',
  JOINTSEMINAR = 'JOINTSEMINAR',
  ETC = 'ETC',
}

export class Category {
  @ApiProperty({
    enum: ProjectType,
    required: true,
  })
  project: ProjectType;
}
