# React Apollo GraphQL Application

This project is a React application integrated with a GraphQL API using Apollo Client.
It demonstrates user authentication, account management, and supports multiple languages through internationalization.

## Purpose

The application serves as a template for building React applications that interacts with GraphQL backends.
It includes:

- User login and logout functionality.
- Fetching and displaying user account information.
- Internationalization support for multiple languages.
- Integration with Apollo Client for GraphQL operations.
- Unit testing with Jest and React Testing Library.

## Features

- User Authentication: Secure login and logout using JWT tokens.
- Account Information: Display user details retrieved from a GraphQL API.
- Internationalization (i18n): Multi-language support using `react-i18next`.
- GraphQL Integration: Utilize Apollo Client for seamless GraphQL queries and mutations.
- Routing: Navigate through the app using React Router v6.
- Styling: Modern UI components styled with Material-UI (MUI).
- Unit Testing: Robust testing suite with Jest and React Testing Library.

## How to Run the Project

### Prerequisites

- Node.js (version 18 or higher)
- npm or yan package manager
- GraphQL Backend: A running GraphQL API endpoint compatible with the app's queries and mutations.

### Installation and Setup

1. Clone the Repository
   `git clone https://github.com/yourusername/yourproject.git
cd yourproject
`

2. Install Dependencies
   `npm install`

3. Run the application

`npm start`

## Running the Test

`npm test`

## Key Components

- AccountScreen.tsx: Displays user account information fetched from the GraphQL API.
- LoginScreen.tsx: Handles user authentication.
- AuthContext.tsx: Provides authentication state and functions throughout the app.
- apollo/client.ts: Configures Apollo Client with the GraphQL endpoint.
- i18n.ts: Sets up internationalization support.
- LanguageSwitcher.tsx: Allows users to switch between supported languages.
