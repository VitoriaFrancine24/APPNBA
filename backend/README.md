
# NBA Player Performance Predictor

Este projeto é um aplicativo de estatísticas da NBA com previsões de desempenho de jogadores, usando tecnologias gratuitas e fáceis de implementar.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

1. **Frontend (React)**: Interface web que exibe estatísticas de jogadores e previsões
2. **Backend (Python)**: API que utiliza a biblioteca `nba_api` para extrair dados e gerar previsões

## Requisitos

### Backend (Python)
- Python 3.7 ou superior
- nba_api
- pandas
- numpy
- scikit-learn
- firebase-admin

### Frontend (React)
- Node.js 14 ou superior
- React 18
- React Router
- Tailwind CSS

## Configuração

### 1. Configuração do Firebase

1. Crie uma conta no [Firebase](https://firebase.google.com/)
2. Crie um novo projeto
3. Adicione o Firestore Database ao seu projeto
4. Baixe as credenciais do seu projeto (arquivo JSON) e salve como `firebase-credentials.json` na pasta `backend`

### 2. Instalação do Backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Execução do gerador de previsões

```bash
python nba_predictor.py [player_id]
```

Substitua `[player_id]` pelo ID do jogador da NBA que você deseja prever. Por exemplo, para LeBron James, use 2544.

## Como funciona o preditor

O preditor de desempenho usa os seguintes dados para fazer previsões:

1. **Estatísticas históricas do jogador**:
   - Médias da temporada
   - Desempenho contra o time adversário
   - Últimos 5 jogos

2. **Análise do adversário**:
   - Eficiência defensiva do time
   - Desempenho defensivo contra a posição do jogador

3. **Modelo de previsão**:
   - Regressão linear simples baseada no histórico
   - Ajustes baseados em matchups específicos

## Formato da saída (JSON)

```json
{
  "jogador": "LeBron James",
  "jogador_id": 2544,
  "proximo_jogo": "LAL vs CHI - 2025-03-25",
  "historico_vs_adversario": {
    "pts_media": 32.5,
    "reb_media": 9.8,
    "ast_media": 8.3,
    "ultimos_5_jogos": [34, 28, 38, 30, 29]
  },
  "previsao": {
    "pontos": "31-35",
    "rebotes": "8-10",
    "assistencias": "7-9",
    "risco": "baixo",
    "detalhes": "Bulls permitem 25+ pts a alas (25ª defesa da NBA)"
  },
  "atualizado_em": "2023-09-10 15:30:45"
}
```

## Integração Frontend

O frontend busca os dados de previsão do Firebase e os exibe na interface do usuário. As previsões são atualizadas diariamente através de um agendamento automatizado.

## Próximos passos

- Implementar previsões para todos os jogadores ativos
- Adicionar mais métricas avançadas (eficiência, true shooting, etc.)
- Melhorar o modelo de previsão com técnicas de machine learning mais sofisticadas
- Adicionar notificações para usuários sobre jogadores favoritos
