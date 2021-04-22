import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

//Types 
import { ISnackbarData } from '../../types';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * 
 * @param {*} props: open, severity (error, warning, info, success), closeSnackbar, msg
 */

const CustomSnackbar = (props: ISnackbarData) => {
    const handleClose = () => {
        props.closeSnackbar();
    }

    return (
        <div className="custom-snackbar">
            <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity}>
                    {props.msg}
                </Alert>
            </Snackbar>
        </div>
    )
}


export default CustomSnackbar