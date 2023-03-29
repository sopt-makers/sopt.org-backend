import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';

import { HttpService } from '@nestjs/axios';
import { PlaygroundProjectResponseDto } from 'src/projects/dtos/playground-project-response.dto';
import { Link } from 'src/projects/dtos/link';
import { Member } from 'src/projects/dtos/member';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { dropDuplication } from 'src/utils/helper';
import { PlaygroundProjectDetailResponseDto } from '../dtos/playground-project-detail-response.dto';
import { ProjectsResponseDto } from '../dtos/projects-response.dto';
import { EnvConfig } from '../../configs/env.config';

@Injectable()
export class projectsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  getProjectDetailResponseDto(
    response: PlaygroundProjectDetailResponseDto,
  ): ProjectDetailResponseDto {
    const links: Array<Link> = response.links.map((data) => {
      const link: Link = {
        title: data.linkTitle,
        url: data.linkUrl,
      };
      return link;
    });

    let members: Array<Member> = [];

    if (response.members) {
      members = response.members.map((data) => {
        const member: Member = {
          name: data.memberName,
          role: data.memberRole,
          description: data.memberDescription,
        };
        return member;
      });
    }

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
      updatedAt: new Date(response.updatedAt),
      link: links,
      members: members,
    };
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

    return {
      id: response.id,
      name: response.name,
      generation: response.generation,
      category: { project: response.category },
      serviceType: response.serviceType,
      summary: response.summary,
      detail: response.detail,
      logoImage: response.logoImage,
      thumbnailImage: response.thumbnailImage,
      link: links,
    };
  }

  async findAll(project?: string): Promise<ProjectsResponseDto[]> {
    const res: ProjectsResponseDto[] = [];
    const projectApiPath = '/internal/api/v1/projects';

    const apiUrl = this.configService.get('PLAYGROUND_API_URL');
    const jwtToken = this.configService.get('PLAYGROUND_API_URL_JWT_TOKEN');

    const response = await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectResponseDto[]>(apiUrl + projectApiPath, {
          headers: {
            Authorization: jwtToken,
          },
        })
        .pipe(map((res) => res.data)),
    );

    // 중복제거 로직 : 추후 제거 예정
    const uniqueResponse: PlaygroundProjectResponseDto[] = dropDuplication(
      response,
      'name',
    );
    uniqueResponse.forEach((response) => {
      response.links = dropDuplication(response.links, 'linkId');
    });

    if (!uniqueResponse) {
      return [];
    }

    for (const data of response) {
      res.push(this.getProjectResponseDto(data));
    }

    if (project) {
      return res.filter((element) => element.category.project == project);
    }
    return res;
  }

  async findOne(projectId: number): Promise<ProjectDetailResponseDto> {
    const apiUrl = this.configService.get('PLAYGROUND_API_URL');
    const projectDetailApiPath = `/internal/api/v1/projects/${projectId}`;
    const jwtToken = this.configService.get('PLAYGROUND_API_URL_JWT_TOKEN');

    const response: PlaygroundProjectDetailResponseDto = await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectDetailResponseDto>(
          apiUrl + projectDetailApiPath,
          {
            headers: {
              Authorization: jwtToken,
            },
          },
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((error) => {
            throw new HttpException(
              'API ' + error.response.data.error,
              error.response.data.status,
            );
          }),
        ),
    );

    if (!response) {
      throw new InternalServerErrorException(
        `프로젝트 데이터를 가져오지 못했습니다.`,
      );
    }
    return this.getProjectDetailResponseDto(response);
  }
}
