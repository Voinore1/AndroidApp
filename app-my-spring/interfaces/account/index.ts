export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface IRegister {
    email: string;
    password: string;
    username: string;
    image: File | null;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    image: string;
    exp: number;
}

export interface IUserState {
    user: IUser | null;
    token: string | null;
}