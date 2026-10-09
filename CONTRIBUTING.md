# Guia de Desenvolvimento - Imobiliária API

## 🎯 Padrões de Código

Este projeto segue as seguintes práticas:

### 1. TypeScript Strict Mode
- Todos os tipos devem ser explícitos
- Sem `any` - usar tipos específicos
- Usar interfaces para estruturas de dados

### 2. Estrutura de Pastas
```
src/
├── config/          # Configurações e variáveis de ambiente
├── database/        # Conexão e inicialização do BD
├── models/          # Schemas e tipos Mongoose
├── controllers/     # Lógica de negócio
├── routes/          # Definição de rotas
├── middlewares/     # Middlewares personalizados
└── server.ts       # Ponto de entrada
```

### 3. Naming Conventions
- Arquivos: `camelCase.ts`
- Variáveis: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Interfaces: `IPrefixedCamelCase`
- Classes: `PascalCase`

### 4. Padrão de Resposta da API
```json
{
  "success": boolean,
  "data": object | null,
  "message": string,
  "pagination": { /* se aplicável */ }
}
```

## 📝 Adicionar Nova Entidade

### Passo 1: Criar o Modelo (src/models/NewEntity.ts)
```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface INewEntity extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const newEntitySchema = new Schema<INewEntity>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const NewEntity = mongoose.model<INewEntity>(
  'NewEntity',
  newEntitySchema
);
```

### Passo 2: Criar o Controlador (src/controllers/newEntityController.ts)
```typescript
import { Request, Response, NextFunction } from 'express';
import { NewEntity } from '../models/NewEntity';

export const listNewEntities = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entities = await NewEntity.find();
    res.json({
      success: true,
      data: entities,
    });
  } catch (error) {
    next(error);
  }
};

// ... outros métodos
```

### Passo 3: Criar as Validações (atualizar src/middlewares/validation.ts)
```typescript
export const validateCreateNewEntity = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Nome deve ter no mínimo 3 caracteres'),
];
```

### Passo 4: Criar as Rotas (src/routes/newEntity.ts)
```typescript
import { Router } from 'express';
import { listNewEntities } from '../controllers/newEntityController';
import { validateCreateNewEntity } from '../middlewares/validation';

const router = Router();

router.get('/', listNewEntities);
// ... outras rotas

export default router;
```

### Passo 5: Registrar as Rotas (src/server.ts)
```typescript
import newEntityRoutes from './routes/newEntity';

app.use('/new-entities', newEntityRoutes);
```

## 🔍 Code Review Checklist

Antes de commitar, verifique:

- [ ] Código compilar sem erros: `npm run build`
- [ ] Sem tipos `any`: `grep -r "any" src/`
- [ ] Sem eslint warnings: `npm run lint`
- [ ] Validações implementadas
- [ ] Tratamento de erros apropriado
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Mensagens de erro em português (ou padrão definido)

## 🧪 Testes

Estrutura de testes:
```typescript
// src/controllers/__tests__/housingController.spec.ts
describe('Housing Controller', () => {
  it('should list housing locations', async () => {
    // arrange, act, assert
  });
});
```

Rodar testes:
```bash
npm test
npm test -- --coverage
```

## 📚 Adicionar Documentação

Para cada nova feature, atualizar:
1. **README.md** - Adicionar endpoint
2. **SETUP.md** - Se mudanças no setup
3. **requests.http** - Adicionar exemplos de requisições
4. **Comentários inline** - Para lógica complexa

Exemplo de comentário:
```typescript
/**
 * Listar imóveis com paginação e filtros
 * @param req.query.page Número da página (default: 1)
 * @param req.query.limit Itens por página (default: 10)
 * @param req.query.city Filtrar por cidade
 */
export const listHousingLocations = async (...) => {
  // implementação
};
```

## 🔐 Segurança

Sempre considerar:
- ✅ Validar input do usuário
- ✅ Sanitizar dados
- ✅ Usar HTTPS em produção
- ✅ Variáveis sensíveis no .env
- ✅ Rate limiting (adicionar)
- ✅ CORS restritivo
- ✅ Autenticação/Autorização

## 🚀 Deploy

### Produção
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t imobiliaria-api .
docker run -p 3000:3000 imobiliaria-api
```

### Variáveis de Ambiente em Produção
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=chave_super_secreta_prod
CORS_ORIGIN=https://seu-dominio.com
```

## 🐛 Debugging

### Logs
```typescript
console.log('Info:', variavel);
console.error('Erro:', erro);
```

### VS Code Debugger
Adicionar `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/dist/server.js"
    }
  ]
}
```

## 📊 Monitoramento

Para produção, adicionar:
- Sentry (error tracking)
- DataDog/New Relic (APM)
- Prometheus (métricas)

## 🔄 Git Workflow

```bash
# Criar branch
git checkout -b feature/nome-feature

# Fazer commits
git commit -m "feat: descrição da mudança"

# Push
git push origin feature/nome-feature

# Criar Pull Request
```

## 📞 Suporte

Documentação:
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [TypeScript](https://www.typescriptlang.org/)

---

Happy coding! 🎉
