# money-master-api

Backend service for Money Master, a side project created by me (borja.tur@gmail) for learning purposes. Built following "Clean Architecture" principles described by Robert C. Martin (aka Uncle Bob), if you want to know more see https://github.com/borjatur/clean-architecture-fastify-mongodb and https://borjatur.com/2023/03/07/yet-another-vision-of-clean-architecture/ that was used as base template for building this project.

## What can you find in this project?

- [x] "Clean Architecture" principles in practice
- [x] Built in Typescript
- [x] Blazing fast Node.js framework, Fastify
- [x] Fancy auto generated docs using OpenAPI specification v3
- [x] MongoDB with Mongoose
- [x] Configured with Eslint and Jest out the box
- [x] Easy to reason about folder structure
- [ ] Testing (WIP)
- [ ] Authentication/Authorization (WIP)

## Live Demo
Visit https://money-master-api.borjatur.com/docs for a live demo of this project, you can also find the frontend application available at https://money-master.borjatur.com as a consumer of this API project

Those demo services are running on my own personal kubernetes cluster deployed in [![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg)](https://www.digitalocean.com/?refcode=e3a27deea2ac&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

There is some demo data available that will be restored in a scheduled base.

![demo gif](https://api.apify.com/v2/key-value-stores/VOER43I2UCXPHhEjk/records/money-master-api.borjatur.com-scroll_lossy-comp)

## Getting started

* docker-compose up --force-recreate --build

Or alternatively a mongodb instance running somewhere, update the connection url accordingly and:

* npm install
* npm run build && npm start
* visit http://localhost:5050/docs and enjoy!