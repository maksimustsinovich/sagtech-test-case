export enum Role {
  ADMIN,
  USER,
}

export class User {
  id: number;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
