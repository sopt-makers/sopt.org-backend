import { Injectable } from '@nestjs/common';
import { ProjectDetailResponseDto } from 'src/projects/dtos/project-detail-response.dto';
import { ProjectsResponseDto } from '../dtos/projects-response.dto';
import { PlaygroundService } from 'src/internal/playground/playground.service';

@Injectable()
export class ProjectService {
  constructor(private readonly playgroundService: PlaygroundService) {}

  async findAll(project?: string): Promise<ProjectsResponseDto[]> {
    const projects = await this.playgroundService.getAllProjects(project);
    return projects;
  }

  async findOne(projectId: number): Promise<ProjectDetailResponseDto> {
    const project = await this.playgroundService.getProjectDetail(projectId);
    return project;
  }

  async findByGeneration(generation: number): Promise<ProjectsResponseDto[]> {
    const projects = await this.findAll();
    return projects.filter((project) => project.generation === generation);
  }
}
