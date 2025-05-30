# Dockerfile

# 1. Escolha uma imagem base oficial do Node.js.
# Usaremos uma versão LTS (Long Term Support) recente.
# A tag '-alpine' resulta em uma imagem menor, o que é bom.
# Com Docker, você não fica preso à versão Node.js do seu laboratório!
FROM node:18-alpine AS builder

# 2. Defina o diretório de trabalho dentro do container.
# Todos os comandos subsequentes serão executados a partir deste diretório.
WORKDIR /usr/src/app

# 3. Copie os arquivos de definição de dependências.
# Copiamos package.json e package-lock.json (se existir) primeiro
# para aproveitar o cache do Docker. Se esses arquivos não mudarem,
# o Docker não precisará reinstalar as dependências a cada build.
COPY package*.json ./

# 4. Instale as dependências do projeto.
# Usamos 'npm ci' para uma instalação mais rápida e confiável baseada no package-lock.json.
# Se você não tiver um package-lock.json robusto, pode usar 'npm install'.
RUN npm ci --only=production

# 5. Copie o restante do código da sua aplicação para o diretório de trabalho no container.
COPY . .
# Se você tiver um .dockerignore, ele será respeitado aqui.

# 6. (Opcional) Se você tiver uma etapa de build (ex: TypeScript), faria aqui.
# Para nosso projeto JavaScript simples, não é necessário.

# --- Estágio de Produção ---
# Usamos um multi-stage build para ter uma imagem final menor,
# copiando apenas os artefatos necessários do estágio 'builder'.
FROM node:20-alpine

WORKDIR /usr/src/app

# Copie as dependências de produção do estágio 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copie o código da aplicação do estágio 'builder'
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/.env ./.env 
# Veja a nota sobre .env abaixo

# 7. Exponha a porta que sua aplicação Node.js usa.
# Esta porta deve corresponder à variável PORT no seu .env (ex: 3000).
# Esta é a porta DENTRO do container.
EXPOSE ${PORT:-3000}

# 8. Defina o comando para rodar sua aplicação quando o container iniciar.
# Isso executará o script "start" definido no seu package.json (que é 'node src/server.js').
CMD [ "npm", "start" ]