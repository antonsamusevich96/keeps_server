import {IAuthentication, IUser} from "../types/types";
import UsersModel from "./users.model";
import bcrypt from 'bcrypt'
import {getAuthentication} from "../utils/authentication";

const SALT = 5

class UserService {
    async registration(data: IUser): Promise<IAuthentication> {
        const user = await UsersModel.findOne({name: data.name})
        if (user) {
            const error = Error('такой пользователь существует')
            error.name = 'name'
            throw error
        }
        const hashPassword = bcrypt.hashSync(data.password, SALT)
        const createdUser = await UsersModel.create({name: data.name, password: hashPassword})
        return getAuthentication({name: createdUser.name, _id: createdUser._id || ''})
    }
    async login(data: IUser): Promise<IAuthentication> {
        const currentUser: IUser | null =  await UsersModel.findOne({name: data.name})
        if (!currentUser) {
            throw new Error('Такого пользователя не существует')
        }
        const checkPassword = bcrypt.compareSync(data.password, currentUser.password)
        if (checkPassword) {
            return getAuthentication({name: currentUser.name, _id: currentUser._id || ''})
        }
        throw new Error('Неверный пароль')
    }


    async getMe(id: string): Promise<IUser> {
        const user: IUser | null =  await UsersModel.findById(id)
        if (!user) {
            throw new Error('Такого пользователя не существует')
        }
        return user
    }
}

export default new UserService();
