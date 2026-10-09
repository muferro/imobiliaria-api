# 🚀 Guia Rápido de Setup - Imobiliária API

Bem-vindo! Este guia passo a passo vai ajudá-lo a colocar a API em funcionamento.

## 📦 Opção 1: Setup Local (Recomendado para Desenvolvimento)

### Pré-requisitos
- Node.js 16+ instalado
- MongoDB 4.4+ instalado e rodando

### Passos

#### 1. Instalar MongoDB Localmente (macOS)
```bash
# Com Homebrew
brew install mongodb-community
brew services start mongodb-community

# Conectar para testar
mongosh
# Digite: use admin
# Digite: db.createUser({ user: "admin", pwd: "admin123", roles: ["root"] })
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Compilar TypeScript
```bash
npm run build
```

#### 4. Popular banco de dados com exemplos (opcional)
```bash
npx ts-node seed.ts
```

#### 5. Iniciar em desenvolvimento
```bash
npm run dev
```

**Sucesso!** Seu servidor estará em `http://localhost:3000`

---

## 🐳 Opção 2: Setup com Docker (Recomendado para Produção)

### Pré-requisitos
- Docker e Docker Compose instalados

### Passos

#### 1. Iniciar MongoDB + API com Docker Compose
```bash
docker-compose up
```

O serviço vai:
- Iniciar MongoDB em `localhost:27017`
- Iniciar API em `localhost:3000`
- Recarregar automaticamente ao salvar arquivos (hot reload)

#### 2. Parar os serviços
```bash
docker-compose down
```

#### 3. Remover todos os dados
```bash
docker-compose down -v
```

---

## ✅ Testar a API

### Health Check
```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "UP",
  "timestamp": "2024-01-15T10:30:00Z",
  "environment": "development"
}
```

### API Info
```bash
curl http://localhost:3000/api/info
```

### Listar imóveis
```bash
curl "http://localhost:3000/locations?page=1&limit=5"
```

### Criar imóvel
```bash
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Apartamento Luxo",
    "city": "São Paulo",
    "state": "SP",
    "photo": "https://via.placeholder.com/300",
    "availableUnits": 3,
    "wifi": true,
    "laundry": true
  }'
```

### Criar aplicação
```bash
curl -X POST http://localhost:3000/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao@example.com",
    "phone": "+5511999999999",
    "message": "Tenho interesse neste imóvel"
  }'
```

---

## 🔌 Conectar com seu Frontend Angular

No seu serviço Angular (`src/app/housing.service.ts`), a URL está configurada para:
```typescript
url = 'http://localhost:3000/locations';
```

**Certifique-se que:**
1. A API está rodando em `http://localhost:3000`
2. O CORS está habilitado (já está configurado no `.env`)
3. O seu Angular está em `http://localhost:4200`

---

## 📁 Estrutura do Projeto

```
imobiliaria-api/
├── src/
│   ├── config/              # Configurações
│   ├── models/              # Schemas Mongoose
│   ├── controllers/         # Lógica da aplicação
│   ├── routes/              # Definição de rotas
│   ├── middlewares/         # Middleware
│   └── server.ts           # Arquivo principal
├── dist/                    # JavaScript compilado
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
├── .env                    # Variáveis de ambiente
├── Dockerfile              # Docker image
├── docker-compose.yml      # Docker Compose
├── seed.ts                 # Dados de exemplo
└── README.md              # Documentação completa
```

---

## 🔐 Variáveis de Ambiente

No arquivo `.env`, configure:

```env
# Porta do servidor
PORT=3000

# MongoDB local
MONGODB_URI=mongodb://localhost:27017/imobiliaria
MONGODB_USER=admin
MONGODB_PASSWORD=admin123

# Frontend Angular
CORS_ORIGIN=http://localhost:4200

# Segurança
JWT_SECRET=sua_chave_secreta_aqui
```

---

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Iniciar com hot reload

# Build
npm run build           # Compilar TypeScript

# Produção
npm start               # Iniciar servidor compilado

# Qualidade
npm run lint            # Verificar código
npm run lint:fix        # Corrigir problemas automaticamente

# Testes
npm test                # Rodar testes
```

---

## 📞 Troubleshooting

### MongoDB não conecta
```bash
# Verificar se MongoDB está rodando
brew services list

# Reiniciar MongoDB
brew services restart mongodb-community

# Conectar manualmente
mongosh --authenticationDatabase admin -u admin -p admin123
```

### Porta 3000 em uso
```bash
# Matar processo na porta 3000
lsof -i :3000
kill -9 <PID>

# Ou usar porta diferente no .env
PORT=3001
```

### CORS error no frontend
Certifique-se que `.env` tem:
```env
CORS_ORIGIN=http://localhost:4200
```

### TypeScript compilation error
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Próximos Passos

Depois de confirmar que tudo está funcionando:

1. ✅ Integre com seu frontend Angular
2. ✅ Adicione mais rotas/funcionalidades
3. ✅ Configure autenticação JWT
4. ✅ Implemente upload de imagens
5. ✅ Deploy em produção (Heroku, AWS, etc)

---

## 📚 Mais Informações

Veja [README.md](./README.md) para:
- Documentação completa da API
- Endpoints detalhados
- Exemplos de requisições
- Deploy em produção

---

**Dúvidas?** Confira os logs do servidor: `npm run dev`

Sucesso! 🎉
