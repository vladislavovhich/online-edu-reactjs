import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../../store/store";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    restoreUpdateThunk,
    setName,
    setPassword,
    setSurname,
    setUpdateThunkError,
    updateUser,
} from "../../store/slices/user-profile.slice";
import { FormField } from "../Form/FormField";
import { Alert } from "@mui/material";
import { setUser } from "../../store/slices/auth.slice";
import { Maybe } from "yup";

const FormSchema = Yup.object().shape(
    {
        password: Yup.string().when("password", (val, schema) => {
            if (val && val[0] && val[0].trim().length > 0) {
                return Yup.string().min(5).max(35).required();
            } else {
                return Yup.string().notRequired();
            }
        }),
        name: Yup.string().min(1).required(),
        surname: Yup.string().min(1).required(),
    },
    [["password", "password"]]
);

interface Form {
    password?: string | undefined;
    name: string;
    surname: string;
}

export const ProfileUpdate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { name, surname, password, userUpdated } = useSelector(
        (state: RootState) => state.userProfile
    );
    const updateProfileThunk = useSelector(
        (state: RootState) => state.userProfile.updateUser
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            name,
            surname,
            password,
        },
    });

    useEffect(() => {
        console.log(updateProfileThunk.status);

        if (updateProfileThunk.status == "succeeded" && userUpdated) {
            dispatch(restoreUpdateThunk());
            dispatch(setUser(userUpdated));
            navigate("/profile");
        }
    }, [updateProfileThunk.status]);

    useEffect(() => {
        if (!user) {
            return;
        }

        dispatch(setName(user.name));
        dispatch(setSurname(user.surname));
    }, [user]);

    if (!user) {
        return null;
    }

    const formOnSubmit = (data: Form) => {
        dispatch(
            updateUser({
                ...data,
                password: data.password || undefined,
            })
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column">
                    <h3 className="text-darker col-6 mt-2">
                        Изменение профиля
                    </h3>

                    <FormField
                        type="text"
                        register={register("name")}
                        value={name}
                        placeholder="Введите имя"
                        error={errors.name}
                        id="name"
                        action={setName}
                        labelText="Имя"
                        clearError={clearErrors}
                        extraClass="col-6 mt-2"
                    />

                    <FormField
                        type="text"
                        register={register("surname")}
                        value={surname}
                        placeholder="Введите фамилию"
                        error={errors.surname}
                        id="surname"
                        action={setSurname}
                        labelText="Фамилия"
                        clearError={clearErrors}
                        extraClass="mt-3 col-6"
                    />

                    <FormField
                        type="password"
                        register={register("password")}
                        value={password}
                        placeholder="Введите новый пароль"
                        error={errors.password}
                        id="password"
                        action={setPassword}
                        labelText="Новый пароль"
                        clearError={clearErrors}
                        extraClass="mt-3 col-6"
                    />

                    <input
                        type="submit"
                        className="btn-darker text-white col-6 mt-3"
                        value="Обновить"
                    />

                    {updateProfileThunk.error && (
                        <Alert
                            className="mt-3 col-6"
                            variant="filled"
                            severity="error"
                            onClose={() => {
                                dispatch(setUpdateThunkError(null));
                            }}
                        >
                            {updateProfileThunk.error}
                        </Alert>
                    )}
                </div>
            </form>
        </div>
    );
};
