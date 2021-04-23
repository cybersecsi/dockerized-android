import { Typography } from '@material-ui/core';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <div id="header" className="flex-center-center">
            <Typography align="center" noWrap className="header-title">Dockerized Android <img className="header-logo" src={logo} alt="Logo" /></Typography>
        </div>
    )
}

export default Header;