FROM node:lts
ENV NODE_ENV=production
ENV TERM=xterm
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 4116
RUN chown -R node /usr/src/app
USER node


CMD ["node", "index.js"]