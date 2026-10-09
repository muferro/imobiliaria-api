# Imobiliária API - Backend Node.js

API REST robusta para gerenciamento de imóveis construída com Node.js, Express, TypeScript e MongoDB.

## 🚀 Features

- ✅ CRUD completo para imóveis (Housing Locations)
- ✅ Gerenciamento de aplicações/solicitações
- ✅ Paginação e filtros avançados
- ✅ Validação de dados com express-validator
- ✅ Tratamento centralizado de erros
- ✅ CORS configurado
- ✅ Logging com Morgan
- ✅ TypeScript com tipos estritos
- ✅ Modelos Mongoose com validações
- ✅ Índices de banco de dados otimizados

## 📋 Pré-requisitos

- Node.js 16+ 
- MongoDB 4.4+ (local ou cloud)
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório
```bash
cd imobiliaria-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
NODE_ENV=development
PORT=3000
HOST=localhost

# MongoDB
MONGODB_URI=mongodb://localhost:27017/imobiliaria
MONGODB_USER=admin
MONGODB_PASSWORD=admin123

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRATION=24h

# CORS - Aponte para seu frontend Angular
CORS_ORIGIN=http://localhost:4200

# Logging
LOG_LEVEL=debug
```

### 4. Inicie o MongoDB (se local)
```bash
# macOS com Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:latest
```

### 5. Execute em desenvolvimento
```bash
npm run dev
```

### 6. Build para produção
```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Housing Locations (Imóveis)

#### Listar todos os imóveis
```
GET /locations?page=1&limit=10&city=São Paulo&state=SP
```

Resposta:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Apartamento Luxo",
      "city": "São Paulo",
      "state": "SP",
      "photo": "https://...",
      "availableUnits": 5,
      "wifi": true,
      "laundry": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Obter imóvel por ID
```
GET /locations/:id
```

#### Criar novo imóvel
```
POST /locations
Content-Type: application/json

{
  "name": "Apartamento Moderno",
  "city": "Rio de Janeiro",
  "state": "RJ",
  "photo": "https://exemplo.com/foto.jpg",
  "availableUnits": 3,
  "wifi": true,
  "laundry": false
}
```

#### Atualizar imóvel
```
PUT /locations/:id
Content-Type: application/json

{
  "availableUnits": 2,
  "wifi": false
}
```

#### Deletar imóvel
```
DELETE /locations/:id
```

### Applications (Aplicações/Solicitações)

#### Listar aplicações
```
GET /applications?page=1&limit=10&status=pending
```

#### Obter aplicação por ID
```
GET /applications/:id
```

#### Criar aplicação
```
POST /applications
Content-Type: application/json

{
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@example.com",
  "phone": "+5511999999999",
  "housingLocationId": "507f1f77bcf86cd799439011",
  "message": "Tenho interesse neste imóvel"
}
```

#### Atualizar status da aplicação
```
PUT /applications/:id/status
Content-Type: application/json

{
  "status": "approved"
}
```

Valores válidos: `pending`, `approved`, `rejected`

#### Deletar aplicação
```
DELETE /applications/:id
```

## 🏗️ Estrutura do Projeto

```
src/
├── config/              # Configurações da aplicação
│   └── index.ts        # Config centralizada
├── database/            # Conexão com banco de dados
│   └── connection.ts
├── models/              # Modelos Mongoose
│   ├── HousingLocation.ts
│   └── Application.ts
├── controllers/         # Lógica de negócio
│   ├── housingController.ts
│   └── applicationController.ts
├── routes/              # Definição de rotas
│   ├── housing.ts
│   └── applications.ts
├── middlewares/         # Middlewares Express
│   ├── validation.ts    # Validação de dados
│   └── errorHandler.ts  # Tratamento de erros
└── server.ts           # Arquivo principal
```

## 🔐 Boas Práticas Implementadas

### 1. **Validação de Dados**
- Express-validator para validação em todos os endpoints
- Sanitização automática de dados
- Mensagens de erro descritivas

### 2. **Tratamento de Erros**
- Middleware centralizado de erros
- Respostas padronizadas
- Stack traces em desenvolvimento

### 3. **Segurança**
- CORS configurável
- Validação de tipos com TypeScript
- Sanitização de dados
- Rate limiting pronto para adicionar

### 4. **Performance**
- Índices de banco de dados
- Paginação implementada
- Queries otimizadas
- Compressão de responses

### 5. **Código**
- TypeScript strict mode
- Tipagem completa
- Estrutura modular
- Separação de responsabilidades

### 6. **Logging**
- Morgan para HTTP requests
- Console logging estruturado
- Timestamps em todos os logs

## 🧪 Testando a API

### Health Check
```bash
curl http://localhost:3000/health
```

### Criar Imóvel
```bash
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Casa Aconchegante",
    "city": "Brasília",
    "state": "DF",
    "photo": "https://exemplo.com/foto.jpg",
    "availableUnits": 2,
    "wifi": true,
    "laundry": true
  }'
```

### Listar com Paginação
```bash
curl "http://localhost:3000/locations?page=1&limit=5&city=São%20Paulo"
```

### Criar Aplicação
```bash
curl -X POST http://localhost:3000/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Maria",
    "lastName": "Santos",
    "email": "maria@example.com",
    "phone": "+5511988888888",
    "message": "Gostaria de mais informações"
  }'
```

## 🗄️ Seeding de Dados (Opcional)

Crie um arquivo `seed.ts` para popular o banco com dados iniciais:

```typescript
import mongoose from 'mongoose';
import { HousingLocation } from './src/models/HousingLocation';

const seedData = async () => {
  await mongoose.connect('mongodb://localhost:27017/imobiliaria');
  
  await HousingLocation.insertMany([
    {
      name: 'Apartamento Centro',
      city: 'São Paulo',
      state: 'SP',
      photo: 'https://via.placeholder.com/300',
      availableUnits: 3,
      wifi: true,
      laundry: false,
    },
    // ... mais dados
  ]);
  
  await mongoose.disconnect();
};
```

## 📊 Resposta Padrão da API

### Sucesso (200)
```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

### Erro (400+)
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": []
}
```

## 🚀 Deploy

### Heroku
```bash
heroku create sua-app
git push heroku main
```

### AWS, DigitalOcean, etc
1. Build: `npm run build`
2. Deploy pasta `dist/`
3. Configurar variáveis de ambiente
4. Iniciar: `npm start`

## 📦 Próximos Passos

Para expandir a API:

- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting
- [ ] Adicionar testes unitários e E2E
- [ ] Documentação com Swagger/OpenAPI
- [ ] CI/CD com GitHub Actions
- [ ] Webhook para notificações
- [ ] Upload de imagens para S3/CloudStorage
- [ ] Cache com Redis

## 📝 Licença

ISC

## 👤 Autor

Desenvolvido com ❤️ para o projeto Imobiliária

---

**Pronto para usar! Comece a desenvolver sua API.**
