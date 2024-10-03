# Car-Wash-Shop

## Important Links

1. **Live Deployment Link :**

- [Live Server](https://car-washing-system-client-gilt.vercel.app)

2. **GitHub Repository Link :**

- [Client](https://github.com/mkmasudrana806/Car-Washing-System-Client.git)

- [Server](https://github.com/mkmasudrana806/car-wash-shop-backend.git)

## Introduction

`TurboShine` is a car wash shop project built on top of React, NodeJS, Typescript, Expressjs, Mongoose, and Redux with RTK Query. This is full stack project and fully functional with CRUD operations.

## Project Description

`Car wash shop` is built to leaverse the the fully functional ecommerce website. where there are user and admin management with different layout for their management. The main purpose of `Car wash shop` is to build an ecommerce system with user and admin management system and authorization system. all the routes are protected for the different user layer.

## Features

- Authentication and authorization
- Stripe payment system
- Protected routes and vast Error handling for different cases
- Service booking for different date
- Each service Reviews, Comments and FAQ

## Technology Stack

- List of technologies, frameworks, and tools used in the project are `React`, `Redux`, `RTK Query`, `Ant Design`, `Node.js`, `Expressjs`, `TypeScript`, `nodemailer`, `zod` validation, `bcrypt`, `cloudinary`, `dotenv`, `MongoDB`, `Multer` for static assets services, `JWT`, `etc. for details, check `package.json` file

## Prerequisites

- Ensure `nodejs` and `typescript` installed on your machine before

## Installation Guideline

`Note:` first install the backend project provided top of this readme file

To get the project up and running locally, follow these steps:

`Note:` before running the application, please include .env file root of your project. below is given instructions of it.

1. **Clone the repository:**

```bash
git clone https://github.com/mkmasudrana806/Car-Washing-System-Client.git
cd Car-Washing-System-Client
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npm run build
```

4. **Start the development server:**

```bash
npm run dev
```

## Usages Guidline

- keep in mind that after cloning the project,
  must replace `baseUrl` with the `https://localhost:5000/api` inside `baseApi.ts` file

```json
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5000/api',
});
```

## Environment Variables

Create a .env.local file in the root of the project and add your variables:

```bash
VITE_APP_STRIPE_PUBLISHABLE_KEY=pk_test_ add your strie publishable key
VITE_APP_STRIPE_SECRET_KEY=sk_test_ add your stripe secret key
```
