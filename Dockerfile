FROM node

WORKDIR /app

COPY package*.json .

RUN npm update npm && npm install

COPY . ./

EXPOSE 5173

CMD [ "npm", "run", "dev" ]