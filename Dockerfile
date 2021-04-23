FROM node:12 as buildContainer
WORKDIR /app

COPY ./package.json ./package-lock.json /app/
RUN npm i 
RUN npx ngcc

COPY . /app

# max-old-space is needed to avoid any compilation issues because of missing memory
ENV NODE_OPTIONS --max-old-space-size=2048
RUN npm run build:ssr-prod

FROM node:12-alpine

WORKDIR /app
COPY --from=buildContainer /app/package.json /app

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist

EXPOSE 4000

ENV NODE_ENV production
CMD ["npm", "run", "serve:ssr"]