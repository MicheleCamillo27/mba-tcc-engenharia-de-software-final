from dataclasses import dataclass


@dataclass
class TeamColors:
    primary: str
    secondary: str
    text: str


@dataclass
class Team:
    name: str
    nameCode: str
    id: int
    teamColors: TeamColors


@dataclass
class Standing:
    team: Team
    position: int