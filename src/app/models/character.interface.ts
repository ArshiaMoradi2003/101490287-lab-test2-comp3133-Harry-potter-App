export interface Wand {
  wood?: string;
  core?: string;
  length?: number | null;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string | null;
  yearOfBirth: number | null;
  wizard: boolean;
  ancestry: boolean;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartStudent: boolean;
  hogwartStaff: boolean;
  actor: string;
  alternateActors: string[];
  alive: boolean;
  image: string;
}
