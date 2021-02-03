import React, {useState} from 'react';
import '../../App.css';
import './LoginRegister.scss';
import {Col, Container, Row} from "react-bootstrap";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Done, Visibility, VisibilityOff} from "@material-ui/icons";
import {IUser} from "./IUser";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {MockUsers} from "../../mockData/InMemoryUsers";

type UserProps = {
    setUser: (username: IUser) => void
}

const Login = ({setUser}: UserProps) => {
    let history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [values, setValues] = useState({
        username: "",
        password: "",
        showPassword: false,
        loginError: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        const user: IUser | undefined = MockUsers.USERS.find((user: IUser) => user.credentials.login === values.username && user.credentials.password === values.password);
        if (user) {
            enqueueSnackbar(`Logged successfuly! Welcome ${user.credentials.login}`, {variant: 'success'});
            setValues({...values, loginError: false});
            setUser(user);
            history.push("/");
        } else {
            setValues({...values, loginError: true});
            enqueueSnackbar(`Wrong credentials!`, {variant: 'error'});
        }
    }


    return (<div>
        <Container className="login-container col-md-5">
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <h1>Login</h1>
                    <hr/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <FormControl>
                        <InputLabel>Username</InputLabel>
                        <Input
                            error={values.loginError}
                            id="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                    </FormControl>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input
                            error={values.loginError}
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                <Col sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Done>login</Done>}
                        onClick={handleLogin}
                    >
                        Send
                    </Button>
                </Col>
                <Col sm={3}>
                    <span>Forgot password</span>
                </Col>
            </Row>
        </Container>
    </div>);

}

export default Login;