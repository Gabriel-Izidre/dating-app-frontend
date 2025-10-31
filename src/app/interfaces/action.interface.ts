export interface Action {
  _id?: string;
  type: string;
  user: string;
  target: string;
  createdAt?: string;
}
