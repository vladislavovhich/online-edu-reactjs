import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
    children: JSX.Element;
    redirectTo: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo,
}) => {
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    );
    const authMeThunk = useSelector((state: RootState) => state.auth.authMe);

    return !isAuthorized && authMeThunk.status == "succeeded" ? (
        <Navigate to={redirectTo} />
    ) : (
        children
    );
};
