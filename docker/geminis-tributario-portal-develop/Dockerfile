FROM node:16 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/sam /usr/share/nginx/html

# Expose port 80
EXPOSE 80
