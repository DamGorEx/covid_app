export interface IUser {
    name: string,
    lastName: string,
    credentials: ICredentials
}


export interface ICredentials {
    login: string,
    password: string
    role:Role
}

export enum Role{
    ADMIN = "Admin",
    USER = "User"
}
