#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print commands and their arguments as they are executed
set -x

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Run linting
echo "Running linter checks..."
npm run lint

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel (if CLI is installed)
if command -v vercel &> /dev/null; then
    echo "Deploying to Vercel..."
    
    # Check if user is logged in
    if ! vercel whoami &> /dev/null; then
        echo "Please login to Vercel first by running 'vercel login'"
        exit 1
    fi
    
    # Verificar se existe uma chave de API no .env.local
    if [ -f .env.local ]; then
        API_KEY=$(grep NEXT_PUBLIC_BALLDONTLIE_API_KEY .env.local | cut -d '=' -f2)
        if [ -z "$API_KEY" ] || [ "$API_KEY" = "temp_demo_key" ]; then
            echo "⚠️ Aviso: Você está usando uma chave de API temporária."
            echo "Para funcionalidade completa, obtenha uma chave em balldontlie.io"
            read -p "Deseja continuar com a chave temporária? (s/n): " continue_with_temp
            if [ "$continue_with_temp" != "s" ]; then
                read -p "Digite sua chave da API balldontlie: " user_api_key
                API_KEY=$user_api_key
            fi
        fi
    else
        echo "⚠️ Arquivo .env.local não encontrado."
        read -p "Digite sua chave da API balldontlie (deixe em branco para usar temporária): " user_api_key
        if [ -z "$user_api_key" ]; then
            API_KEY="temp_demo_key"
        else
            API_KEY=$user_api_key
        fi
    fi
    
    # Deploy to production
    vercel env add NEXT_PUBLIC_BALLDONTLIE_API_KEY production <<< "$API_KEY"
    vercel --prod
else
    echo "Vercel CLI not found. Please install it using 'npm install -g vercel'"
    echo "Then run 'vercel login' and 'vercel --prod' to deploy"
    
    echo "Alternatively, you can deploy via Vercel website:"
    echo "1. Visit https://vercel.com"
    echo "2. Import your GitHub repository"
    echo "3. Configure settings and deploy"
fi

echo "Deployment process completed!" 