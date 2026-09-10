# Production Dockerfile for Aura AI Personal Stylist
FROM node:24-slim

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy package specifications
COPY package.json package-lock.json* ./

# Install dependencies (only production)
RUN npm ci --omit=dev || npm install --omit=dev

# Copy application code
COPY server/ ./server/
COPY assets/ ./assets/
COPY fonts/ ./fonts/
COPY index.html ./
COPY manifest.json ./
COPY flock.js ./
COPY config.js ./

# Create uploads and data directories
RUN mkdir -p /app/uploads /app/data

# Volume mount points for persistent storage and uploads
VOLUME ["/app/data", "/app/uploads"]

# Expose server port
EXPOSE 3000

# Start server
CMD ["node", "server/index.js"]
