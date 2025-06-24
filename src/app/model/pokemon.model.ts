export interface Pokemon {
  id?: number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types: [string] |  [string, string] | [string, string,string];
  created: Date;
}

export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè]+$/,
  PICTURE_PATTERN: /^https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/[0-9]{3}\.png$/,
  MAX_NAME: 20,
  MIN_NAME: 3,
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
  MIN_TYPES: 1,
  MAX_TYPES: 3,
} as const;
