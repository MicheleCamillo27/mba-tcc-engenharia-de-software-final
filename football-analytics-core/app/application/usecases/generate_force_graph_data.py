# class GenerateForceGraphData:

#     def execute(self, players):

#         nodes = []
#         links = []

#         for player in players:

#             nodes.append({
#                 "id": player.name,
#                 "group": "player"
#             })

#             nodes.append({
#                 "id": player.team_name,
#                 "group": "team"
#             })

#             links.append({
#                 "source": player.name,
#                 "target": player.team_name
#             })

#         return {
#             "nodes": nodes,
#             "links": links
#         }