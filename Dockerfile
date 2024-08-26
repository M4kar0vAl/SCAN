FROM node:alpine AS build_stage

WORKDIR /app

COPY package*.json .

RUN npm update npm && npm install

COPY . ./

RUN npm run build

FROM nginx

COPY --from=build_stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]