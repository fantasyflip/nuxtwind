# Stage 1: Build the application
FROM node:22-alpine as build-stage

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY source/package.json source/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the rest of the application code
COPY source/. .

# Build the application
RUN pnpm build

# Stage 2: Serve the application
FROM node:22-alpine as production-stage

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build-stage /app/.output ./

# Start the application
CMD ["node", "server/index.mjs"]