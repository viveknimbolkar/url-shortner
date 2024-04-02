# use node:21.7.1-alpine3.19 as base image
FROM node:21.7.1-alpine3.19

# Set /app as working directory
WORKDIR /app

# Copy dependencies from current directory to /app directory in container
Copy package*.json ./

# Install all dependencies
RUN npm install

# Copy all files from current directory to /app directory in container
COPY . .

# Build the project
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the project
CMD ["npm", "run", "start"]
