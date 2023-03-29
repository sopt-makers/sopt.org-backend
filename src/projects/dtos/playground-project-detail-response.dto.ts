import { ServiceType } from './projects-response.dto';
import { PlaygroundMember } from './playground-member';
import { PlaygroundLink } from './playground-link';
import { ProjectType } from './category';

type Category = ProjectType;

export class PlaygroundProjectDetailResponseDto {
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
  createdAt: Date;
  updatedAt: Date;
  members: Array<PlaygroundMember>;
  links: Array<PlaygroundLink>;
}
