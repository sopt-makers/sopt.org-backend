import { ProjectType } from 'src/projects/dtos/category';
import { PlaygroundLink } from 'src/internal/playground/dto/playground-link';
import { ServiceType } from 'src/projects/dtos/projects-response.dto';

type Category = ProjectType;

export class PlaygroundProjectResponseDto {
  id: number;
  name: string;
  generation: number;
  category: Category;
  serviceType: ServiceType[];
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  isAvailable: boolean;
  isFounding: boolean;
  links: PlaygroundLink[];
}
