import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

import * as fs from 'fs';

@Injectable()
export class projectsService {
  mockData: ProjectsResponseDto[] = JSON.parse(
    fs.readFileSync('src/mock/projects.json').toString(),
  );

  async findAll(project: string): Promise<ProjectsResponseDto[]> {
    if (!this.mockData)
      throw new InternalServerErrorException('mock 데이터가 없습니다.');

    if (project) {
      return this.mockData.filter(
        (element) => element.category.project == project,
      );
    }

    return this.mockData;
  }

  async findOne(projectId: number): Promise<ProjectsResponseDto> {
    if (!this.mockData)
      throw new InternalServerErrorException('mock 데이터가 없습니다.');

    const result = this.mockData.find((element) => element.id == projectId);
    if (!result)
      throw new NotFoundException('해당 id의 데이터를 찾을 수 없습니다.');

    return result;
  }
}
