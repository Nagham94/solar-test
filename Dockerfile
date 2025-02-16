# Use an official Node.js runtime as a parent image to build the app
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies, including rollup
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the app using rollup
RUN npm run build

# Use the official Nginx image to serve the app
FROM nginx:alpine

# Remove default Nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to Nginx's public directory
COPY --from=build /app/public/ /usr/share/nginx/html

# Set the correct permissions after copying
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
