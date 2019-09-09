import React, {useContext, useEffect} from "react";
import {Alert, Button, Checkbox, Form, Icon, Input} from "antd";
/* SCSS */
import "../static/scss/login.scss";
import getConfig from "next/config";
import {AuthContext} from "../contexts/AuthContextProvider";
import {ClientContext} from "graphql-hooks";
import * as PropTypes from "prop-types";
import Link from "next/link";

const {publicRuntimeConfig} = getConfig();
const {SIGNUP_PATH} = publicRuntimeConfig;

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const client = useContext(ClientContext);

    useEffect(() => {
        console.log("setting graphql client auth header");
        client.setHeader("Authorization", `Bearer ${authContext.token}`);
    }, [authContext.token]);

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                authContext.loginRequest(values);
            }
        });
    };

    const {getFieldDecorator} = props.form;

    // if (authContext.isLoggedIn) {
    //     redirectTo(DASHBOARD_PATH, { status: 301 });
    //     return null;
    // }

    return (
        <div className="login_form_wrapper">
            <Form onSubmit={handleSubmit} className="login_form">
                <h4 className="login_title">Login</h4>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [{
                            type: "email",
                            message: "The input is not valid E-mail!",
                        }, {required: true, message: "Please input your email!"}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                            placeholder="E-mail"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [{required: true, message: "Please input your Password!"}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                {authContext.error && <Form.Item>
                    <Alert message={authContext.error.message} type="error"/>
                </Form.Item>}
                <Form.Item>
                    {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login_form_forgot" href="#">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={authContext.loading}
                        className="login_form_button"
                        icon="login"
                    >
                        Log in
                    </Button>
                    Or <Link href={SIGNUP_PATH}><a>register now!</a></Link>
                </Form.Item>
            </Form>
        </div>
    );
};

Login.routeInfo = {
    slug: "login",
    path: "/login",
    pathAs: "/login"
};

Login.propTypes = {
    form: PropTypes.object
};

const WrappedLogin = Form.create({name: "login"})(Login);

WrappedLogin.isSimpleLayout = true;

export default WrappedLogin;
