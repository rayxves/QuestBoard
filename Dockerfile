
FROM node:18 AS builder

WORKDIR /app

COPY api ./api
WORKDIR /app/api

RUN npm install
RUN npm install -g typescript --save-dev
RUN npx tsx data_seeding.ts

RUN tsc

WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend

RUN npm install && npm run build

FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/api ./api
COPY --from=builder /app/frontend/build ./frontend/build

EXPOSE 5000
EXPOSE 3000

ENV REACT_APP_API_URL=http://localhost:5000
ENV DATABASE_URL=postgresql://postgres:pkKFsgWnepGozAkHeQAilsqOLcrvGSnL@monorail.proxy.rlwy.net:43147/railway

WORKDIR /app/api

CMD ["npm", "start"]