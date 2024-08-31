# README

## Description
- Sopt Official NestJS 공홈 API 서버 입니다.
- Package Manager는  ```Yarn Package Manager``` 를 사용합니다.

## INDEX
1. [Getting Started](#Getting-started)
2. [Project Structure](#Project Structure)
3. [Deploy_Pipeline](#Deploy-Pipeline)

# Getting-started
### 서버 실행 환경
- Node v16
### 서버 실행
```bash
# Local
 npm run start:local 
```
```bash
# Dev
 npm run start:dev  
```
- env에 명시된 데이터베이스에 연결되어 서버를 실행합니다.

> env 과같은 환경 변수는 담당자에게 공유 받으세요.

### OpenAPI
> /api-docs

# Project Structure

아키텍처는 다음과 같이 형성되어있습니다.
## Architecture
![Sopt_Official_diagram drawio](https://github.com/user-attachments/assets/16103a1c-61c7-4d19-9e81-709aa9e29fc7)

- 인스턴스는 EC2 내부에서 동작합니다.
- EC2 내부에 Docker container가 존재합니다. 
- NestJS 의 경우, 3000:3000으로 포워딩 및 / route 에 매핑되어 있습니다.
- Spring Boot 의 경우, 8080:8080으로 포워딩 및 /v2 route 에 매핑되어 있습니다.
- Docker image는 AWS Public ECR 에서 관리하고 있고, 인수인계 시 AWS 계정에 PublicECR 관련 IAM Role 을 부여받아야 합니다.

Dev, Prod 모두 동일한 구조를 형성하고 있고, 리소스 차이밖에 없습니다.

## Deploy-Pipeline
- deploy pipeline은 github action을 이용하여 구성되어있습니다.
- github action은 ```./github/workflows``` 에서 확인할 수 있습니다.
- workflow 파일은 총 3가지가 있고, 각각 다음과 같은 역할을 합니다.
  1. ```ci.deploy.yml``` : develop 브랜치에 PR이 생성될때마다 실행됩니다. 테스트를 수행합니다.
  2. ```cd.develop.yml``` : develop 브랜치에 푸시(또는 머지)가 되었을때마다 수행합니다. develop 서버에 배포가 됩니다.
  3.  ```cd.prod.yml``` : main 브랜치에 푸시(또는 머지)가 되었을때마다 수행합니다. production 서버에 배포가 됩니다.
- ```cd.***.yml``` workflow는 다음과 같은 동작을 합니다.
  1. docker image를 빌드합니다.
  2. docker image를 ECR 에 push합니다.
  3. EC2에 ssh로 접속하여 ECR 에서 이미지를 pull합니다.
  4. EC2에서 실행중인 container를 종료합니다.
  5. docker container 를 실행합니다.
> GitAction 관련 Secret은, GitHub 관리자에게 문의하여 Owner권한을 획득 후, Repository secret에서 설정하시기 바랍니다. 자세한 설명은 별도로 공유드린 문서에서 확인 하실 수 있습니다.








