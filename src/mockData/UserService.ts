import {IUser} from "../components/Login/IUser";
import {MockUsers} from "./InMemoryUsers";


export const addUser = (user: IUser) => {
    MockUsers.USERS = [user, ...MockUsers.USERS];
}