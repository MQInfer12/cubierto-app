FROM node:18 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18

ENV DATABASE_URL postgres://jyacelly:temporal.1@192.168.104.201:5432/cubiertodbdev
ENV CLIENT_ID 538506142130-pjirjtvun90ebipp2fu6fi9svlfcb7c4.apps.googleusercontent.com
ENV CLIENT_SECRET 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
ENV BACKEND_URL http://localhost:5013/
ENV PUSHER_KEY d2b8a28e99d10a7d5cc2
ENV PUSHER_SECRET fd4ea45b9a22eeb88d88
ENV PUSHER_CLUSTER mt1
ENV PUSHER_APP_ID 1763164

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
