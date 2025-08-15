# Node.js LTS version le rahe hain
FROM node:18-bullseye

# Puppeteer dependencies install karenge
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# App folder set karenge
WORKDIR /app

# Package files copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki files copy karo
COPY . .

# Puppeteer ko system Chromium ka path dena
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Port expose
EXPOSE 3000

# Start command
CMD ["node", "index.js"]

