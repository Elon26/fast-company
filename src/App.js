import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./layouts/not-found";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoutes";
import Logout from "./layouts/logout";
import ClickCatcherProvider from "./hooks/useClickCatcher";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div>
            <AppLoader>
                <ClickCatcherProvider>
                    <NavBar />
                    <Switch>
                        <ProtectedRoute
                            path="/fast-company/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/fast-company/login/:type?" component={Login} />
                        <Route path="/fast-company/logout" exact component={Logout} />
                        <Route path="/fast-company/" exact component={Main} />
                        <Route path="/fast-company/404" component={NotFound} />
                        <Redirect to="/fast-company/404" />
                    </Switch>
                </ClickCatcherProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
