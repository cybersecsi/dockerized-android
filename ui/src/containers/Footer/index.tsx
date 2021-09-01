
import { Box, Link, Typography } from '@material-ui/core';
import { Favorite, GitHub} from '@material-ui/icons';

//Config
import { CREDITS } from '../../config'
  
const Footer = () => {
    return (
        <footer className="footer flex-center-center wrap">
            <Box alignItems="center" marginBottom="10px">
                <Link href={CREDITS.GITHUB} color="inherit">
                <GitHub className="hover-icon github-icon"/>
                </Link>
            </Box>
            <div className="break"/>
            <Typography variant="subtitle1" align="center" noWrap className="footer-subtitle">
                Made with <Favorite fontSize="small" color="secondary" /> by SecSI
            </Typography>
        </footer>
    )
}


export default Footer;