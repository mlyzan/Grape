export interface Sitter {
  services: string[],
  animals: string[],
  availability: string,
  payment: number,
  photo: string,
  address: string,
  years: string,
  information: string,
  userId: string,
  userName: string,
  userEmail: string
}

export interface Comment {
  comment: string,
  userId: string,
  name: string
}