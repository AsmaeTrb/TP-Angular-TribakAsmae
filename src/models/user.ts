import { Roles } from './roles'; 

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: Roles;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: Roles = Roles.Guest // par défaut : Guest
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._role = role;
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

  get role(): Roles {
    return this._role;
  }
  set role(value: Roles) {
    this._role = value;
  }
}
