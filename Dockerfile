FROM node:16.16-alpine AS builder

ENV NODE_ENV production
ARG REACT_APP_BASEURL=''
ENV REACT_APP_BASEURL=$REACT_APP_BASEURL

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY doc_2023-03-14_00-19-23.env .
COPY tailwind.config.js .
RUN npm install --production --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]