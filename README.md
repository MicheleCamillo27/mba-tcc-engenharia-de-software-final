# ⚽ TCC - Visualização Gráfica de Dados no Futebol Brasileiro

Este projeto tem como objetivo a **análise e visualização de dados no futebol brasileiro**, utilizando técnicas modernas de **data analytics** e **visualização interativa** para apoiar a compreensão tática e de desempenho das equipes.

A solução integra **Backend (Python)** e **Frontend (React + TypeScript)** para transformar dados brutos em **insights visuais claros e estratégicos**.

---

## 🧠 Contexto

O futebol é um dos principais elementos culturais do Brasil, exercendo forte influência social e midiática. Com a evolução tecnológica, o esporte passou a gerar grandes volumes de dados, permitindo análises cada vez mais detalhadas.

Plataformas como Sofascore, WhoScored e Transfermarkt disponibilizam dados ricos sobre partidas, jogadores e equipes, possibilitando o desenvolvimento de soluções analíticas avançadas.

---

## 🎯 Objetivo

Desenvolver uma ferramenta que permita:

* 📊 Visualizar dados de desempenho de jogadores e equipes
* 🔍 Identificar padrões táticos e comportamentais
* ⚽ Comparar jogadores através de métricas avançadas
* 🧩 Integrar múltiplas visualizações para gerar insights

---

## 🏗️ Arquitetura da Solução

O projeto é dividido em duas camadas principais:

### 🔙 Backend (Python)

Responsável por:

* Coleta de dados (APIs / datasets)
* Tratamento e normalização
* Cálculo de métricas (ex: xG, passes, ações defensivas)
* Exposição via API

### 🌐 Frontend (React + TypeScript)

Responsável por:

* Renderização de gráficos interativos
* Visualizações táticas
* Interface do usuário
* Consumo da API

---

## 📁 Estrutura do Projeto

```text
mba-tcc-engenharia-de-software/
│
├── football-analytics-core/
│   ├── app/
│   │   ├── application/
│   │   │     ├── boletins_downloader_service_interface.py
│   │   │     │     ├── estatistica_downloader_service_interface.py
│   │   │     │     ├── estatistica_extrator_service_interface.py
│   │   │     │     ├── estatistica_file_saver_service_interface.py
│   │   │     │     └── file_saver_interface.py
│   │   ├── data/
│   │   ├── services/
│   │   ├── domain/
│   │   ├── utils/
│   │   └── main.py
│   ├── requirements.txt
│   └── README.md
│
├── football-analytics-ui/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Heatmap/
│   │   │   │   ├── index.tsx
│   │   │   │   └── types.ts
│   │   │   ├── RadarChart/
│   │   │   │   ├── index.tsx
│   │   │   │   └── types.ts
│   │   │   ├── Charts/
│   │   │   │    ├── index.tsx
│   │   │   │    └── types.ts
│   │   │   └── UI/
│   │   │        ├── Button
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        ├── Card
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        ├── Contaner
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        ├── Content
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        ├── Grid
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        ├── Input
│   │   │        │    ├── index.tsx
│   │   │        │    └── styles.module.css
│   │   │        └── List
│   │   │            ├── index.tsx
│   │   │            ├── styles.module.css
│   │   │            └── types.ts
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── styles.module.css
│   │   │   └── Player/
│   │   │        ├── index.tsx
│   │   │        └── styles.module.css
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   ├── services/
│   │   │   ├── Players/
│   │   │   │   ├── playerService.ts
│   │   │   │   └── types.ts
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │     └── global.css
│   │   ├── types/
│   │   │     └── d3.d.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── editorconfig
│   ├── .gitgnore
│   ├── .prettierignore
│   ├── .prettier
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── dados/
│   ├── brutos/
│   └── tratados/
│
├── .gitignore
└── README.md
```

---

## 🧰 Tecnologias Utilizadas

| Camada   | Tecnologias             |
| -------- | ----------------------- |
| Backend  | Python, Pandas          |
| API      | Uvicorn                 |
| Frontend | React, TypeScript, Vite |
| Gráficos | d3, recharts            |

---

## 📊 Tipos de Visualizações

O sistema utiliza múltiplas formas de visualização para enriquecer a análise:

### 🔥 Heatmap (Mapa de Calor)

* Mostra movimentação dos jogadores em campo
* Identifica posicionamento tático

### 🕸️ Radar Chart

* Comparação de habilidades entre jogadores
* Métricas como:

  * Passes
  * Finalizações
  * Ações defensivas

### ⚽ Redes de Passe (Pass Maps)

* Análise da construção de jogadas
* Frequência e direção dos passes

---

## 🔄 Fluxo de Dados

```text
1. 📡 Coleta de Dados (APIs / datasets de futebol)
2. ⚙️ Backend (Python)
   - Processamento
   - Cálculo de métricas
3. 🔌 API REST (Flask)
4. 🌐 Frontend (React)
5. 👤 Usuário final (visualização interativa)
```

---

## 🔧 Pré-Requisitos

### Backend

* Python 3.11+
* pip
* virtualenv (venv)

### Frontend

* Node.js 18+
* npm ou yarn

---

## 🛠️ Backend - Execução

```bash
cd backend

python -m venv venv

# Linux/Mac
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python main.py ou uvicorn app.interfaces.api.main:app --reload ou python -m app.main
```

---

## 🌐 API (Exemplo de Endpoints)

| Método | Rota                     | Descrição                 |
| ------ | -------------------------| ----------------------    |
| GET    | `/health`                | Validar Servico Ativo     |  
| GET    | `/players`               | Lista jogadores           |
| GET    | `/players/{id}`          | Detalhes do jogador       |
| GET    | `/players/graph/radar`   | Detalhes do jogador       |
| GET    | `/players/graph/heatmap` | Detalhes do jogador       |
| GET    | `/standings/teams`      | Lista times               |

---

## 💻 Frontend - Execução

```bash
cd frontend

npm install

npm run dev
```

🔗 Acesse: [http://localhost:5173](http://localhost:5173)

---

## 📈 Funcionalidades

* 🔍 Filtro por jogador e time
* 📊 Visualização de métricas avançadas
* 🔥 Heatmaps interativos
* 🕸️ Gráficos radar comparativos
* ⚽ Análise tática de partidas
* 📉 Insights visuais de desempenho

---

## ⚠️ Desafios do Projeto

* Integração de múltiplas fontes de dados
* Normalização de métricas diferentes
* Interpretação correta de indicadores avançados (xG, PPDA, etc.)
* Construção de visualizações intuitivas e úteis

---

## 🎓 Finalidade Acadêmica

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) com o tema:

> **Visualização Gráfica de Dados no Futebol Brasileiro**

Seu objetivo é demonstrar como técnicas de visualização podem apoiar análises táticas e estratégicas no futebol moderno.

---

## 📄 Licença

Projeto de uso **acadêmico**.
Uso comercial somente com autorização dos autores.
