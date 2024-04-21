# ---- Base Node ----
FROM node:16-alpine AS base
# Set working directory
WORKDIR /app
# Copy project file
COPY . .

# ---- Dependencies ----
FROM base AS dependencies
# Install build dependencies
RUN apk add --no-cache libc6-compat libstdc++ build-base python3
# Install node modules
RUN npm install
# If you are using yarn, replace the above RUN command with:
# RUN yarn install
# Copy prisma schema if you're using Prisma
COPY . .
# Install Prisma client, require DATABASE_URL environment variable for Prisma
# If DATABASE_URL is known and fixed at build time, you can uncomment and set it here
# ENV DATABASE_URL=your-database-connection-string
RUN npx prisma generate

# ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app
COPY . .
# Build static files
RUN npm run build

# ---- Release with Alpine ----
FROM node:16-alpine AS release
# Set working directory
WORKDIR /app
# Copy built node modules and binaries without including the devDependencies
COPY --from=dependencies /app/node_modules ./node_modules
# Copy the build output to serve with Next.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
# Pass DATABASE_URL to the runtime environment
# Replace <Your_Database_URL> with the actual database URL or pass it at runtime
ENV DATABASE_URL=postgres://burnwood:burnwood@hkokgoc:5432/burnwood
# Start your app
CMD ["npm", "start"]
