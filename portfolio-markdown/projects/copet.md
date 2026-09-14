---
title: "코펫"
slug: "copet"
category: "Team Project"
period: "TODO: 프로젝트 기간 확인"
role: "Flutter Developer"
team: "TODO: 팀 구성 확인"
summary: "반려동물 커뮤니티와 산책 기록 기능을 제공하는 Flutter 애플리케이션입니다."
featured: false
order: 5
links:
  repository: "https://github.com/woomae/copet/tree/develop"
tech:
  - "Flutter"
  - "Dart"
  - "Riverpod"
  - "Naver Map"
  - "WebView"
highlights:
  - "로그인·커뮤니티·지도 주요 화면 구현"
  - "Riverpod 기반 상태 관리"
  - "실시간 위치 추적과 산책 경로 기록"
  - "Flutter WebView 카카오 OAuth 연동"
---

# 코펫

## 한눈에 보기

반려동물 보호자가 커뮤니티에서 정보를 공유하고 산책 경로를 기록할 수 있는 Flutter 애플리케이션입니다.

로그인, 커뮤니티, 지도 등 주요 화면과 상태 흐름을 구현했으며, 네이버 지도와 위치 권한을 이용한 산책 기록 기능을 개발했습니다.

## 담당 범위

### Flutter App

- 로그인, 커뮤니티, 지도 주요 화면 구성
- Riverpod 기반 전역 상태 관리
- Future와 FutureBuilder를 이용한 비동기 데이터 처리
- Flutter WebView를 통한 카카오 OAuth 연동
- 로그인 이후 토큰 처리와 사용자 정보 조회
- 실시간 위치 추적과 위치 권한 처리
- 지도 위 산책 경로 표시

### Web

- 반응형 랜딩 페이지 구현
- 전체 화면 스크롤 인터랙션 구현
- `useScroll` 커스텀 훅을 이용한 섹션 전환

## 산책 기록 기능

Naver Mobile Dynamic Map API를 사용해 현재 위치를 지도에 표시하고 이동 경로를 기록했습니다.

- 위치 권한 요청과 상태 처리
- 실시간 위치 변화 구독
- 산책 경로 오버레이 표시
- 산책 시간과 경로 상태 관리

## 인증

Flutter WebView에서 카카오 로그인 페이지를 열고 OAuth 완료 이후 앱의 인증 흐름과 연결했습니다.

> TODO: WebView와 서버 사이의 쿠키·토큰 전달 구조를 공개 가능한 범위에서 정확하게 정리합니다.

## 회고

웹 프론트엔드와 달리 모바일 앱에서는 위치 권한, 앱 생명주기, 네이티브 플러그인과 비동기 상태가 함께 움직입니다.

지도와 산책 상태를 구현하며 화면이 사라진 이후의 비동기 작업, 권한 거부, 위치 수신 실패 등 정상 흐름 밖의 상태를 함께 다뤄야 한다는 점을 경험했습니다.
