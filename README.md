# NoteTaking

A note-taking web app built with Angular and Typescript.

Live URL: [link](some url)

## 📌 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Installing](#-installing)
- [💻 Running the Application](#-running-the-application)
- [📋 Approach](#-approach)
- [📸 Screenshots](#-screenshots)
- [🚀 Deployment](#-deployment)
- [👤 Author](#-author)

## 🚀 Getting Started

This project is built using Angular, SCSS, Typescript and hosted on Netlify.

## 🛠️ Tech Stack

- Angular
- RxJS
- Jasmine & Karma(test runner)
- Typescript
- SCSS

## 📦 Installing

Clone the repository and run the command:

```sh
git clone <project>
cd <project>
```

## 💻 Running the Application

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

**NB:** Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📸 Screenshots

## 📋 Approach

- Defined by project starting structue by creating folders for `services`, `components`, `models`, `pages`, `assets`, `utilities`, `environments`, etc.

- Create a `NoteService` to manage or handle CRUD operations

- Setup and connect to **supabase** to persist data

- Create an `AuthService` to handle auth functionalities such as login, logout, forgot password, etc.

- Implement authentication with Google Signin and Email, Password.

- Create tables in Supabase(Users, Notes, Tags)

- Implement CRUD operations for notes which includes joining and aggregating data from other tables

## 🚀 Deployment

Netlify

## 👤 Author

Victor Bruce
