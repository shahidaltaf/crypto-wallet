# Transaction List App

Build a React application that uses the mocked endpoints in this repo to fetch and display all of a users transactions
(BTC, ETH, Custodial/Fiat) in a single list with descending chronological order.

A simple React application made using React, Redux and TypeScript

Made without `create-react-app` 

## Getting started

After cloning this repo, navigate to the root director and run `yarn server` to launch the API server on [http://localhost:8888].

To launch the web app, run `yarn start`. This will launch automatically in your default browser.

## Features

- Filter list results using Coin, Type, Status and a keyword search
- UI built using `react-bootstrap` with mobile responsive design
- Run example unit tests using `yarn test`

## Backlog

- CI scripts (linting, testing, etc) 
- production and dev build configurations
- Pagination
- Restructure client and server applcation in a mono-repo architecture
- Refactor client api services to improve testability 