# Use an official Node.js runtime as a parent image
FROM node:20.6.1-bullseye-slim AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build --prod

# Use a smaller base image for the production environment
FROM nginx:1.21.0-alpine

# Copy the built application to the nginx directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy the nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for the nginx server
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]