import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const sessionId = useSelector((state: RootState) => state.session.sessionId);

    return sessionId ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
