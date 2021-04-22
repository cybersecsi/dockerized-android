import {useState, useEffect, createRef} from 'react';
import axios from 'axios';
import {Grid, Card, CardActions, CardContent, Button, Typography, List, ListItem, TextField} from '@material-ui/core';

// Icons
import ReplayIcon from '@material-ui/icons/Replay';
import SmsIcon from '@material-ui/icons/Sms';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import ForwardIcon from '@material-ui/icons/Forward';

// Config
import { BACKEND_ENDPOINT } from '../../config';

// Context
import { useSnackbar } from '../../context';

// Components
import { CustomModal, CustomDropzone, CustomTerminal } from '../../components';

// Types
import { IDeviceInfo, IModalData } from '../../types';

const Toolbox = () => {
    const { closeSnackbar, setSnackbarData } = useSnackbar();
    const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({type: "", androidVersion: "", processor: "", device: ""});
    const [modalData, setModalData] = useState<IModalData>({open: false, title: "", body: <></>, closeModal: () => null});
    const [fileData, setFileData] = useState<any>(null);

    //SMS Function Refs
    const phoneNumber = createRef<any>();
    const smsBody = createRef<any>();

    //Port Forward Function Refs
    const portNumber = createRef<any>();

    //Custom Terminal State
    const [cwd, setCwd] = useState('/');

    useEffect(() => {
        async function getDeviceInfo(){
            console.log(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_DEVICE}`)

            try{
                const deviceInfo = await axios.get(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_DEVICE}`);
                setDeviceInfo(deviceInfo.data);
            }
            catch (err){
                setSnackbarData({open: true, msg: "Error retrieving device info", severity: "error", closeSnackbar: closeSnackbar});
            }
        }

        async function getCwd(){
            try{
                const nextCwd = await axios.get(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_CWD}`);
                setCwd(nextCwd.data);
            }
            catch (err){
                setSnackbarData({open: true, msg: "Error retrieving current working directory", severity: "error", closeSnackbar: closeSnackbar});
            }
        }

        getCwd();
        getDeviceInfo();
    }, []);


    const closeModal = () => {
        setModalData(Object.assign({},modalData, {'open': false}));
    }

    const rebootDevice = async () => {
        try{
            await axios.get(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_REBOOT}`);
            setSnackbarData({open: true, msg: "Device rebooting...", severity: "success", closeSnackbar: closeSnackbar});
        }
        catch (err){
            setSnackbarData({open: true, msg: "Error rebooting device", severity: "error", closeSnackbar: closeSnackbar});
        }
    }

    const openSMSModal = () => {
        const modalBody = (
            <form>
                <TextField id="phone-number" label="Phone Number" variant="outlined" className="full-width mb-3" inputRef={phoneNumber}/>
                <TextField
                    id="sms"
                    label="SMS body"
                    multiline
                    rows={4}
                    variant="outlined"
                    className="full-width mb-3"
                    inputRef={smsBody}
                />
                <div className="modal-prompt">
                    <Button variant="contained" color="primary" onClick={sendSMS} startIcon={<SendIcon />}>Send</Button>
                    <Button variant="contained" color="primary" onClick={closeModal} startIcon={<CancelIcon />}>Cancel</Button>
                </div>
            </form>
        )

        const nextModalData = {
            'open': true,
            'title': "SMS Info",
            'body': modalBody,
            'closeModal': closeModal
        }

        setModalData(nextModalData);
    }

    const sendSMS = async () => {
        if(!phoneNumber.current || !smsBody.current){
            setSnackbarData({open: true, msg: "Phone number or SMS body are wrong", severity: "error", closeSnackbar: closeSnackbar});
            return;
        }

        const smsParams = {
            'phoneNumber': phoneNumber.current?.value,
            'message': smsBody.current?.value,
        }
        
        try{           
            await axios.post(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_SMS}`, smsParams);
            setSnackbarData({open: true, msg: "Sending SMS...", severity: "success", closeSnackbar: closeSnackbar});
        }
        catch (err){
            setSnackbarData({open: true, msg: "Error in sending SMS", severity: "error", closeSnackbar: closeSnackbar});
        }
        closeModal();
    }

    const installAPK = async () => {
        const formData = new FormData();
        formData.append('file', fileData); // appending file
        try{
            await axios.post(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_APK}`, formData);
            setSnackbarData({open: true, msg: "Installing APK...", severity: "success", closeSnackbar: closeSnackbar});
        }
        catch (err){
            setSnackbarData({open: true, msg: "Error in installing APK", severity: "error", closeSnackbar: closeSnackbar});
        }
    }

    const openPortForwardModal = () => {
        const modalBody = (
            <form>
                <TextField id="port-number" label="Port Number" variant="outlined" className="full-width mb-3" inputRef={portNumber}/>

                <div className="modal-prompt">
                    <Button variant="contained" color="primary" onClick={portForward} startIcon={<ForwardIcon />}>Forward</Button>
                    <Button variant="contained" color="primary" onClick={closeModal} startIcon={<CancelIcon />}>Cancel</Button>
                </div>
            </form>
        )

        const nextModalData = {
            'open': true,
            'title': "Port forward",
            'body': modalBody,
            'closeModal': closeModal
        }

        setModalData(nextModalData);
    }

    const portForward = async () => {
        try{           
            const forwardParams = {
                'portNumber': portNumber.current.value ?? "0",
            }
            await axios.post(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_FORWARD}`, forwardParams);
            setSnackbarData({open: true, msg: "Forwarding port...", severity: "success", closeSnackbar: closeSnackbar});
        }
        catch (err){
            setSnackbarData({open: true, msg: "Error in forwarding port", severity: "error", closeSnackbar: closeSnackbar});
        }
        closeModal();
    }

    const DeviceInfo = (
        <>
            <Typography variant="h5" component="h2">
                Device Info
            </Typography>
            <List>
                <ListItem disableGutters={true}><b>Type:&nbsp;</b> {deviceInfo.type ?? ""}</ListItem>
                <ListItem disableGutters={true}><b>Android version:&nbsp;</b> {deviceInfo.androidVersion ?? ""}</ListItem>
                <ListItem disableGutters={true}><b>Processor:&nbsp;</b> {deviceInfo.processor ?? ""}</ListItem>
                <ListItem disableGutters={true}><b>Device:&nbsp;</b> {deviceInfo.device ?? ""}</ListItem>
            </List>
        </>
    )

    const InstallAPKContent = (
        <>
            <Typography variant="h5" component="h2">
                Install APK
            </Typography>
            <CustomDropzone setFileData={setFileData} />
            <Button variant="contained" color="primary" className="full-width" onClick={installAPK} startIcon={<SystemUpdateIcon />}>Install APK</Button>
        </>
    )

    return (
        <>
            {/* Custom Modal for SMS */}
            <CustomModal {...modalData} />

            <Grid container justify="center" alignItems="stretch" spacing={3}>
                <Grid item xs={6} className="flex">
                    <Card className="full-width">
                        <CardContent>
                            {DeviceInfo}
                        </CardContent>
                        <CardActions>
                            {deviceInfo?.type === "Emulator" && (
                                <>
                                    <Button variant="contained" color="primary" className="full-width" onClick={rebootDevice} startIcon={<ReplayIcon />}>Reboot</Button>
                                    <Button variant="contained" color="primary" className="full-width" onClick={openSMSModal} startIcon={<SmsIcon />}>SMS</Button>
                                </>
                            )}

                        </CardActions>
                        <CardActions>
                            <Button variant="contained" color="primary" className="full-width" onClick={openPortForwardModal} startIcon={<ForwardIcon />}>Forward Port</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6} className="flex">
                    <Card className="full-width">
                        <CardContent>
                            {InstallAPKContent}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card className="mt-4 flex grow">
                <CardContent className="flex grow column">
                    <CustomTerminal cwd={cwd} onCwdChange={setCwd} key={cwd}/>
                </CardContent>
            </Card>
        </>
    )
}

export default Toolbox;
