import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as Yup from 'yup';
import { createCourse, restoreThunk, setDescription, setName } from "../../store/slices/course-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { FormField } from "../Form/FormField";
import { FormTextArea } from "../Form/FormTextArea";

const FormSchema = Yup.object({
    name: Yup.string().min(1).max(45).required(),
    description: Yup.string().min(3).max(255).required()
})

interface Form {
    name: string
    description: string
}

export const CourseCreate = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {name, description} = useSelector((state: RootState) => state.courseEdit)
    const createThunk = useSelector((state: RootState) => state.courseEdit.create)

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<Form>({
        resolver: yupResolver(FormSchema),
        defaultValues: {name, description}
    });

    useEffect(() => {
        dispatch(restoreThunk())
    }, [])

    if (createThunk.status == "succeeded") {
        return <Navigate to="/profile" />
    }

    const formOnSubmit = (data: Form) => {
        dispatch(createCourse(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-column">
                    <h3 className="h3 text-primary">Добавление курса</h3>
                
                    <hr className="col-6"/>

                    <FormField 
                        type='text'
                        register={register("name")}
                        value={name}
                        placeholder='Название курса'
                        error={errors.name}
                        id='name'
                        action={setName}
                        labelText='Название курса'
                        clearError={clearErrors}
                        extraClass='col-6'
                    />

                    <FormTextArea 
                        type='text'
                        register={register("description")}
                        value={description}
                        placeholder='Описание курса'
                        error={errors.description}
                        id='description'
                        action={setDescription}
                        labelText='Описание курса'
                        clearError={clearErrors}
                        extraClass='mt-3 col-6'
                        maxRows={3}
                    />

                    <input 
                        type='submit' 
                        className='btn btn-primary col-6 mt-2' 
                        value="Создать курс" 
                    />
                </div>
            </form>
        </div>
    )
}