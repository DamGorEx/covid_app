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
                    <Navbar.Brand href="/">Portal Covid</Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav"/> */}
                    {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
                        <Nav className="mr-auto">
                            <Nav.Link href="feed">Covid feed</Nav.Link>
                            <Nav.Link href="news">Covid news</Nav.Link>
                            <Nav.Link href="shop">Covid shop</Nav.Link>
                        </Nav>
                        <Nav>
                            {this.props.user && <Nav.Link href="medicalcheck"> Zapis na badania</Nav.Link>}

                            {this.props.user && <Nav.Link href="editdata"> Edytuj dane</Nav.Link>}
                            {this.props.user && <><Link to="/panel" className="nav-link"> {this.props.user.credentials.role} panel</Link>

                            <Nav.Link onClick={this.onLogout}>Logout</Nav.Link></>}
                            
							{!this.props.user && <><Link to="/login" className="nav-link"><div className="option-header-inner">ZALOGUJ SIĘ</div></Link>
							<Link to="/register" className="nav-link"><div className="option-header-inner">ZAREJESTRUJ SIĘ</div></Link></>}
							
                            <div className="option-header">
                                {this.props.user && <Nav.Link href="editdata">
                                    <div className="option-header-inner">EDYTUJ DANE</div>
                                </Nav.Link>}
                            </div>

                        </Nav>
                        {/* <Nav> */}
                        <div className="option-header">
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
