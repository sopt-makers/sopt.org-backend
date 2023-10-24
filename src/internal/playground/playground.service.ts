import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PlaygroundRepository } from './playground.repository';
import { GetPlaygroundUserInfoResponseDto } from './dto/get-playground-user-info-response.dto';
import { ProjectsResponseDto } from 'src/projects/dtos/projects-response.dto';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';
import { dropDuplication } from 'src/utils/helper';
import { Role } from './dto/playground-member';
import { PlaygroundProjectDetailResponseDto } from './dto/playground-project-detail-response.dto';
import { PlaygroundProjectResponseDto } from './dto/playground-project-response.dto';
import { Member } from './dto/member';
import { Link } from './dto/link';
import { MemberRequestDto } from 'src/members/dtos/member-request.dto';
import { MemberListResponseDto } from 'src/members/dtos/member-response.dto';

@Injectable()
export class PlaygroundService {
  constructor(private readonly playgroundRepository: PlaygroundRepository) {}

  async getPlaygroundUserInfoByToken(
    authToken: string,
  ): Promise<GetPlaygroundUserInfoResponseDto> {
    return await this.playgroundRepository.getUser(authToken);
  }

  private getProjectResponseDto(
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

  async getAllProjects(project?: string): Promise<ProjectsResponseDto[]> {
    const res: ProjectsResponseDto[] = [];

    const response = await this.playgroundRepository.getAllProjects();
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

  private getProjectDetailResponseDto(
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

  async getProjectDetail(projectId: number): Promise<ProjectDetailResponseDto> {
    const response = await this.playgroundRepository.getProjectDetail(
      projectId,
    );
    if (!response) {
      throw new InternalServerErrorException(
        `프로젝트 데이터를 가져오지 못했습니다.`,
      );
    }

    response.members.forEach((member) => {
      const role = member.memberRole;
      member.memberRole = Role[role as keyof typeof Role];
    });
    return this.getProjectDetailResponseDto(response);
  }

  async getAllMembersWithPart({
    filter: part,
    generation,
  }: MemberRequestDto): Promise<MemberListResponseDto> {
    return await this.playgroundRepository.getAllMembers({
      filter: part,
      generation,
    });
  }

  async getAllMembers({
    generation,
  }: MemberRequestDto): Promise<MemberListResponseDto> {
    return await this.playgroundRepository.getAllMembers({
      generation,
    });
  }
}
