# 1. Usar una imagen oficial de Node.js (versión ligera Alpine)
FROM node:22-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias primero (optimiza el caché de Docker)
COPY package*.json ./

# 4. Instalar las dependencias de producción
RUN npm install

# 5. Copiar el resto del código fuente de la aplicación
COPY . .

# 6. Exponer el puerto que usa tu aplicación (usualmente 3000 para Express)
EXPOSE 3000

# 7. El comando para arrancar la aplicación
CMD ["node", "./bin/www"]
