import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { AppDispatch, RootState } from "../../store/store"

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUp } from "../../store/slices/auth.slice";
import { setName, setOldPassword, setPassword, setSurname } from "../../store/slices/user-profile.slice";
import { FormField } from "../Form/FormField";

const FormSchema = Yup.object({
    password: Yup.string().min(5).max(35).required(),
    passwordOld: Yup.string().min(5).max(35).required(),
    name: Yup.string().min(1).required(),
    surname: Yup.string().min(1).required(),
})

interface Form {
    password: string
    passwordOld: string
    name: string
    surname: string
}

export const ProfileUpdate = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user, isAuthorized} = useSelector((state: RootState) => state.auth)
    const {name, surname, password, passwordOld} = useSelector((state: RootState) => state.userProfile)

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: {password, passwordOld, name, surname}
    });

    const formOnSubmit = () => {
    }

    useEffect(() => {
        if (!user) {
            return
        }

        dispatch(setName(user.name))
        dispatch(setSurname(user.surname))
    }, [user])

    if (!user) {
        return null
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column">
                    <h3 className="text-darker col-6 mt-2">Изменение профиля</h3>

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
                        extraClass='col-6 mt-2'
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

                    <FormField 
                        type='password'
                        register={register("passwordOld")}
                        value={passwordOld}
                        placeholder='Введите старый пароль'
                        error={errors.passwordOld}
                        id='passwordOld'
                        action={setOldPassword}
                        labelText='Старый пароль'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <FormField 
                        type='password'
                        register={register("password")}
                        value={password}
                        placeholder='Введите новый пароль'
                        error={errors.password}
                        id='password'
                        action={setPassword}
                        labelText='Новый пароль'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                    />

                    <input 
                        type='submit' 
                        className='btn bg-darker text-white col-6 mt-4' 
                        value="Обновить" 
                    />      
                </div>
            </form>
        </div>
    )
}