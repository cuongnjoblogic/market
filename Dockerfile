# Stage 1: Build the React app
FROM node:lts as builder

# Set working directory
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the create-react-app repository
RUN git clone https://github.com/cuongnjoblogic/market.git .

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the React app
RUN npm run build

# Stage 2: Create the production image
FROM nginx:latest

# Copy the build files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]