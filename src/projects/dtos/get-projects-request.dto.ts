import { IsEnum, IsOptional } from 'class-validator';
import { ProjectType } from './category';
import { ServiceType } from './projects-response.dto';

export class GetProjectsRequestDto {
  @IsEnum(ProjectType)
  @IsOptional()
  readonly filter: ProjectType | null;

  @IsEnum(ServiceType)
  @IsOptional()
  readonly platform: ServiceType | null;
}
