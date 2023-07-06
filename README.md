# Scalable Full Stack Next.js Application Template

#### Summary
This repository template provides a production-ready foundation for creating a full stack Next.js application. It includes a comprehensive set of technologies and tools to help you develop and deploy your application efficiently.

## Technologies Included
### Next.js (TypeScript version)
[Next.js](https://github.com/vercel/next.js) is a popular React framework that allows you to build server-rendered React applications. This template utilizes the most up-to-date stable version of Next.js with TypeScript, which provides static typing and improved development experience for catching errors and refactoring code.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Storybook
[Storybook](https://github.com/storybookjs/storybook) is a powerful tool for developing UI components in isolation. It enables you to build and test React components independently, providing a visual representation of your components. This template incorporates the latest stable version of Storybook, allowing you to iterate and maintain your UI components with ease.

### MongoDB
[MongoDB](https://github.com/mongodb/mongo) is a scalable and flexible NoSQL database that seamlessly integrates with Next.js applications. This template includes support for the latest stable version of MongoDB, empowering you to store and retrieve data, perform complex queries, and leverage its document-based model for efficient data management.

### NextAuth.js
[NextAuth.js](https://github.com/nextauthjs/next-auth) is a popular authentication library for Next.js applications. It simplifies the implementation of authentication mechanisms, including various providers such as Google, Facebook, and GitHub. This template integrates the most up-to-date stable version of NextAuth.js, allowing you to easily add authentication to your application.

### Next-Translate
[next-translate](https://github.com/aralroca/next-translate) is a localization and internationalization library for Next.js applications. It provides a seamless way to add multilingual support to your application, enabling you to easily translate your content into different languages. This template includes the latest stable version of Next-Translation, facilitating the development of localized applications.

### Recoil (State Management)
[Recoil](https://github.com/facebookexperimental/Recoil) is a state management library for managing application state in React applications. It provides an intuitive API and a set of powerful features for managing complex state requirements. This template incorporates the most up-to-date stable version of Recoil, enabling you to efficiently handle and synchronize state across your Next.js components.

### Framer Motion
[Framer Motion](https://github.com/framer/motion) is a library that allows you to create smooth and interactive animations in your React applications. It offers a simple API for defining and controlling animations, enhancing the user experience. This template utilizes the latest stable version of React Motion, enabling you to easily incorporate fluid animations into your Next.js application.

### React Icons
[React-Icons](https://github.com/react-icons/react-icons) is a library that offers a wide range of popular icon packs as React components. It simplifies the process of including icons in your application by providing a vast collection of pre-built icons. This template utilizes the most recent stable version of React Icons, allowing you to easily include high-quality icons in your Next.js application.

### Prettier
[Prettier](https://github.com/prettier/prettier) is a code formatting tool that helps maintain consistent and visually appealing code styles across your project. It automatically formats your code based on a set of predefined rules, ensuring that the codebase remains neat and readable.

### Husky
[Husky](https://github.com/typicode/husky) is a Git hook manager that automates tasks before or after specific Git events. In this template, Husky is used to enforce code quality and standards by running linting and formatting checks before committing your code. It ensures a consistent codebase and prevents committing code that doesn't meet project guidelines. This template uses the most recent stable version of Husky.

## Getting Started

To get started with this template, you have two options:

### Option 1: Create a Repo on GitHub
1. Go to the GitHub repository creation page.
2. Click on the "Add Repo" button.
3. In the repository creation form, click on "Select Template".
4. Search for and select this template.
5. Provide a name and description for your repository.
6. Click on "Create repository" to create a new repository based on this template.

### Option 2: Download the Repo
1. Download this repository to your local machine by clicking on the "Download" button or using the Git clone command.
2. Extract the downloaded zip file (if applicable) and navigate to the project's root directory in your terminal.

After setting up the repository, follow these steps to initialize and run your Next.js application:

1. Install the project dependencies by running the following command:
```bash
npm install
```

2. Prepare the project by running the following command:
```bash
npm run prepare
```

3. Create an environment file (.env) in the root of your project and populate it with the necessary configuration values:

```bash
NODE_ENV=development
NEXTAUTH_URL=http://127.0.0.1:3000
JWT_SECRET=<secret_token>

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster.code>.mongodb.net/

GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
FACEBOOK_CLIENT_ID=<FACEBOOK_CLIENT_ID>
FACEBOOK_CLIENT_SECRET=<FACEBOOK_CLIENT_SECRET>
```
Make sure to keep this file secure and not commit it to version control.

4. Start the development server by running the following command:
```bash
npm run dev
```
This will launch your Next.js application and make it accessible at http://localhost:3000 by default.

You are now ready to start developing your full stack Next.js application! Customize and expand upon the provided template to suit your project's requirements. Happy coding!


## Learn More

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
