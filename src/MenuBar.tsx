import Navbar from "react-bootstrap/Navbar";
import {Nav} from "react-bootstrap";
import React from "react";
import {RiShoppingBasketLine} from "react-icons/all";
import {IUser} from "./components/Login/IUser";
import {Link} from "react-router-dom";
import './style.css';

type MenuBarProps = {
    user: IUser | undefined,
    logout: () => void
}

export default class MenuBar extends React.Component<MenuBarProps> {
    constructor(props: MenuBarProps) {
        super(props);
    }

    onLogout = () => {
        this.props.logout();
        // useHistory().push("/")
    }

    render() {
        // @ts-ignore
        return (
          <body>
            <div>
                <div className="backgroundimg">
                    <div className="menu">
                    
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav"/> */}
                    {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
                        {/* <Nav className="mr-auto"> */}
                        <div className="option-header">
                            <Nav.Link href="news"><div className="option-header-inner">COVID NEWS</div></Nav.Link>
                        </div>
                        <div className="option-header">
                            <Nav.Link href="shop"><div className="option-header-inner">COVID SHOPS</div></Nav.Link>
                        </div>
                        {/* </Nav> */}
                        {/* <Nav>  this.props.user && */}

                        <div className="option-header-hidden">
                                {this.props.user && <Nav.Link href="medicalcheck"><div className="option-header-inner"> BADANIA</div></Nav.Link>}
                        </div>
                    
                            <div className="main-header">
                                <Navbar.Brand href="/" >
                                <div className="main-header-inner">PORTAL COVID</div>
                                </Navbar.Brand>
                            </div>



                            {/* {this.props.user && <Nav.Link href="editdata"> Edytuj dane</Nav.Link>} */}
                            <div className="option-header-hidden">
                                {this.props.user && <>
                            {/* <Link to="/panel" className="nav-link"> {this.props.user.credentials.role} panel</Link> */}
                                    <Nav.Link onClick={this.onLogout}><div className="option-header-inner">Logout</div></Nav.Link></>}
                            </div>
                            
							{!this.props.user && <><Link to="/login" className="nav-link"><div className="option-header-inner">ZALOGUJ SIĘ</div></Link>
							<Link to="/register" className="nav-link"><div className="option-header-inner">ZAREJESTRUJ SIĘ</div></Link></>}
							
                            {/* <div className="option-header">
                                {this.props.user && <Nav.Link href="editdata">
                                    <div className="option-header-inner">EDYTUJ DANE</div>
                                </Nav.Link>}
                            </div> */}

                        {/* </Nav> */}
                        {/* <Nav> */}
                        <div className="option-header-basket">
                            <Nav.Link href="mybasket">
                                <div className="option-header-inner"></div>
                                <RiShoppingBasketLine/></Nav.Link>
                        </div>
                        {/* </Nav> */}
                    </div>
                </div>
            </div>
          </body>
        );
    }
}
