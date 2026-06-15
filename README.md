# Discoverly

**Discoverly** is a swipe-first food discovery and ordering platform that helps users discover restaurants, explore meals, and complete purchases through a seamless mobile and web experience.

The platform combines a modern food discovery experience with Stellar-powered checkout, enabling fast, affordable, and transparent payment flows between customers and restaurants.

Discoverly is built around making food discovery more engaging by replacing traditional search-heavy restaurant browsing with an intuitive recommendation-driven experience.

## Core Features

## Food Discovery

Discoverly makes finding food simple and engaging through a swipe-first interface.

Users can:

* browse restaurants and meals,
* swipe through food recommendations,
* discover new restaurants,
* save preferences,
* interact with personalized suggestions,
* move directly from discovery to checkout.

The goal is to make choosing food feel more like discovery than searching.

---

## Customer Experience (Mobile)

The mobile app is the main customer-facing experience.

Users can:

* create and manage accounts,
* explore restaurants,
* view food listings,
* discover meals through swiping,
* manage preferences,
* place orders,
* complete payments,
* track purchase activity.

The mobile experience is optimized for quick interactions and everyday food discovery.

---

## Restaurant Experience (Web Dashboard)

The web application provides restaurants with the tools they need to manage their presence on Discoverly.

Restaurants can use the dashboard for:

* restaurant onboarding,
* profile management,
* menu creation and updates,
* food item management,
* order management,
* customer activity insights,
* payment tracking,
* business operations.

The web dashboard acts as the operational layer of the platform, allowing restaurants to manage the content and experiences customers interact with.

---

## Stellar-Powered Checkout

Discoverly uses Stellar as the payment infrastructure for transactions between customers and restaurants.

The Stellar integration enables:

* fast payment settlement,
* low transaction costs,
* wallet-based checkout,
* transaction verification,
* transparent payment history.

Stellar allows Discoverly to build a modern payment experience while keeping blockchain complexity behind the scenes.

---

# Tech Stack

Discoverly is built using a full-stack TypeScript architecture.

| Area               | Technology                              |
| ------------------ | --------------------------------------- |
| Mobile Application | Expo + React Native + TypeScript        |
| Web Dashboard      | React + TypeScript                      |
| Backend API        | Node.js + Express + TypeScript          |
| Database           | MongoDB + Mongoose                      |
| Blockchain         | Stellar                                 |
| File Storage       | AWS S3                                  |
| Architecture       | Mobile + Web + API + Blockchain Service |

---

# Repository Structure

```text
discoverly/
│
├── backend/                # Express API implementation
│
├── mobile/                 # Customer mobile application
│
├── web/                    # Restaurant dashboard application
│
├── docs/
│   └── adr/                # Architecture decision records
│
└── legacy/
    └── nest-backend/       # Archived legacy backend (read-only)
```

---

# Applications

## Backend

`backend/`

The backend provides the central API layer for Discoverly.

Responsibilities include:

* authentication,
* user management,
* restaurant management,
* food discovery APIs,
* menu data,
* order workflows,
* payment coordination,
* upload handling,
* Stellar transaction communication.

The backend uses Express, TypeScript, and MongoDB with Mongoose for data modeling.

---

## Mobile App

`mobile/`

The mobile application provides the customer experience.

Built with Expo and React Native, it handles:

* food discovery,
* swipe interactions,
* restaurant browsing,
* meal selection,
* checkout,
* payment interactions,
* user preferences.

The mobile app is designed around fast and simple customer interactions.

---

## Web Dashboard

`web/`

The web application provides restaurant-facing functionality.

The dashboard allows restaurants to manage their Discoverly presence and operations.

Planned capabilities include:

* restaurant onboarding,
* restaurant profile management,
* menu management,
* food item uploads,
* availability updates,
* order management,
* analytics,
* payment history.

The web app is focused on helping restaurants operate efficiently while providing accurate data for the customer discovery experience.

---

# Stellar Integration

Discoverly uses Stellar as the payment layer powering checkout.

The blockchain integration handles:

* wallet operations,
* payment creation,
* transaction submission,
* transaction confirmation,
* payment tracking.

The Stellar layer is separated from the core application logic to keep the system modular and easier to maintain.

---

# Backend Upload Service

The backend includes a media upload service for restaurant and food assets.

Current endpoint:

```http
POST /api/upload
```

Request:

* Content Type: `multipart/form-data`
* File field: `file`
* Maximum size: `5MB`

Storage:

```text
AWS S3
```

Required configuration:

```text
backend/.env.example
```

---

# Getting Started

## Requirements

Install:

* Node.js
* npm
* Docker (optional)
* Expo tooling
* MongoDB (or Docker)

---

# Installation

From the repository root:

```bash
npm run bootstrap
```

---

# Run Backend

```bash
cd backend

cp .env.example .env

npm run dev
```

---

# Run Web Dashboard

```bash
cd web

cp .env.example .env

npm run dev
```

---

# Run Mobile App

```bash
cd mobile

cp .env.example .env

npm run start
```

---

# Run Everything with Docker

From root:

```bash
docker-compose up --build
```

Health check:

```bash
curl http://localhost:5000/api/health
```

---

# Architecture Decisions

Major technical decisions are documented in:

```text
docs/adr/
```

These cover:

* system architecture,
* technology choices,
* backend patterns,
* Stellar integration decisions,
* scalability considerations.

---

# Product Vision

Discoverly aims to transform food discovery from a manual search experience into an engaging recommendation platform.

The roadmap focuses on:

1. Swipe-based food discovery.
2. Personalized recommendations.
3. Restaurant digital presence.
4. Restaurant management tools.
5. Seamless checkout.
6. Stellar-powered payments.
7. A complete food discovery ecosystem.

The long-term vision is to create a platform where customers discover food naturally and restaurants build stronger digital relationships with their customers.

## Repository Structure

```
apps/
  api/      # Express + TypeScript modular monolith (auth API)
  web/      # Next.js + TypeScript web app (login / create account)
  mobile/   # Expo + React Native + TypeScript foundation

packages/
  shared/   # Shared types & validation schemas (zod)
  stellar/  # Placeholder scaffold for future Stellar integration

.github/workflows/  # CI for each package
docs/                # Architecture, environment, testing, contributing
```

Each package's own README has package-specific details:
[apps/api](apps/api/README.md), [apps/web](apps/web/README.md),
[apps/mobile](apps/mobile/README.md).

---

## Local Development Setup

### Requirements

- Node.js 20+
- npm 10+
- MongoDB (only required to run the API outside of tests — tests use an
  in-memory database)

### Install

From the repository root:

```bash
npm install
```

This installs dependencies for every workspace (`apps/*`, `packages/*`).

### Build shared packages

`apps/api` and `apps/web` depend on `@discoverly/shared`. Build it once
after installing (and whenever you change it):

```bash
npm run build -w @discoverly/shared
```

---

## Running Applications

### API (`apps/api`)

```bash
cp apps/api/.env.example apps/api/.env
npm run dev -w @discoverly/api
```

The API listens on `http://localhost:5000` by default and exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)
- `GET /api/health`

### Web (`apps/web`)

```bash
cp apps/web/.env.example apps/web/.env
npm run dev -w @discoverly/web
```

Visit `http://localhost:3000/login` or `http://localhost:3000/register`.

### Mobile (`apps/mobile`)

```bash
cp apps/mobile/.env.example apps/mobile/.env
npm run start -w @discoverly/mobile
```

This launches Expo. The mobile app currently contains only the project
foundation (no screens yet).

---

## Running Tests

```bash
# everything
npm run test --workspaces --if-present

# individually
npm run test -w @discoverly/api
npm run test -w @discoverly/web
npm run test -w @discoverly/mobile
```

See [docs/testing.md](docs/testing.md) for details.

---

## Documentation

- [Architecture](docs/architecture.md) — modular monolith, package boundaries, conventions
- [Environment Setup](docs/environment.md) — required environment variables
- [Testing Guide](docs/testing.md) — running and writing tests, CI expectations
- [Contributor Guide](docs/contributing.md) — coding standards and workflow

---

## License

License information will be added before release.
