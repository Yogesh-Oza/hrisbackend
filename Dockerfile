# Use Node.js Alpine base image for a lightweight container
FROM node:alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire codebase to the working directory
COPY . .

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3000    

# Define the command to start your application (replace "start" if necessary)zz
CMD ["npm", "start"]
