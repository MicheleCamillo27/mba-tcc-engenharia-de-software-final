PLAYER_WEIGHTS = {
    # CHUTES
    # Critério:
    # - totalShots (peso 2): volume de finalizações
    # - shotsOnTarget (peso 3): qualidade (mais importante que quantidade)
    # - goalConversionPercentage (peso 1): eficiência na finalização
    # Justificativa: prioriza precisão e eficiência, não apenas quantidade
    "chutes": {
        "totalShots": 2,
        "shotsOnTarget": 3,
        "goalConversionPercentage": 1,
    },

    # VELOCIDADE
    # Critério:
    # - successfulDribbles (peso 3): indica explosão e capacidade de progressão
    # - wasFouled (peso 2): jogadores rápidos sofrem mais faltas
    # - touches (peso 0.1): baixo peso para não distorcer a métrica
    # Justificativa: velocidade é inferida indiretamente por ações dinâmicas
    "velocidade": {
        "successfulDribbles": 3,
        "wasFouled": 2,
        "touches": 0.1,
    },

    # DRIBLE
    # Critério:
    # - successfulDribbles (peso 4): principal indicador de habilidade
    # - successfulDribblesPercentage (peso 1): eficiência no drible
    # - possessionLost (peso -0.2): penaliza perda de bola
    # Justificativa: valoriza habilidade técnica com penalização por erro
    "drible": {
        "successfulDribbles": 4,
        "successfulDribblesPercentage": 1,
        "possessionLost": -0.2,
    },

    # PASSES
    # Critério:
    # - accuratePasses (peso 0.5): volume de passes
    # - accuratePassesPercentage (peso 1): precisão
    # - keyPasses (peso 5): passes decisivos (alto impacto no jogo)
    # Justificativa: prioriza qualidade e impacto ofensivo
    "passes": {
        "accuratePasses": 0.5,
        "accuratePassesPercentage": 1,
        "keyPasses": 5,
    },

    # CONTROLE DE BOLA
    # Critério:
    # - touches (peso 0.3): participação no jogo
    # - possessionLost (peso -0.2): penaliza erros
    # - dispossessed (peso -2): perda direta da bola (alto impacto negativo)
    # Justificativa: mede segurança e domínio sob pressão
    "controle": {
        "touches": 0.3,
        "possessionLost": -0.2,
        "dispossessed": -2,
    }
}