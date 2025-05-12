export interface User {
  id?: string,
  email: string;
  password?: string;  // solo para creación en auth, no se guarda en firestore
  name: string;
  birthday: string;
  profilePhoto: string;
  createdAt?: Date;
  contact?:string[];
  request?:string[];
  chat?:{[key:string]:number[]};
}
