def calculate_impact_by_position(stats: dict, position: str) -> float:


    # NORMALIZAÇÃO DAS FEATURES (0 a 1)

    # Justificativa:
    # Evita distorções causadas por métricas com escalas diferentes.
    # Ex: passes podem chegar a 100+, enquanto gols raramente passam de 2.

    goals = stats.get("goals", 0) / 2
    # Gols são eventos raros → dividir por 2 aproxima do máximo esperado por jogo

    assists = stats.get("assists", 0) / 2
    # Assistências também são eventos raros → mesma lógica dos gols

    shots_on_target = stats.get("shotsOnTarget", 0) / 5
    # Finalizações no alvo → jogadores ofensivos podem chegar ~5 por jogo

    key_passes = stats.get("keyPasses", 0) / 5
    # Passes decisivos → normalmente entre 0 e 5

    pass_accuracy = stats.get("accuratePassesPercentage", 0) / 100
    # Já está em porcentagem → normalização direta

    touches = stats.get("touches", 0) / 100
    # Toques na bola podem chegar a ~100 → normalizado para evitar dominância

    tackles = stats.get("tackles", 0) / 5
    # Desarmes → média esperada até ~5 por jogo

    interceptions = stats.get("interceptions", 0) / 5
    # Interceptações → comportamento similar aos desarmes

    clearances = stats.get("clearances", 0) / 5
    # Cortes defensivos → comuns em defensores

    duels = stats.get("duelsWon", 0) / 10
    # Duelos ganhos → podem ocorrer com mais frequência (~10)


    # COMPONENTE OFENSIVO

    # Representa impacto direto em criação e finalização

    offensive = (
        goals * 6 +
        # Peso 6 → maior impacto possível (define resultado da partida)

        assists * 5 +
        # Peso 5 → criação direta de gols (impacto quase equivalente ao gol)

        shots_on_target * 3 +
        # Peso 3 → pressão ofensiva constante (nem sempre vira gol)

        key_passes * 4
        # Peso 4 → criação de chances claras
    )

    # COMPONENTE DE CONSTRUÇÃO (MEIO-CAMPO)

    # Representa controle e organização do jogo

    buildup = (
        pass_accuracy * 4 +
        # Peso 4 → qualidade do passe é mais importante que volume

        touches * 1
        # Peso 1 → participação no jogo (baixo peso para evitar distorção)
    )

    # COMPONENTE DEFENSIVO

    # Representa recuperação e proteção

    defensive = (
        tackles * 4 +
        # Peso 4 → recuperação direta da posse

        interceptions * 3 +
        # Peso 3 → leitura de jogo e antecipação

        clearances * 3 +
        # Peso 3 → remoção de perigo

        duels * 2
        # Peso 2 → disputas físicas (impacto indireto)
    )

    position = (position or "").upper()

    
    # AJUSTE POR POSIÇÃO

    # Justificativa:
    # Diferentes posições têm responsabilidades distintas no jogo.

    # ATACANTES (ST, LW, RW)
    # Foco: finalização e criação ofensiva
    if position in ["ST", "LW", "RW"]:
        impact = (
            offensive * 0.6 +   # principal responsabilidade → ataque
            buildup * 0.3 +     # apoio na construção
            defensive * 0.1     # baixa exigência defensiva
        )

    # MEIO-CAMPISTAS (CM, CDM, CAM)
    # Foco: equilíbrio entre ataque e organização
    elif position in ["CM", "CDM", "CAM"]:
        impact = (
            offensive * 0.3 +   # contribuição ofensiva
            buildup * 0.5 +     # principal função → organização do jogo
            defensive * 0.2     # apoio defensivo
        )

    # DEFENSORES (CB, LB, RB)
    # Foco: proteção e recuperação de bola
    elif position in ["CB", "LB", "RB"]:
        impact = (
            offensive * 0.1 +   # baixa contribuição ofensiva
            buildup * 0.3 +     # saída de bola
            defensive * 0.6     # principal responsabilidade → defesa
        )

    # FALLBACK (posição desconhecida)
    else:
        impact = (
            offensive * 0.4 +
            buildup * 0.3 +
            defensive * 0.3
        )

    return impact