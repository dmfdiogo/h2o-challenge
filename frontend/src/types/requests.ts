/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Customer {
  id: number,
  username: string
  firstName: string
  lastName: string
  password: string
}

export interface ReqLogin {
  username: string
  password: string
}

export interface ReqRegister extends Omit<Customer, 'id'> {}

export interface ReqRegisterCustomer extends Omit<Customer, 'id'> {}