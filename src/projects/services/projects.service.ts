import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';

import { HttpService } from '@nestjs/axios';
import { PlaygroundProjectResponseDto } from 'src/projects/dtos/playground-project-response.dto';
import { Link } from 'src/projects/dtos/link';
import { Member } from 'src/projects/dtos/member';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { env } from 'src/utils/constants';
import { dropDuplication } from 'src/utils/helper';

@Injectable()
export class projectsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

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

  getJwtToken(): string {
    const jwtToken =
      this.configService.get(env.NODE_ENV) == env.production
        ? this.configService.get(env.PLAYGROUND_API_PROD_JWT_TOKEN)
        : this.configService.get(env.PLAYGROUND_API_DEV_JWT_TOKEN);

    if (!jwtToken) {
      throw new InternalServerErrorException(
        `JWT Token을 가져오는데 문제가 발생했습니다.`,
      );
    }

    return jwtToken;
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

  async findAll(project: string): Promise<ProjectsResponseDto[]> {
    const res: ProjectsResponseDto[] = [];
    const projectApiPath = 'v1/projects';

    const apiUrl = this.getApiUrl();
    const jwtToken = this.getJwtToken();

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

  async findOne(projectId: number): Promise<ProjectsResponseDto> {
    const apiUrl = this.getApiUrl();
    const projectDetailApiPath = `v1/projects/${projectId}`;
    const jwtToken = this.getJwtToken();

    const response: PlaygroundProjectResponseDto = await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectResponseDto>(apiUrl + projectDetailApiPath, {
          headers: {
            Authorization: jwtToken,
          },
        })
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
    return this.getProjectResponseDto(response);
  }
}
