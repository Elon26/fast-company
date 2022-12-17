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
                            path="/course-project/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/course-project/login/:type?" component={Login} />
                        <Route path="/course-project/logout" exact component={Logout} />
                        <Route path="/course-project/" exact component={Main} />
                        <Route path="/course-project/404" component={NotFound} />
                        <Redirect to="/course-project/404" />
                    </Switch>
                </ClickCatcherProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
