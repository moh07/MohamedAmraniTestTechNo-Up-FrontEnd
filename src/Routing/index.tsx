import React from 'react'
import ReactDOM from "react-dom";
import AnnoncesList from '../pages/annoncesList';
import {
    Route,
    Switch,
    Router,
    withRouter,
    MemoryRouter
} from "react-router-dom";

export type PrivateRouteProps = any;

export const PrivateRoute = (props : PrivateRouteProps) => {

    return <Route {...props}/>;
};

const Routes: React.FC = () => (
    <MemoryRouter>
        <Switch>
            <PrivateRoute path={
                    ['/annoces', '/']
                }
                component={AnnoncesList}/>
        </Switch>
    </MemoryRouter>
)
export default Routes
