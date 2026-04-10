# # import numpy as np
# # import matplotlib.pyplot as plt
# # from scipy.ndimage import gaussian_filter


# # def plot_heatmap(data, title="Heatmap"):
# #     points = data.get("points", [])

# #     x = []
# #     y = []

# #     for p in points:
# #         x.extend([p["x"]] * p["count"])
# #         y.extend([p["y"]] * p["count"])

# #     if not x:
# #         print("Nenhum dado encontrado.")
# #         return

# #     heatmap, _, _ = np.histogram2d(
# #         x, y,
# #         bins=60,
# #         range=[[0, 100], [0, 100]]
# #     )

# #     heatmap = gaussian_filter(heatmap, sigma=2)

# #     plt.figure(figsize=(10, 7))

# #     plt.imshow(
# #         heatmap.T,
# #         extent=[0, 100, 0, 100],
# #         origin='lower',
# #         cmap='hot',
# #         alpha=0.85
# #     )

# #     plt.colorbar(label="Intensidade")

# #     plt.xlim(0, 100)
# #     plt.ylim(0, 100)

# #     plt.title(title)
# #     plt.xlabel("Largura do Campo")
# #     plt.ylabel("Comprimento do Campo")

# #     plt.savefig("heatmap.png", dpi=300, bbox_inches="tight")
# #     print("Heatmap salvo como heatmap.png")
# #     plt.close()


# # ORIGINAL ACIMA

# # import numpy as np
# # import matplotlib.pyplot as plt
# # from scipy.ndimage import gaussian_filter
# # from matplotlib.colors import LinearSegmentedColormap

# # # Dimensões reais do campo (metros)
# # FIELD_LENGTH = 105  # Comprimento (eixo X)
# # FIELD_WIDTH = 68    # Largura (eixo Y)

# # def draw_pitch(ax):
# #     ax.set_facecolor("#1e7f3f")  # Fundo verde escuro estilo ESPN

# #     line_color = "white"
# #     lw = 2

# #     # Bordas do campo
# #     ax.plot([0, FIELD_LENGTH], [0, 0], color=line_color, lw=lw)
# #     ax.plot([0, FIELD_LENGTH], [FIELD_WIDTH, FIELD_WIDTH], color=line_color, lw=lw)
# #     ax.plot([0, 0], [0, FIELD_WIDTH], color=line_color, lw=lw)
# #     ax.plot([FIELD_LENGTH, FIELD_LENGTH], [0, FIELD_WIDTH], color=line_color, lw=lw)

# #     # Linha do meio
# #     ax.plot([FIELD_LENGTH/2, FIELD_LENGTH/2], [0, FIELD_WIDTH], color=line_color, lw=lw)

# #     # Círculo central
# #     circle = plt.Circle((FIELD_LENGTH/2, FIELD_WIDTH/2), 9.15, fill=False, color=line_color, lw=lw)
# #     ax.add_patch(circle)

# #     # Área penal (penalty box)
# #     penalty_box_width = 40.32
# #     penalty_box_depth = 16.5

# #     # Área penal esquerda
# #     ax.plot([0, penalty_box_depth], [(FIELD_WIDTH - penalty_box_width)/2, (FIELD_WIDTH - penalty_box_width)/2], color=line_color, lw=lw)
# #     ax.plot([penalty_box_depth, penalty_box_depth], [(FIELD_WIDTH - penalty_box_width)/2, (FIELD_WIDTH + penalty_box_width)/2], color=line_color, lw=lw)
# #     ax.plot([0, penalty_box_depth], [(FIELD_WIDTH + penalty_box_width)/2, (FIELD_WIDTH + penalty_box_width)/2], color=line_color, lw=lw)

# #     # Área penal direita
# #     ax.plot([FIELD_LENGTH, FIELD_LENGTH - penalty_box_depth], [(FIELD_WIDTH - penalty_box_width)/2, (FIELD_WIDTH - penalty_box_width)/2], color=line_color, lw=lw)
# #     ax.plot([FIELD_LENGTH - penalty_box_depth, FIELD_LENGTH - penalty_box_depth], [(FIELD_WIDTH - penalty_box_width)/2, (FIELD_WIDTH + penalty_box_width)/2], color=line_color, lw=lw)
# #     ax.plot([FIELD_LENGTH, FIELD_LENGTH - penalty_box_depth], [(FIELD_WIDTH + penalty_box_width)/2, (FIELD_WIDTH + penalty_box_width)/2], color=line_color, lw=lw)

# #     ax.set_xlim(0, FIELD_LENGTH)
# #     ax.set_ylim(0, FIELD_WIDTH)
# #     ax.set_xticks([])
# #     ax.set_yticks([])
# #     ax.set_aspect("equal")


# # def plot_heatmap(player_heatmap_overall_data, player_name="Jogador", competition="Competição", season="Temporada", filename="heatmap_espn_style.png"):
# #     """
# #     player_heatmap_overall_data: dict JSON vindo da API, com chave "points" contendo lista de pontos
# #     """

# #     points = player_heatmap_overall_data.get("points", [])

# #     x = []
# #     y = []

# #     for p in points:
# #         # Converte x e y de % para metros reais no campo
# #         x.extend([p["x"] * FIELD_LENGTH / 100] * p["count"])
# #         y.extend([p["y"] * FIELD_WIDTH / 100] * p["count"])

# #     if not x:
# #         print("Nenhum dado encontrado.")
# #         return

# #     # Cria histograma 2D
# #     heatmap, _, _ = np.histogram2d(x, y, bins=[FIELD_LENGTH, FIELD_WIDTH], range=[[0, FIELD_LENGTH], [0, FIELD_WIDTH]])

# #     # Aplica suavização para o heatmap
# #     heatmap = gaussian_filter(heatmap, sigma=3)

# #     # Normaliza para 0-1
# #     if heatmap.max() != 0:
# #         heatmap = heatmap / heatmap.max()

# #     # Mantendo as cores originais do seu pedido
# #     colors = ["#00FF00", "#FFFF00", "#FFA500", "#FF0000", "#8B0000"]  # Verde, amarelo, laranja, vermelho, vermelho intenso
# #     custom_cmap = LinearSegmentedColormap.from_list("custom_heatmap", colors, N=256)

# #     # Configura figura widescreen 16:9 com fundo escuro
# #     fig = plt.figure(figsize=(16, 9), facecolor="#111111")

# #     # Área do gráfico para campo + heatmap
# #     ax = fig.add_axes([0.07, 0.15, 0.65, 0.7])

# #     ax.imshow(
# #         heatmap.T,
# #         extent=[0, FIELD_LENGTH, 0, FIELD_WIDTH],
# #         origin="lower",
# #         cmap=custom_cmap,
# #         alpha=0.9,
# #         aspect="auto"
# #     )

# #     draw_pitch(ax)

# #     # Títulos estilo ESPN
# #     fig.text(0.07, 0.92, "HEATMAP DE MOVIMENTAÇÃO", fontsize=26, fontweight="bold", color="white")
# #     fig.text(0.07, 0.88, player_name, fontsize=20, color="#cccccc")
# #     fig.text(0.07, 0.84, f"{competition} • {season}", fontsize=14, color="#aaaaaa")

# #     # Legenda de cores lateral
# #     cax = fig.add_axes([0.75, 0.25, 0.02, 0.5])
# #     norm = plt.Normalize(vmin=0, vmax=1)
# #     cb = plt.colorbar(plt.cm.ScalarMappable(norm=norm, cmap=custom_cmap), cax=cax)
# #     cb.outline.set_visible(False)
# #     cb.ax.tick_params(colors="white")
# #     cb.set_label("Intensidade", color="white", fontsize=12)

# #     for spine in ax.spines.values():
# #         spine.set_visible(False)

# #     plt.savefig(filename, dpi=300, bbox_inches="tight", facecolor=fig.get_facecolor())
# #     plt.close()
# #     print(f"🔥 Heatmap estilo ESPN salvo como {filename}")

# # # Exemplo de uso:
# # if __name__ == "__main__":
# #     example_api_data = {
# #         "points": [
# #             {"x": 50, "y": 50, "count": 10},
# #             {"x": 70, "y": 30, "count": 20},
# #             {"x": 85, "y": 40, "count": 5},
# #             {"x": 20, "y": 60, "count": 15},
# #         ]
# #     }

# #     plot_heatmap(
# #         example_api_data,
# #         player_name="Neymar Jr.",
# #         competition="Brasileirão",
# #         season="2026",
# #         filename="heatmap_espn_style.png"
# #     )





# # MODELo 2
# import numpy as np
# import matplotlib.pyplot as plt
# from scipy.ndimage import gaussian_filter
# from matplotlib.colors import LinearSegmentedColormap

# def draw_pitch(ax=None):
#     if ax is None:
#         fig, ax = plt.subplots(figsize=(10, 7))
    
#     # Limites do campo
#     ax.set_xlim(0, 100)
#     ax.set_ylim(0, 100)

#     # Fundo verde
#     ax.set_facecolor("#1e7f3f")  # verde do campo

#     # Linhas do campo
#     lw = 2  # espessura das linhas

#     # Campo externo
#     ax.plot([0, 0, 100, 100, 0], [0, 100, 100, 0, 0], color="white", linewidth=lw)

#     # Meio de campo
#     ax.plot([50, 50], [0, 100], color="white", linewidth=lw)
#     center_circle = plt.Circle((50, 50), 10, color="white", fill=False, linewidth=lw)
#     ax.add_patch(center_circle)
#     center_spot = plt.Circle((50, 50), 0.5, color="white")
#     ax.add_patch(center_spot)

#     # Áreas pequenas (6-yard box)
#     ax.plot([0, 6, 6, 0], [44, 44, 56, 56], color="white", linewidth=lw)   # esquerda
#     ax.plot([100, 94, 94, 100], [44, 44, 56, 56], color="white", linewidth=lw) # direita

#     # Áreas grandes (18-yard box)
#     ax.plot([0, 18, 18, 0], [32, 32, 68, 68], color="white", linewidth=lw)  # esquerda
#     ax.plot([100, 82, 82, 100], [32, 32, 68, 68], color="white", linewidth=lw) # direita

#     return ax

# def plot_heatmap(data, title="Heatmap", filename="heatmap.png"):
#     points = data.get("points", [])

#     x = []
#     y = []

#     for p in points:
#         x.extend([p["x"]] * p["count"])
#         y.extend([p["y"]] * p["count"])

#     if not x:
#         print("Nenhum dado encontrado.")
#         return

#     heatmap, _, _ = np.histogram2d(
#         x, y,
#         bins=60,
#         range=[[0, 100], [0, 100]]
#     )

#     heatmap = gaussian_filter(heatmap, sigma=2)

#     # Criar colormap customizado: verde -> amarelo -> laranja -> vermelho -> vermelho intenso
#     colors = ["#1e7f3f", "#ffff00", "#ffa500", "#ff0000", "#8b0000"]
#     cmap = LinearSegmentedColormap.from_list("custom_hot", colors)

#     fig, ax = plt.subplots(figsize=(10, 7))
#     ax = draw_pitch(ax)

#     # Plotando o heatmap
#     im = ax.imshow(
#         heatmap.T,
#         extent=[0, 100, 0, 100],
#         origin='lower',
#         cmap=cmap,
#         alpha=0.85,
#         interpolation='gaussian'
#     )

#     plt.colorbar(im, ax=ax, label="Intensidade")

#     ax.set_title(title)
#     ax.set_xlabel("Largura do Campo")
#     ax.set_ylabel("Comprimento do Campo")

#     plt.savefig(filename, dpi=300, bbox_inches="tight")
#     print(f"Heatmap salvo como {filename}")
#     plt.close()