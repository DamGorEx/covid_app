import {Role, IUser} from "../components/Login/IUser";

export class MockUsers {
    static USERS: IUser[] = [
        {name: "Michal", lastName: "Kowalski", credentials: {login: "admin", password: "admin", role: Role.ADMIN}},
        {name: "Adam", lastName: "Nowak", credentials: {login: "adam", password: "adam", role: Role.USER}},
        {name: "Krzysztof", lastName: "Pawlak", credentials: {login: "krzychu", password: "krzychu", role: Role.USER}},
        {name: "Andrzej", lastName: "Nowacki", credentials: {login: "andrzej", password: "andrzej", role: Role.USER}},
    ]
}