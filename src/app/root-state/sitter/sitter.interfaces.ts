export interface Sitter {
  services: string[],
  animals: string[],
  availabilityFrom: string,
  availabilityTo: string,
  payment: number,
  photo: string,
  address: string,
  years: string,
  information: string,
  userId: string,
  userName: string,
  userEmail: string,
  rate: number
}

export interface Comment {
  comment: string,
  userId: string,
  name: string
}

export interface Book {
  contactInfo: string,
  userId: string,
  name: string,
  isBooked: boolean,
  isComplete: boolean
}