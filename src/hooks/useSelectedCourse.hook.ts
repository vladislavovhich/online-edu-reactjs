import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useSelectedCourse = () => {
    const { courses, courseId } = useSelector(
        (state: RootState) => state.courseAll
    );
    const { courses: profileCourses } = useSelector(
        (state: RootState) => state.course
    );

    const courseFound = courses.find((course) => course.id == courseId);
    const profileCourseFound = profileCourses.find(
        (course) => course.id == courseId
    );

    return courseFound ? courseFound : profileCourseFound;
};
