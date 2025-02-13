
FROM node:18 AS builder

WORKDIR /app

COPY api ./api
WORKDIR /app/api

RUN npm install
RUN npm install -g typescript --save-dev

RUN tsc

WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend

RUN npm install && npm run build

FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/api ./api
COPY --from=builder /app/frontend/build ./frontend/build

ENV REACT_APP_API_URL=http://localhost:5000

EXPOSE 5000

CMD ["node", "api/dist/index.js"]
