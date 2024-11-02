import { useSelector } from "react-redux";
import {
    createCourse,
    restoreCreateThunk,
} from "../../store/slices/course-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { CourseEdit } from "./CourseEdit";
import { WithPrealoader } from "../common/WithPreloader";

export const CourseCreate = () => {
    const createCourseThunk = useSelector(
        (state: RootState) => state.courseEdit.create
    );
    const { name, description } = useSelector(
        (state: RootState) => state.courseEdit
    );
    const getCourseThunk = useSelector(
        (state: RootState) => state.course.getCourse
    );

    return (
        <WithPrealoader status={getCourseThunk.status}>
            <CourseEdit
                navigateTo={"/profile/courses"}
                type={"create"}
                thunk={createCourseThunk}
                thunkAction={() => createCourse({ name, description })}
                restoreThunk={restoreCreateThunk}
                text={"Создание курса"}
                buttonText={"Создать"}
                course={null}
            />
        </WithPrealoader>
    );
};
