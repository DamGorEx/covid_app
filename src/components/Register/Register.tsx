import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Button, TextField} from "@material-ui/core";
import {Done} from "@material-ui/icons";
import '../Login/LoginRegister.scss';
import {IUser, Role} from "../Login/IUser";
import {addUser} from "../../mockData/UserService";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";


const stub: IUser = {
    name: '',
    lastName: '',
    credentials: {login: '', password: '', role: Role.USER}
}

const Register = () => {
    let history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [user, setUser] = useState<IUser>(stub);
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        login: {error: '', message: 'Enter right login!'},
        password: {error: '', message: 'Passwords are not the same or too short!'},
        name: {error: '', message: 'Enter right name!'},
        lastName: {error: '', message: 'Enter right last name!'},
    });

    useEffect(() => {
        setUser(stub);
    }, [])


    const validatePassword = (password: string, rPassword: string): number => {
        const message = password && rPassword && password === rPassword ? "" : errors.password.message;
        setErrors(prevState => {
                return {...prevState, password: {...errors["password"], error: message}}
            }
        );
        return message ? 1 : 0;
    }

    const validate = (): number => {
        let sum = 0;
        sum += handleChange("login", user.credentials.login);
        sum += handleChange("name", user.name);
        sum += handleChange("lastName", user.lastName);
        sum += validatePassword(user.credentials.password, rePassword);
        return sum;
    };

    const handleChange = (id: 'login' | 'name' | 'lastName', value: string): number => {
        let message = "";
        let sum = 0;
        if (!value || value.length < 1) {
            message = errors[id].message;
            sum++;
        }
        setErrors(prevState => {
                return {...prevState, [id]: {...errors[id], error: message}}
            }
        );
        return sum;
    };

    const handleRegister = () => {
        const sum = validate();
        if (!sum) {
            addUser(user);
            enqueueSnackbar("Account created successfully!", {
                variant: "success"
            });
            history.push("/login");
        }
    }


    return (
        <body>
        <div className="wizyta-dane">
              <p className="wizyta-dane-headers">REGISTER</p>
            </div>



        <div>
            <Container >
                {/* <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <h1>Register</h1>
                        <hr/>
                    </Col>
                </Row> */}
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <TextField
                            required
                            error={!!errors.login.error}
                            id="login"
                            label="Login"
                            value={user.credentials.login}
                            helperText={errors.login.error}
                            onChange={event => {
                                setUser({...user, credentials: {...user.credentials, login: event.target.value}})
                                handleChange("login", event.target.value);
                            }}

                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <TextField
                            required
                            error={!!errors.password.error}
                            id="password"
                            label="Password"
                            type="password"
                            value={user.credentials.password}
                            helperText={errors.password.error}
                            onChange={event => {
                                setUser({...user, credentials: {...user.credentials, password: event.target.value}})
                            }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <TextField
                            required
                            error={!!errors.password.error}
                            id="rePassword"
                            label="Repeat Password"
                            type="password"
                            value={rePassword}
                            helperText={errors.password.error}
                            onChange={event => setRePassword(event.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <TextField
                            required
                            error={!!errors.name.error}
                            id="name"
                            label="Name"
                            value={user.name}
                            helperText={errors.name.error}
                            onChange={event => {
                                setUser({...user, name: event.target.value})
                                handleChange("name", event.target.value);
                            }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <TextField
                            required
                            error={!!errors.lastName.error}
                            id="lastName"
                            label="Last Name"
                            value={user.lastName}
                            helperText={errors.lastName.error}
                            onChange={event => {
                                setUser({...user, lastName: event.target.value})
                                handleChange("lastName", event.target.value);
                            }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
                    <Col sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Done>register</Done>}
                            onClick={handleRegister}
                        >
                            register
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="title-space"></div>
        <div className="title-space"></div>

        <div>
          <div className="footer">
              <div className="footerTop">
                  CONTENT MANAGEMENT SYSTEM - PJATK
              </div>

              <div className="footerBottom">
                <div className="footerBottomLeft">
                    DOMINIKA ŁUGOWSKA <div className="pStyle3"></div>
                    MICHELLE HEROK <div className="pStyle3"></div>
                    DAMIAN GORAJ <div className="pStyle3"></div>
                    MARCIN CHOJNACKI
                </div>
                <div className="footerBottomRight">
                    PJATK <div className="pStyle3"></div>
                    Koszykowa 86,<div className="pStyle3"></div>
                    02-008 Warszawa
                </div>
              </div>
          </div>
        </div>



        </body>
    )
}


export default Register;