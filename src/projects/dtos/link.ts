import { ApiProperty } from '@nestjs/swagger';

export class Link {
  @ApiProperty({
    type: String,
    required: true,
    description:
      '웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상 등 프로젝트에 관련된 링크의 종류',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: '링크의 url 주소',
  })
  url: string;
}
