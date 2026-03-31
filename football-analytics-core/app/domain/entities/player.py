from dataclasses import dataclass


@dataclass
class Country:
    name: str
    alpha2: str
    alpha3: str


@dataclass
class Player:
    id: int
    name: str
    position: str
    height: int
    weight: int
    preferred_foot: str
    jersey_number: str
    date_of_birth: str
    country: Country