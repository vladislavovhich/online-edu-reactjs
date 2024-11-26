import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/auth.types";
import { GetCourse } from "../../types/course.types";
import { Lecture as LectureType } from "../../types/lecture.types";
import { IconTextLink } from "../common/IconTextLink";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { onlineLecture } from "../../store/slices/lecture-edit.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Props extends LectureType {
    course: GetCourse;
    user: User | null;
}

export const Lecture = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const onClickSetOnline = () => {
        dispatch(onlineLecture(props.id));
    };
    const { onlineLecture: onlineLectureThunk } = useSelector(
        (state: RootState) => state.lectureEdit
    );

    return (
        <div className="d-flex flex-column border px-4 py-4 mt-3 border-rounded">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="text-darker h3">Лекция {props.name}</div>

                {props.user && props.user.id == props.course.mentor.id && (
                    <div className="d-flex flex-row">
                        <IconTextLink
                            url={`/courses/${props.course.id}/update-lecture/${props.id}`}
                            text="Редактировать"
                            icon={faPencil}
                        />

                        <IconTextLink
                            url={`/courses/${props.course.id}/delete-lecture/${props.id}`}
                            text="Удалить"
                            icon={faTrash}
                            extraClass="ms-2"
                        />

                        <WithPrealoader status={onlineLectureThunk.status}>
                            <>
                                {!props.isOnline && (
                                    <input
                                        type="button"
                                        className="btn btn-primary"
                                        value="Онлайн"
                                        onClick={onClickSetOnline}
                                    />
                                )}
                            </>
                        </WithPrealoader>
                    </div>
                )}

                {props.user && props.isOnline && (
                    <Link
                        to="/lecture/online"
                        className="btn btn-primary"
                        onClick={onClickSetOnline}
                    >
                        Войти
                    </Link>
                )}
            </div>

            <hr className="my-2" />

            <div className="text-darker h4">Тема: {props.subject}</div>

            <div className="text-darker h4">Описание: {props.description}</div>

            <hr className="my-2" />

            <div className="text-darker h4">
                Дата проведения: {new Date(props.date).toLocaleString()}
            </div>
        </div>
    );
};
