FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --verbose
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
