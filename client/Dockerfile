FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# list all environment variables
ARG REACT_APP_ORIGIN
ARG REACT_APP_WEBSITE_NAME
ENV REACT_APP_ORIGIN=$REACT_APP_ORIGIN
ENV REACT_APP_WEBSITE_NAME=$REACT_APP_WEBSITE_NAME

RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
