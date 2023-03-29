import { ProjectsListResponseDto } from '../projects/dtos/projects-list-response.dto';

export function compareProjects(
  a: ProjectsListResponseDto,
  b: ProjectsListResponseDto,
) {
  if (a.generation > b.generation) return -1;
  else if (a.generation < b.generation) return 1;
  else {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  }
}
