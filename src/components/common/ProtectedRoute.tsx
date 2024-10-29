import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

    return !isAuthorized ? <Navigate to={redirectTo} /> : children
};