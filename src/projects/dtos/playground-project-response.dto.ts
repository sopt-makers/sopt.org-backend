import { ProjectType } from 'src/projects/dtos/category';
import { PlaygroundLink } from 'src/projects/dtos/playground-link';
import { PlaygroundMember } from 'src/projects/dtos/playground-member';
import { ServiceType } from 'src/projects/dtos/projects-response.dto';

type Category = ProjectType;

export class PlaygroundProjectResponseDto {
  id: number;
  name: string;
  writerId: number;
  generation: number;
  category: Category;
  startAt: Date;
  endAt: Date;
  serviceType: Array<ServiceType>;
  isAvailable: boolean;
  isFounding: boolean;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  members: Array<PlaygroundMember>;
  links: Array<PlaygroundLink>;
}
