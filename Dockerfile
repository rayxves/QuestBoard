
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
RUN npx tsx data_seeding.ts

FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/api ./api
COPY --from=builder /app/frontend/build ./frontend/build

ENV REACT_APP_API_URL=http://localhost:5000
ENV DATABASE_URL=postgresql://postgres:pkKFsgWnepGozAkHeQAilsqOLcrvGSnL@postgres.railway.internal:5432/railway
EXPOSE 5000

CMD ["node", "api/dist/index.js"]
