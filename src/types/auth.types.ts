export interface User {
    id: number
    name: string
    surname: string
    email: string
    role: string
    createdAt: Date
}

export interface SignIn {
    email: string
    password: string
}

export interface SignUp {
    email: string
    password: string
    name: string
    surname: string
    role: string
}