#!/bin/bash

# Script para executar seed de dados
# Uso: ./run-seed.sh

echo "🌱 Iniciando seed de dados..."
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "seed.ts" ]; then
    echo "❌ Erro: Arquivo seed.ts não encontrado"
    echo "Execute este script a partir do diretório raiz do projeto"
    exit 1
fi

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Executar seed
echo "⏳ Conectando ao banco de dados..."
npx ts-node seed.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Seed concluído com sucesso!"
    echo ""
    echo "📊 Dados inseridos:"
    echo "  - 9 imóveis de exemplo"
    echo ""
    echo "🚀 Para iniciar a API:"
    echo "   npm run dev"
    echo ""
else
    echo ""
    echo "❌ Erro ao executar seed"
    echo "Verifique se MongoDB está rodando em localhost:27017"
    exit 1
fi
