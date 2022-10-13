import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSemestersDetailDocs } from 'docs/semesters/semesters-detail.swagger';
import { SemestersDetailResponseDto } from 'src/semesters/dtos/semesters-detail-response.dto';

@Controller('semesters/:semesterId')
@ApiTags('SemesterDetail')
export class SemestersDetailController {
  @Get('')
  @GetSemestersDetailDocs()
  async getSemestersDetail(): Promise<SemestersDetailResponseDto> {
    const mockSemesterDetail: SemestersDetailResponseDto = {
      id: 30,
      color: '#8040FF',
      coreValue: ['실천', '연결', '발전'],
      coreImage: [
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/semester/core/img_30_01.png',
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/semester/core/img_30_02.png',
        'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/semester/core/img_30_03.png',
      ],
      history:
        " SOPT x KB금융지주 5th DNA 프로젝트\n 제7회 자체 무박2일 해커톤 'Sopkathon(솝커톤)' 진행(후원:네이버 D2, 레드불)\n 제20회 장기 해커톤 'AppJam(앱잼)' 개최(후원: ICT 콤플렉스, 프런트원)",
      members: {
        total: 185,
        parts: [
          {
            name: '기획파트',
            count: 34,
          },
          {
            name: '디자인파트',
            count: 34,
          },
          {
            name: '안드로이드파트',
            count: 30,
          },
          {
            name: 'iOS파트',
            count: 30,
          },
          {
            name: '웹파트',
            count: 22,
          },
          {
            name: '서버파트',
            count: 35,
          },
        ],
      },
      leaders: [
        {
          id: 1,
          part: '회장',
          name: '김규민',
          content:
            '안녕하세요, 30기 THE SOPT 회장 김규민입니다.\n\n여러분은 언제 가슴이 뛴다고 느끼시나요?\n모두 다르겠지만, 분명 좋아하는 무언가를 할 때일 것입니다.\n\n저는 바로 SOPT 활동을 하며 매 순간 가슴이 뛰었습니다.\n새로운 것에 도전하는 것이 좋았고, 함께 성장하며 이루 말할 수 없는 성취감을 느꼈습니다.\n\n실패를 두려워하지 않고 열정으로 가득찬 사람들\n그 속에서 우리는 무한한 가능성을 가지고 목표를 향해 달려갑니다.\n\n30기를 이끌어나갈 회장으로서 약속 드리겠습니다.\n\n여러분이 무엇이든 도전할 수 있는 기회의 장을 만들겠습니다.\n여러분의 곁에서 항상 응원하는 조력자가 되겠습니다.\n여러분에게 최고의 경험을 선사하겠습니다.\n\n이제는, THE SOPT의 매력에 빠질 시간입니다.',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_1_name_president.png',
        },
        {
          id: 2,
          part: '부회장',
          name: '황주희',
          content:
            '🔥 안녕하세요, 30기 THE SOPT 부회장 황주희입니다!\r\n\r\n아기는 평균 2,000번은 넘어져야 걷는 법을 배운다고 합니다.\r\n이렇듯 누구나 넘어지고 일어나기를 반복하며 성장합니다.\r\n\r\n지난 1년간 SOPT 안에서 끊임없이 도전하며, 넘어져도 다시 일어나는 법을 배웠습니다.\r\n이 과정에서 함께 성장하는 것이 얼마나 가치있는 일인지 느꼈습니다.\r\n\r\n더 많은 사람들이 넘어지길 두려워하지 않고 도전할 수 있으면 좋겠다고 생각했습니다.\r\n그리고 그 과정을 함께할 사람들이 있다면 더 용기낼 수 있을 것이라고 생각합니다.\r\n그렇기 때문에 여러분이 THE SOPT에서 많이 도전할 수 있으면 좋겠습니다.\r\n\r\n도전의 결과는 성공과 성장뿐입니다.\r\nTHE 많은 도전의 기회를 찾아 THE SOPT로 오신 여러분!\r\n함께 성장할 여러분을 THE 없이 환영합니다!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_2_name_v-president.png',
        },
        {
          id: 3,
          part: '총무',
          name: '김소연',
          content:
            '👋🏻 안녕하세요. 30기 THE SOPT 총무 김소연입니다.\r\n\r\nSOPT를 시작한 이후, 많은 것이 달라졌습니다.\r\n\r\nSOPT를 통해 새로운 사람들을 만나게 되었고,\r\n그들을 경험하고 열정을 주고 받으면서 함께 성장했습니다.\r\n\r\n부족한 것에 속상해하지 않고,\r\nSOPT의 사람들과 즐거운 추억을 만들면서 나아갈 수 있었습니다.\r\n\r\n많은 지식을 얻을 수 있었고 열정을 그리는 경험을 했습니다.\r\n제가 느낀 SOPT의 경험을 여러분들과 나누고 더 다채롭게 만들고 싶습니다.\r\n\r\n모두가 연결되어 발전을 실천하는, THE SOPT에서 함께 해요!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_3_name_g-affair.png',
        },
        {
          id: 4,
          part: '운영팀장',
          name: '장서현',
          content:
            '안녕하세요 30기 THE SOPT 운영팀장 장서현입니다.\r\n\r\n2020년 9월, 우연히 접한 SOPT는 제 20대 최고의 선물이 되었습니다.\r\n거리낌 없이 도움을 주고 받으며 함께 성장하는 즐거움, 우리의 생각을 현실에 그려가는 경험, 그리고 그 순간을 함께한 소중한 인연들까지\r\nSOPT에서의 시간은 ‘나’를 찾고 ‘우리’가 될 수 있던 시간들이었어요!\r\n\r\n이제는 여러분 차례입니다. 제가 받은 선물 같은 순간을 여러분과 나누고 싶습니다.\r\n\r\n우리의 열정을 실현할 수 있는 곳,\r\n우리 속의 나를 믿을 수 있는 곳,\r\n함께일 때 THE 즐거운, THE SOPT의 주인공이 되어주세요 🎨',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_4_name_manage.png',
        },
        {
          id: 5,
          part: '미디어팀장',
          name: '김루희',
          content:
            '안녕하세요. 30기 THE SOPT 미디어팀장 김루희입니다!\r\n\r\n25기 디자인파트 YB, 28기 iOS파트 OB, 29기 iOS파트 OB를 지나 벌써 30기까지 4번째 솝트를 앞두고 있는데요.\r\n\r\n개발의 ‘ㄱ’자도 몰랐던 제가 개발을 시작하고, 재미를 느끼게 된 것처럼\r\n30기 THE SOPT를 시작하는 여러분들도 저와 같은 경험을 느껴보셨으면 좋겠습니다.\r\n\r\n여러분들이 앞으로 경험할 THE SOPT에서의 크고 작은 소중한 기억들을 잘 담아보겠습니다.\r\n\r\n매순간 열정적인 솝트인들과 THE SOPT 함께 만들어나가봐요! 🙂 무~아~~요 🔥',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_5_name_media.png',
        },
        {
          id: 6,
          part: '기획파트장',
          name: '김두범',
          content:
            '안녕하세요, THE SOPT 30기 기획파트장 김두범입니다.\r\n\r\n여러분 모두 한번쯤 이런 서비스 있으면 좋겠다라는 생각을 해보시지 않았나요?\r\n\r\n내 머릿속 생각에서 그치는 것이 아니라 실제 실행을 통해 기획을 현실화해나가는 과정을 체험시켜드리고 싶습니다.\r\n\r\n린스타트업의 철학을 기반으로 한 가설 설정-실험-검증의 사이클, 기획문서의 작성, 개발자 디자이너와의 협업까지. 서비스 기획 일련의 과정을 함께 배워나가요.\r\n\r\n기획파트에 지원하기 위해 기획에 대해 잘 알지 못해도, 아이디어가 없어도 됩니다.\r\n여러분들은 열정, 그리고 그 열정을 이어나갈 수 있는 끈기와 책임감만 가져오세요.\r\n여러분들의 기획이 현실화될 수 있도록 제가 돕겠습니다.\r\n\r\n서비스를 통해 여러분 주위의 문제 한번 해결해보러 가시죠!\r\n\r\n혼자가 아닌 함께 성장해나가는 THE SOPT 30기 기획파트에서 여러분들을 기다리고 있겠습니다.',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_6_name_plan.png',
        },
        {
          id: 7,
          part: '디자인파트장',
          name: '박수아',
          content:
            '안녕하세요, 30기 THE SOPT 디자인 파트장 박수아입니다.\r\n\r\n지난 28기와 29기에 디자인 파트원으로서 진지하지만 재밌게 임하며 이런 것들을 고민했습니다.\r\n우리 파트에 더 필요한 것은 무엇이 있을까?\r\n더 나은 디자인 파트를 위해 내가 할 수 있는 일에는 무엇이 있을까?\r\n그러려면 솝트 내에서 다양한 것들을 겪어봐야 여러 시각에서 배울 수 있겠구나 생각했죠.\r\n\r\n그렇게 온 자리가 임원진이 되어 30기에는 새로운 시작을 하게 되었습니다.\r\n그리고 이제는 어떤 디자인 파트원들을 만나게 될까 마음껏 설렐 수 있는 하루 하루를 보내고 있어요.\r\n전공자든 비전공자든, UX/UI가 처음이든 익숙하든, 어느 한쪽에 치우치지 않고 모두에게 아낌없이 줄 수 있는 준비된 파트장이 되겠습니다.\r\n\r\n이런 저의 모습을 보고 여러분은 각자의 ‘꿈과 희망‘을 펼쳐주세요!\r\n그러면 여러분의 옆에 있는 파트원들도 나만의 것을 나누며 서로 연결되는 새로운 경험을 하게 될 테니까요.\r\n\r\n30기 디자인 파트는 이런 디자인 파트가 되면 좋겠습니다.\r\n처음 도전해 보는 디자인으로 기대되고, 이유 있는 디자인으로 더 단단해지고, 하고 싶은 디자인으로 나를 표현할 줄 아는 그런 파트!\r\n그런 파트가 바로 우리 디자인 파트였으면 좋겠습니다.\r\n\r\n애정 넘치는 마음으로 여러분을 기다리고 있겠습니다.\r\n늘 그렇듯 30기에는 THE 성장하는 디자이너가 되기를!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_7_name_design.png',
        },
        {
          id: 8,
          part: '안드로이드파트장',
          name: '이강민',
          content:
            '안녕하세요. 30기 THE SOPT 안드로이드 파트장 이강민입니다.\r\n\r\nSOPT활동을 하면서 많은 것을 얻었습니다.\r\n수많은 사람들을 만나며 열정을 얻을 수 있었고 많은 자극을 받았습니다.\r\n그리고 그것을 바탕으로 많은 성장을 할 수 있었습니다.\r\n\r\n이번 30기 THE SOPT에서는 제가 받은 많은 것들을 여러분에게 돌려주고자 합니다.\r\n30기 안드로이드 파트로 같이 활동하며 함께 성장해나갈 수 있었으면 좋겠습니다.\r\n\r\n저에겐 새로운 도전이 되겠지만 여러분과 함께 THE SOPT에서 도전하고 싶습니다.\r\n\r\n안드로이드에 관심이 있다면 성장하고자 하는 목표가 있다면 고민하지말고 도전해주세요.\r\n30기 안드로이드 파트를 같이 이끌었으면 좋겠습니다. 기다리겠습니다~!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_8_name_android.png',
        },
        {
          id: 9,
          part: 'iOS파트장',
          name: '김태현',
          content:
            '안녕하세요, 30기 THE SOPT iOS 파트장 김태현입니다.\r\n\r\n처음 iOS 공부를 시작했을 때가 생각이 납니다. iOS 개발 도구인 Xcode를 사용할 줄도 모르고, 모르는 것을 어떻게 검색해야 하는지도 잘 몰라서 원하는 화면 하나 만들기도 벅찼던 것 같습니다.\r\n\r\n그런데 SOPT에 들어오니 함께 하는 사람들이 있더라구요. 같이 배우고 또 성장하고, 끊임없이 나누고 공유해주는 사람들과 함께 하다보니 어느새 예전과는 다르게 많이 성장했습니다.\r\n\r\n혼자 해봤기에, 같이 해봤기에\r\n그래서 얻을 수 있었던 경험과 지식을 여러분과 나누고 싶습니다.\r\n\r\n두 기수 동안 SOPT와 좋은 사람들과 함께 하면서\r\n정말 많이 배우고 성장했고 행복했던 기억만 가득한데요.\r\n\r\n2022년 THE SOPT에서는 저 역시 좋은 사람이 되어\r\n여러분께 좋은 경험과 추억, 좋은 것들만 전해드리도록 노력하겠습니다.\r\n\r\niOS 앱 개발 기초부터 직접 서비스 설계 및 구현까지 해보고,\r\n다양한 사람들과의 협업을 통한 경험을 통해 멋진 개발자가 되어보는 것은 어떨까요?\r\n\r\n제가 최선을 다해 도와드리겠습니다.\r\n30기 THE SOPT iOS 파트에서 만나요!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_9_name_ios.png',
        },
        {
          id: 10,
          part: '웹파트장',
          name: '권혁진',
          content:
            '🙈 안녕하세요, 30기 THE SOPT 웹 파트장 권혁진입니다.\r\n\r\n29기 웹 파트는 제게 너무도 값진 시간이었습니다.\r\nSOPT가 아니었다면 절대 경험해보지 못했을 다양한 경험, 소중한 인연 그리고 새로운 지식. 이를 여러분들과 함께 나누고자 웹 파트장이라는 자리에 서게 되었습니다.\r\n\r\n30기 웹 파트에서는 웹 프론트엔드 개발자로 나아가기 위한 다양한 역량들을 학습하게 됩니다. 실력이 부족하더라도, 경험이 많지 않더라도 재미있게 학습할 수 있는 커리큘럼이 준비되어 있습니다.\r\n\r\n여러분들에게 웹이 그저 배우고 익혀야 하는 학습의 대상으로 남지 않았으면 합니다.\r\n원리를 파악하고 그 속에서 즐거움을 찾아낼 수 있는 탐구의 대상이 되었으면 좋겠습니다.\r\n\r\n여러분들의 준비물은 웹에 대한 관심과 열정, 이 두 가지뿐입니다.\r\n저 그리고 웹파트와 함께 프론트엔드 세계로 DEEP DIVE 해봐요!',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_10_name_web.png',
        },
        {
          id: 11,
          part: '서버파트장',
          name: '채정아',
          content:
            '안녕하세요, 30기 THE SOPT 서버 파트장 채정아입니다.\n\n‘성공이란 열정을 잃지 않고, 실패를 거듭할 수 있는 능력이다’\n란 윈스턴 처칠의 명언이 있습니다.\n열정만 있으면 무엇이든지 할 수 있다는 말이 와닿지 않을 수 있습니다.\n\n하지만 이곳은 SOPT 입니다.\n열정을 가지고, 실패를 두려워하지 않는 여러분은 도전 할 자격이 있습니다.\n\n저와 함께 막연하게만 느껴지던 개발의 세계로 도전해보세요!\n실패를 거듭한다 하더라도,\n여러분의 옆에는 같이 걸어주는 200명의 동료, 그리고 제가 있습니다.\n\n2번의 SOPT를 직접 경험하며 알게된 도전의 즐거움, 성장의 가치를 여러분과 나누고 싶습니다.\n\n서버 개발이 처음이라도, N번째라도 걱정하지마세요.\n누구에게나 새롭고, 유익하고, 진심인 서버 파트가 될 수 있도록 노력하겠습니다.\n\nTHE 나은 ‘나’를, THE 나은 ‘우리’를 마주하기 위해\nTHE SOPT에 오신 여러분을 진심으로 환영합니다.',
          image:
            'https://sopt-makers.s3.ap-northeast-2.amazonaws.com/mainpage/leader/time_30_order_11_name_server.png',
        },
      ],
    };
    return mockSemesterDetail;
  }
}
