FROM node:20

WORKDIR /usr/src/app

# Copy only package files to install dependencies first
COPY package*.json ./

# Clean install (npm ci fails if node_modules exists)
RUN npm ci

# Now copy the rest of the app (excluding node_modules via .dockerignore)
COPY . .

USER node

CMD ["npm", "run", "dev", "--", "--host"]


