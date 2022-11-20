import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { PlaygroundProjectResponseDto } from 'src/projects/dtos/playground-project-response.dto';
import { Link } from 'src/projects/dtos/link';
import { Member } from 'src/projects/dtos/member';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { env } from 'src/utils/constants';

@Injectable()
export class projectsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  mockData: ProjectsResponseDto[] = JSON.parse(
    fs.readFileSync('src/mock/projects.json').toString(),
  );

  getApiUrl(): string {
    const apiUrl =
      this.configService.get(env.NODE_ENV) == env.production
        ? this.configService.get(env.PLAYGROUND_API_PROD_URL)
        : this.configService.get(env.PLAYGROUND_API_DEV_URL);

    if (!apiUrl) {
      throw new InternalServerErrorException(
        `API URL을 가져오는데 문제가 발생했습니다.`,
      );
    }

    return apiUrl;
  }

  getProjectResponseDto(
    response: PlaygroundProjectResponseDto,
  ): ProjectsResponseDto {
    const links: Array<Link> = response.links.map((data) => {
      const link: Link = {
        title: data.linkTitle,
        url: data.linkUrl,
      };
      return link;
    });

    const members: Array<Member> = response.members.map((data) => {
      const member: Member = {
        name: data.memberName,
        role: data.memberRole,
        description: data.memberDescription,
      };
      return member;
    });

    return {
      id: response.id,
      name: response.name,
      generation: response.generation,
      category: { project: response.category },
      startAt: response.startAt,
      endAt: response.endAt,
      serviceType: response.serviceType,
      isAvailable: response.isAvailable,
      isFounding: response.isFounding,
      summary: response.summary,
      detail: response.detail,
      logoImage: response.logoImage,
      thumbnailImage: response.thumbnailImage,
      projectImage: response.images ? response.images[0] : '',
      uploadedAt: new Date(response.createdAt),
      updatedAt: new Date(response.updateAt),
      link: links,
      members: members,
    };
  }

  async findAll(project: string): Promise<ProjectsResponseDto[]> {
    const res: ProjectsResponseDto[] = [];
    const projectApiPath = 'v1/projects';

    const apiUrl = this.getApiUrl();
    const jwtToken = this.configService.get(env.PLAYGROUND_API_JWT_TOKEN);

    const response = await firstValueFrom(
      this.httpService.get(apiUrl + projectApiPath, {
        headers: {
          Authorization: jwtToken,
        },
      }),
    );

    if (!response) {
      return [];
    }

    for (let i = 0; i < response.data.length; i++) {
      const data: PlaygroundProjectResponseDto = response.data[i];
      res.push(this.getProjectResponseDto(data));
    }

    if (project) {
      return res.filter((element) => element.category.project == project);
    }

    return res;
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
