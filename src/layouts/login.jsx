import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    useEffect(() => {
        type === "register" ? setFormType("register") : setFormType("login");
    }, [type]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p className="mt-2">
                                Already have account?{" "}
                                <a
                                    className="link-primary"
                                    role="button"
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Sign In.
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p className="mt-2">
                                Don{"\u2032"}t have an account?{" "}
                                <a
                                    className="link-primary"
                                    role="button"
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Sign Up.
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
