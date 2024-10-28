import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthorized);

    return !isAuthenticated ? <Navigate to={redirectTo} /> : children
};

export default ProtectedRoute;