---
title: "빈차"
slug: "bincha"
category: "Personal Project"
period: "TODO: 프로젝트 기간 확인"
role: "Full-stack Developer"
summary: "할 일과 기억할 내용을 한곳에 기록하기 위해 만든 개인용 Todo 서비스입니다."
featured: false
order: 6
links:
  service: "http://bincha.vercel.app"
  repository: "https://github.com/zxcv2987/bincha"
tech:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "Supabase"
  - "Prisma"
  - "Zustand"
  - "JWT"
highlights:
  - "Next.js Route Handler 기반 API"
  - "Supabase와 Prisma를 이용한 데이터 관리"
  - "JWT 인증과 Middleware 접근 제어"
  - "재사용 가능한 모달과 폼 상태 관리"
---

# 빈차

## 한눈에 보기

노션에서 개인 기록, 팀 문서, 포트폴리오, 공부 자료를 함께 관리하면서 할 일만 빠르게 기록할 수 있는 단순한 도구가 필요해 시작한 개인 프로젝트입니다.

Next.js 안에서 사용자 화면, Route Handler API, 인증, 데이터베이스를 함께 구현하며 풀스택 구조를 학습했습니다.

## 주요 기능

- 로그인과 로그아웃
- 읽기 전용 화면과 개인 할 일 화면 분리
- 카테고리별 필터링
- 할 일과 카테고리 생성, 수정, 삭제
- 재사용 가능한 모달
- 폼 상태와 서버 액션 처리

## Frontend

- Composition 패턴을 적용한 모달 컴포넌트
- `useActionState` 기반 폼 상태 관리
- Zustand를 이용한 모달과 카테고리 전역 상태 관리
- 카테고리별 할 일 필터링

## Backend

- Next.js Route Handlers 기반 REST API
- JWT 로그인과 Refresh Token 발급
- Supabase PostgreSQL과 Prisma ORM을 이용한 CRUD
- `revalidateTag`를 이용한 변경 이후 캐시 무효화
- Middleware를 이용한 경로 접근 제어

## 문제 해결. 서버 내부 요청의 쿠키 전달

### 문제

서버 컴포넌트에서 내부 API를 호출할 때 API 응답의 `Set-Cookie` 헤더가 브라우저까지 자동으로 전달되지 않았습니다.

### 원인

서버에서 서버로 이루어진 요청의 응답 헤더는 최종 브라우저 응답과 별개이므로, 내부 API가 설정한 쿠키가 그대로 사용자 브라우저에 저장되지 않았습니다.

### 처리

인증 결과를 최종 사용자 응답을 만드는 계층에서 처리하도록 흐름을 변경했습니다.

> TODO: 실제 최종 구현이 Server Action의 서버 측 `cookies()` API인지 브라우저의 `document.cookie`인지 확인합니다. 공개 포트폴리오에는 검증된 방식만 기재하고, 인증 토큰이 클라이언트 JavaScript에서 접근 가능한 구조라면 보안상 한계와 개선 방향을 함께 적습니다.

## 회고

Next.js 안에서 프론트엔드와 API를 함께 구현하며 브라우저 요청, 서버 내부 요청, 최종 사용자 응답이 서로 다른 경계를 가진다는 점을 배웠습니다.

개인 학습 프로젝트인 만큼 대표 프로젝트보다는 기타 프로젝트로 간결하게 노출하고, 인증 흐름을 정확히 정리한 뒤 필요한 내용만 공개합니다.
