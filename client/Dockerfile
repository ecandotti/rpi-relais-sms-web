# Version légère de Node
FROM node:12-alpine as build

# Dossier où l'app sera dockeriser
WORKDIR /app

# Copie de l'app dans le dossier app/
COPY . /app/

# Installation des node_modules et build de l'app
RUN npm install
RUN npm run build

# Preparation de nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Demmarage de Nginx sur le port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
