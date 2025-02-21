import {
  GamePlay,
  GDD,
  GameMechanic,
  MechanicType,
  Character,
  GameLocation,
} from "@_types/gddTypes";

export interface BaseResponse {
  success: boolean;
  message: string;
}
// Типы для ответов
export interface AuthResponse {
  message: string;
  success: boolean;
  token: string;
  user: {
    username: string;
    email: string;
    // Добавьте остальные поля пользователя
  };
}

export interface GDDResponse extends BaseResponse {
  gdd: GDD;
}

export interface GDDGetAllResponse extends BaseResponse {
  gdd: Array<GDD>;
}

export interface GameplayResponse extends BaseResponse {
  gameplay: GamePlay;
}

export interface GetAllMechanicsResponse extends BaseResponse {
  mechanics: GameMechanic[];
}

export interface MechanicsResponse extends BaseResponse {
  mechanic: GameMechanic;
}

export interface DeleteTypeResponse extends BaseResponse {}

export interface GetAllTypesResponse extends BaseResponse {
  types: MechanicType[];
}

export interface CreateTypeResponse extends BaseResponse {
  type: MechanicType;
}

export interface GetAllCharactersResponse extends BaseResponse {
  characters: Character[];
}

export interface CreateCharacterResponse extends BaseResponse {
  character: Character;
}

export interface DeleteCharacterResponse extends BaseResponse {}

export interface CreateLocationResponse extends BaseResponse {
  location: GameLocation;
}

export interface GetAllLocationsResponse extends BaseResponse {
  locations: GameLocation[];
}
