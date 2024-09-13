# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json, yarn.lock, and NestJS configuration files to the working directory
COPY package*.json yarn.lock tsconfig*.json ./

# Install NestJS dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your application listens on
EXPOSE 3030

# Command to run your application using NestJS CLI
CMD ["yarn", "start:dev"]


