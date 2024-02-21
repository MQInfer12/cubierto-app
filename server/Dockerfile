FROM node:18 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18

ENV DATABASE_URL postgres://postgres:admin@localhost:5432/CubiertoDB
ENV CLIENT_ID 1016806067084-t0n4si6m2ls6eur8g6hhbq3chqlj66r3.apps.googleusercontent.com
ENV CLIENT_SECRET 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
ENV BACKEND_URL http://localhost:5013/
ENV PUSHER_KEY 2f51c25824b0bdfea340
ENV PUSHER_SECRET d73b56ada05bb4eb7dad

USER node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npx prisma generate
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 5013
CMD ["npx","prisma","db","push"]
CMD ["node","dist/index.js"]
