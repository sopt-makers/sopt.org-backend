import { ProjectsResponseDto } from '../projects/dtos/projects-response.dto';

export function compareProjects(
  a: ProjectsResponseDto,
  b: ProjectsResponseDto,
) {
  if (a.generation > b.generation) return -1;
  else return 1;
  // if (a.generation < b.generation) return 1;
  // else {
  //   if (a.name > b.name) return 1;
  //   else if (a.name < b.name) return -1;
  //   else return 0;
  // }
}
