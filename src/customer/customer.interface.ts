export interface CustomerInterface {
  id?: number;
  name: string;
  email: string;
  cellphone: string;
  birthdate: Date;
  cancelled_at?: Date;
}
