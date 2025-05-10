FROM node:18

# Instala bash (necesario para ejecutar wait-for-it.sh)
RUN apt-get update && apt-get install -y bash

WORKDIR /app

# Copia el package y el .env
COPY package*.json ./
COPY .env ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Copia el script de espera y da permisos
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Usa bash para esperar que MySQL esté listo
CMD ["bash", "/wait-for-it.sh", "172.31.21.115:3307", "--", "npm", "run", "start"]
