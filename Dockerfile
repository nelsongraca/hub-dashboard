FROM node:lts-alpine as build

COPY . /work

WORKDIR work

RUN npm install && npm run build



FROM nginx:stable-alpine

COPY --from=build /work/dist/hub-dashboard/browser /usr/share/nginx/html
