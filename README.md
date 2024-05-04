# E-commerce

## Project Description

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence.

Users can browse through a vast range of products, view detailed descriptions, add their favorite items to the basket, and proceed to checkout. It includes features such as user registration and login, product search, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

The application is powered by CommerceTools, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

## Technology stack used in development

- Webpack
- TypeScript
- React
- Jest
- ESLint
- Prettier
- Husky

## Scripts descriprion

- _prod-build_ - creates a prod build in the dist folder
- _dev-build_ - creates a dev build in the dist folder
- _dev_ - starts the server on localhost
- _lint_ - runs ESLint checks
- _lint:fix_ – runs checks and fixes for simple ESLint errors
- _prettier_ – runs Prettier checks
- _prettier:format_ - runs checks and fixes for simple Prettier errors
- _test_ – starts execution of tests (can be limited to a specific file)
- _prepare_ – initializes the husky operation
- _lint-staged_ - runs lint:fix and prettier:format on files from src in stage area
- _validate-branch-name_ – checks the branch (you cannot push in main/develop/release)

## Husky hooks description

- _pre-commit_ – the _lint-staged_ script is triggered
- _pre-push_ – the _validate-branch-name_ script is triggered

## Getting started with your local repository

1) Clone the repository - either through _the vscode button_ or through _git clone_
2) Go to the current sprint branch - _git checkout release/(release name)_
3) Add the latest changes - _git pull_
4) Install all dependencies to work - _npm install_