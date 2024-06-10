FROM node:lts
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 4116
USER root
RUN chown -R node /usr/src/app
RUN apt update
RUN apt install net-tools iputils-ping -y
RUN apt clean
USER node

CMD ["node", "index.js"]