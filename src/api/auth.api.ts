import { SignIn, SignUp, User } from "../types/auth.types";
import { Api } from "./api";

export const AuthApi = {
    signUp: async (data: SignUp) => {
        const response = await Api.post("/auth/sign-up", JSON.stringify(data))
    
        if (response.status == 200) {
            const user = response.data.user as User

            return user
        } else {
            throw new Error(response.data)
        }
    },

    signIn: async (data: SignIn) => {
        const response = await Api.post("/auth/sign-in", JSON.stringify(data))

        if (response.status == 200) {
            const user = response.data.user as User

            return user
        } else {
            throw new Error(response.data)
        }
    },

    signOut: async () => {
        const response = await Api.post("/auth/sign-out")
    },

    authMe: async () => {
        const response = await Api.get("/auth/me")
        
        if (response.status == 200) {
            const user = response.data.user as User

            return user
        } else {
            throw new Error(response.data)
        }
    },
}