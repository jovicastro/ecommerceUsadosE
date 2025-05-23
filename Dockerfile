# Usa a imagem oficial do Node.js 20 (versão LTS atual recomendada)
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o código-fonte do backend (src) e o frontend (www) para o diretório de trabalho
# (Volumes do docker-compose irão sobrescrever isso em desenvolvimento,
# mas é bom para garantir que a imagem de produção tenha tudo)
COPY src ./src
COPY www ./www

# Expõe a porta que sua aplicação Express.js vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
# Assumindo que seu package.json tem um script "start": "node src/server.js"
CMD ["npm", "start"]