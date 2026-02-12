export interface PublicUserDTO {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponseDTO {
  user: PublicUserDTO;
  token: string;
}
