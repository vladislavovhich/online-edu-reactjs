import React from "react"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signIn, setEmail, setPassword, setSignInError } from "../../store/reducers/auth.reducer";
import { FormField } from "../Form/FormField";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const FormSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(35).required(),
})

interface Form {
    email: string
    password: string
}

export const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {email, password} = useSelector((state: RootState) => state.auth)
    const signInThunk = useSelector((state: RootState) => state.auth.signIn)

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: {email, password}
    });


    const formOnSubmit = (data: Form) => {
        dispatch(setSignInError(null))
        dispatch(signIn(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column align-items-center">
                    <h3 className="text-center text-primary col-6">Авторизация</h3>

                    <FormField 
                        type='text'
                        register={register("email")}
                        value={email}
                        placeholder='Введите почту'
                        error={errors.email}
                        id='email'
                        action={setEmail}
                        labelText='Почта'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <FormField 
                        type='password'
                        register={register("password")}
                        value={password}
                        placeholder='Введите пароль'
                        error={errors.password}
                        id='password'
                        action={setPassword}
                        labelText='Пароль'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <Link to="/auth/sign-up" className="text-center text-primary my-1">Нет аккаунта?</Link>
                    
                    <input 
                        type='submit' 
                        className='btn btn-primary col-6 mt-2' 
                        value="Войти" 
                    />

                    {
                        signInThunk.error && (
                            <Alert 
                                className="mt-3 col-6"
                                variant="filled" 
                                severity="error" 
                                onClose={() => {
                                    dispatch(setSignInError(null))
                                }}
                            >
                                {signInThunk.error}
                            </Alert>
                        )
                    }
                </div>
            </form>
        </div>
    )
}