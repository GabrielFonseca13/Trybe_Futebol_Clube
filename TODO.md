  15 - Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end
A rota deve ser um GET e retorna uma lista de partidas;

Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.

Exemplo de retorno:

[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
OBS: Você deverá definir os relacionamentos para homeTeam e awayTeam somente na model de partidas.
  
  15 - Desenvolva o endpoint `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end
    ✕ Será validado que a página apresentará todos os dados de partidas sem nenhum filtro (3288 ms)