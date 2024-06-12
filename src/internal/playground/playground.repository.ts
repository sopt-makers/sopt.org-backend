import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { EnvConfig } from '../../configs/env.config';
import { GetPlaygroundUserInfoResponseDto } from './dto/get-playground-user-info-response.dto';
import {
  PlaygroundProjectAxiosResponseDto,
  PlaygroundProjectResponseDto,
} from './dto/playground-project-response.dto';
import { PlaygroundProjectDetailResponseDto } from './dto/playground-project-detail-response.dto';
import { MemberListResponseDto } from 'src/members/dtos/member-response.dto';
import { MemberRequestDto } from 'src/members/dtos/member-request.dto';
import { Cacheable } from '../../common/cache';

@Injectable()
export class PlaygroundRepository {
  private readonly API_URL: string;
  private readonly jwtToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.API_URL = this.configService.get('PLAYGROUND_API_URL') as string;
    this.jwtToken = this.configService.get(
      'PLAYGROUND_API_URL_JWT_TOKEN',
    ) as string;
  }

  async getUser(authToken: string): Promise<GetPlaygroundUserInfoResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<GetPlaygroundUserInfoResponseDto>(
          `${this.API_URL}/internal/api/v1/members/me`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        )
        .pipe(map((response) => response.data))
        .pipe(
          catchError((err) => {
            throw new InternalServerErrorException('API 서버 오류', err);
          }),
        ),
    );
  }

  @Cacheable({
    ttl: 24 * 60 * 60,
    validate: (value: any) => !(value instanceof Error),
  })
  async getAllProjects(): Promise<PlaygroundProjectResponseDto[]> {
    // TODO. 이거 무조오오오오오오오오건 수정해야한다...!!!!!!!!!!!!!!!!!!
    const limit = 20;
    let cursor = 0;
    let totalCount = 10;
    const response: PlaygroundProjectResponseDto[] = [];
    for (let i = 0; i < totalCount + 1; i = i + limit) {
      const projectData = await lastValueFrom(
        await this.httpService
          .get<PlaygroundProjectAxiosResponseDto>(
            `${this.API_URL}/api/v1/projects`,
            {
              headers: {
                Authorization: this.jwtToken,
              },
              params: {
                limit,
                cursor,
              },
            },
          )
          .pipe(
            map((res) => res.data),
            catchError((error) => {
              throw new InternalServerErrorException('Projcet API ' + error);
            }),
          ),
      );
      if (projectData.projectList.length === 0) break;
      totalCount = projectData.totalCount;
      response.push(...projectData.projectList);
      const lastDataIdx = projectData.projectList.length - 1;
      cursor = projectData.projectList[lastDataIdx].id;
      if (!projectData.hasNext) break;
    }
    return response;
  }

  async getProjectDetail(
    projectId: number,
  ): Promise<PlaygroundProjectDetailResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<PlaygroundProjectDetailResponseDto>(
          `${this.API_URL}/internal/api/v1/projects/${projectId}`,
          {
            headers: {
              Authorization: this.jwtToken,
            },
          },
        )
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new InternalServerErrorException('API ' + error);
          }),
        ),
    );
  }

  async getAllMembers({
    filter: part,
    generation,
  }: MemberRequestDto): Promise<MemberListResponseDto> {
    return await lastValueFrom(
      this.httpService
        .get<MemberListResponseDto>(
          `${this.API_URL}/internal/api/v1/official/members/profile`,
          {
            headers: {
              Authorization: this.jwtToken,
            },
            params: {
              filter: part,
              generation,
            },
          },
        )
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            console.error(`Get Member Failed: ${error}`);
            return of({
              members: [],
              numberOfMembersAtGeneration: 0,
            });
          }),
        ),
    );
  }
}
