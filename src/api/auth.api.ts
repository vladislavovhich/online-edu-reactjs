import { AxiosError } from "axios";
import { SignIn, SignUp, User } from "../types/auth.types";
import { Api } from "./api";

export const AuthApi = {
    signUp: async (data: SignUp) => {
        try {
            const response = await Api.post<{user: User}>("/auth/sign-up", JSON.stringify(data))

            return response.data.user
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    signIn: async (data: SignIn) => {
        try {
            const response = await Api.post<{user: User}>("/auth/sign-in", JSON.stringify(data))

            return response.data.user
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    signOut: async () => {
        try {
            await Api.post("/auth/sign-out")
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    authMe: async () => {
        try {
            const response = await Api.get<{user: User}>("/auth/me")
            
            return response.data.user
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },
}