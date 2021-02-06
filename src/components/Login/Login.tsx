import React, {useState} from 'react';
import '../../App.css';
import './LoginRegister.scss';
import {Col, Container, Row} from "react-bootstrap";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import {Done, Visibility, VisibilityOff} from "@material-ui/icons";
import {IUser} from "./IUser";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";

type UserProps = {
    setUser: (username: IUser) => void
}


const Login = ({setUser}: UserProps) => {
    let history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [values, setValues] = useState<any>({
        username: "",
        password: "",
        showPassword: false,
        loginError: false,
        fetchedUser: false,
        loggingFailed: false
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

    const handleLogin = async () => {
        try {
            let logInfo = 'Basic ' + window.btoa(values.username + ':' + values.password);
            const resp = await fetch("http://localhost:8080/login", {
                headers: {'Authorization': logInfo}
            });
            if (!resp.ok) {
                setValues({...values, loginError: true});
                enqueueSnackbar(`Wrong credentials!`, {variant: 'error'});
            }
            localStorage.setItem("logInfo", logInfo);
            const json = await resp.json();
            localStorage.setItem("user", JSON.stringify(json));
            setUser(json);
            enqueueSnackbar(`Logged successfuly! Welcome ${values.username}`, {variant: 'success'});
            setValues({...values, loginError: false});
            history.push("/");
        } catch (e) {
            setValues({...values, loginError: true});
            enqueueSnackbar(`Wrong credentials!`, {variant: 'error'});
            console.log(e);
        }
    }

    return (
        <div>
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