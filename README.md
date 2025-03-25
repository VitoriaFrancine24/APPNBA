# HoopVision Enhancer

Aplicação de análise de basquete com IA para previsões de jogos, estatísticas de jogadores e análise de times da NBA.

## 🏀 Funcionalidades

- **Partidas**: Visualize partidas da NBA em tempo real com dados da API balldontlie
- **Previsões**: Veja previsões geradas por IA para resultados de jogos e desempenho de jogadores
- **Times**: Explore informações sobre as equipes da NBA
- **Jogadores**: Análise de jogadores com estatísticas e previsões de desempenho
- **Design responsivo**: Interface otimizada para desktop e mobile

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [balldontlie API](https://www.balldontlie.io/)

## 💻 Configuração

### Pré-requisitos

- Node.js (versão 18.0.0 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/hoopvision-enhancer.git
   cd hoopvision-enhancer
   ```

2. Instale as dependências
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente

   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   # API balldontlie (cadastre-se em balldontlie.io para obter uma chave)
   NEXT_PUBLIC_BALLDONTLIE_API_KEY=sua_chave_aqui

   # Configurações do app
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 🌐 API de Dados da NBA

Este projeto utiliza a [API balldontlie](https://www.balldontlie.io/), que oferece dados da NBA em tempo real. Para utilizar todas as funcionalidades:

1. Cadastre-se em [balldontlie.io](https://www.balldontlie.io/)
2. Obtenha sua chave de API
3. Adicione a chave no arquivo `.env.local`

A versão gratuita da API permite acesso a:
- Informações de times
- Lista de jogadores
- Resultados de jogos
- Estatísticas básicas

Para funcionalidades avançadas, considere o plano pago da API, que oferece mais dados e maior limite de requisições.

## 📱 Demonstração

A aplicação está hospedada na Vercel e pode ser acessada em [hoopvision-app.vercel.app](https://hoopvision-app.vercel.app)

## 📊 Previsões com IA

As previsões de jogos são geradas utilizando:
- Dados históricos de confrontos
- Estatísticas recentes dos times
- Análise de desempenho em casa vs fora
- Estatísticas de jogadores-chave

**Nota**: As previsões são simuladas com dados mockados. Para implementar previsões reais com IA, seria necessário desenvolver ou integrar um modelo de machine learning específico.

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

## 👨‍💻 Autor

Desenvolvido por [Seu Nome](https://github.com/seu-usuario)

---

Feito com ♥ e React
