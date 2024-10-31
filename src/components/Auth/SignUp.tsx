import React from "react"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp, setEmail, setPassword, setName, setSurname, setRole, setSignUpError } from "../../store/slices/auth.slice";
import { FormField } from "../Form/FormField";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Alert } from "@mui/material";

const FormSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).max(35).required(),
    name: Yup.string().min(1).required(),
    surname: Yup.string().min(1).required(),
})

interface Form {
    email: string
    password: string
    name: string
    surname: string
}

export const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {email, password, name, surname, role} = useSelector((state: RootState) => state.auth)
    const signUpThunk = useSelector((state: RootState) => state.auth.signUp)

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: {email, password}
    });

    const formOnSubmit = () => {
        const data = {
            email, password, name, surname, role
        }

        dispatch(signUp(data))
    }

    const handleOnChange = (e: SelectChangeEvent) => {
        dispatch(setRole(e.target.value))
    };

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column align-items-center">
                    <h3 className="text-center text-darker col-6">Регистрация</h3>

                    <hr className="col-6" />
                    
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
                        extraClass='col-6'
                    />

                    <FormField 
                        type='text'
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

                    <FormField 
                        type='text'
                        register={register("name")}
                        value={name}
                        placeholder='Введите имя'
                        error={errors.name}
                        id='name'
                        action={setName}
                        labelText='Имя'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <FormField 
                        type='text'
                        register={register("surname")}
                        value={surname}
                        placeholder='Введите фамилию'
                        error={errors.surname}
                        id='surname'
                        action={setSurname}
                        labelText='Фамилия'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <FormControl className="col-6 mt-3" size="small">
                        <InputLabel id="role-label">Роль</InputLabel>
                        <Select
                            labelId="role-label"
                            value={role}
                            label="Роль"
                            onChange={handleOnChange}
                        >   
                            <MenuItem value="STUDENT">Студент</MenuItem>
                            <MenuItem value="MENTOR">Учитель</MenuItem>
                        </Select>
                    </FormControl>

                    <input 
                        type='submit' 
                        className='btn bg-darker col-6 mt-4' 
                        value="Зарегистрироваться" 
                    />

                    {
                        signUpThunk.error && (
                            <Alert 
                                className="mt-3 col-6"
                                variant="filled" 
                                severity="error" 
                                onClose={() => {
                                    dispatch(setSignUpError(null))
                                }}
                            >
                                {signUpThunk.error}
                            </Alert>
                        )
                    }
                </div>
            </form>
        </div>
    )
}