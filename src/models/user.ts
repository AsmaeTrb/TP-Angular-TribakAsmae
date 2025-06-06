export interface User {
}
export class User {
    private _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
  
    constructor(id: string, name: string, email: string, password: string) {
      this._id = id;
      this._name = name;
      this._email = email;
      this._password = password;
    }
  
    get id(): string {
      return this._id;
    }
    set id(value: string) {
      this._id = value;
    }
  
    get name(): string {
      return this._name;
    }
    set name(value: string) {
      this._name = value;
    }
  
    get email(): string {
      return this._email;
    }
    set email(value: string) {
      this._email = value;
    }
  
    get password(): string {
      return this._password;
    }
    set password(value: string) {
      this._password = value;
    }
  }
  