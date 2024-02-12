import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'


export class AuthService {
    client = new Client();

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
            
        }
    }

    async login({email, password}) {
        try {
            return await this.account.login(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error in getCurrentUser", error);
        }
        return null
    }

    async logout() {
        try {
            await this.account.logout()
        } catch (error) {
            console.log("error in logout", error);
        }
    }

}


const authService = new AuthService()

export default authService
