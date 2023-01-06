# Getting Started

## Create .env file
Staging
```
touch .env.staging
```

Production
```
touch .env.production
```

## Fill out configuration
Enter the following configurations into the .env file:
```
DB_CLIENT=postgres
DB_HOST=xxx
DB_PORT=xxx
DB_USER=xxx
DB_SECRET=xxx
DB_NAME=xxx
```
Replace `xxx` with your own configuration.

## Install dependencies
Execute the following command in your terminal:
```
yarn install
```

## Run development server
Execute the following command in your terminal:
```
yarn dev-staging // run the dev server with .env.staging configuration

// or

yarn dev-production // run the dev server with .env.production configuration
```

## Build the project
Execute the following command in your terminal:
```
yarn build
```
This command will give you an output of `dist` directory.

## Serve
Execute the following command in your terminal:
```
yarn start-staging // run the build output with .env.staging configuration

// or

yarn start-production // run the build output with .env.production configuration
```
