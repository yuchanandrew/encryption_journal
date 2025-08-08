# Run with latest node build
FROM node:20.12.2

# Connect it to the working directory
WORKDIR /server

# Copy over package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all steps across all containers
COPY . .

# Add the server's port
ENV PORT=3000
EXPOSE 3000

# Gets the actual container to run
CMD [ "npm", "start" ]