import { ProjectType } from 'src/projects/dtos/category';
import { PlaygroundLink } from 'src/projects/dtos/playground-link';
import { ServiceType } from './projects-response.dto';

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
  links: PlaygroundLink[];
}
