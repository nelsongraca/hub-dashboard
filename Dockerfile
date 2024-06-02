FROM node:lts-alpine as build

COPY . /work

WORKDIR work

RUN npm install && npm run build



FROM nginx:stable-alpine

RUN sed -i '/location \/ {/a  try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

COPY --from=build /work/dist/hub-dashboard/browser /usr/share/nginx/html
