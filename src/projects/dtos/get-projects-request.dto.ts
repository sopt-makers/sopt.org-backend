import { IsEnum, IsOptional } from 'class-validator';
import { ProjectType } from './category';
import { ServiceType } from './projects-response.dto';
import { PageRequest } from '../../utils/paginate-request.dto';

export class GetProjectsRequestDto extends PageRequest {
  @IsEnum(ProjectType)
  @IsOptional()
  readonly filter: ProjectType | null;

  @IsEnum(ServiceType)
  @IsOptional()
  readonly platform: ServiceType | null;
}
