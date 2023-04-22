import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {ComponentType} from "react";

export function withRouter (Component: ComponentType) {
    return (props: any) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
}