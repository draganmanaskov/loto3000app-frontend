import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const { user, loading, error } = useSelector(
        (state) => state.auth
      )
    return (
        allowedRoles?.includes(user?.role)
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;