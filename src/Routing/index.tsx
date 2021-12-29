import React from 'react'
import ReactDOM from "react-dom";
import AnnoncesList from '../pages/annoncesList';
import {
    Route,
    Switch,
    Router,
    withRouter,
    MemoryRouter,
    BrowserRouter
} from "react-router-dom";
import AnnonceDetails from '../pages/annonceDetails';

export type PrivateRouteProps = any;

export const PrivateRoute = (props : PrivateRouteProps) => {

    return <Route {...props}/>;
};

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path={
                    ['/annoces']
                }
                component={AnnoncesList}/>
            <PrivateRoute path={['/createOrUpdate/:idOrCreate']}
                component={AnnonceDetails}/>
        </Switch>
    </BrowserRouter>
)
export default Routes
