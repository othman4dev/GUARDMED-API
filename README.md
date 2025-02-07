# GuardMed Backend CI/CD

This repository is a fork of Our Collaboration Project in [ANOM-Team](https://github.com/ANOM-Team/Backend-GuardMed.git) project, specifically created for implementing CI/CD pipeline and AWS EC2 deployment. The main repository is part of a collaborative project under the ANOM-Team organization.


## Purpose

This repository serves as a dedicated space for:
- Setting up CI/CD pipeline with GitHub Actions
- Implementing comprehensive unit tests

- Docker containerization
- AWS EC2 deployment configuration

## Original Project

The main project is developed collaboratively and can be found at:
[@ANOM-Team/Backend-GuardMed](https://github.com/ANOM-Team/Backend-GuardMed.git)

## Project Structure

- `src/` - Source code (NestJS application)
- `test/` - Test files
- `Dockerfile` - Docker configuration
- `.github/workflows/` - CI/CD pipeline configuration
- `docker-compose.yml` - Docker Compose configuration

## CI/CD Pipeline Features

- Automated testing
- Docker image building
- AWS EC2 deployment
- Environment configuration management

## Local Development

1. Clone the repository
2. Install dependencies
3. Start the NestJS application
4. Run tests

## Deployment

The application is automatically deployed to AWS EC2 when changes are pushed to the main branch.

## Environment Variables

Make sure to set up the following environment variables in your GitHub repository secrets:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
EC2_HOST
EC2_USERNAME
EC2_SSH_KEY
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN

## Note

This repository is for deployment purposes only. All feature development and main project contributions should be made to the [original repository](https://github.com/ANOM-Team/Backend-GuardMed.git).

  