FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env .env

# Добавляем устойчивость к скачиванию зависимостей
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set registry https://registry.npmjs.org/ \
    && npm config set legacy-peer-deps true

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

# Install envsubst
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Use envsubst to replace environment variables
CMD ["/bin/bash", "-c", "envsubst '${API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

EXPOSE 80