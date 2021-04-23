import { useEffect, useState, createRef } from 'react';
import { Typography, Chip, TextField, Button } from '@material-ui/core';
import logo from '../../assets/images/logo.png';


// Icons
import ListIcon from '@material-ui/icons/List';
import AndroidIcon from '@material-ui/icons/Android';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PowerIcon from '@material-ui/icons/Power';
import CancelIcon from '@material-ui/icons/Cancel';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Context
import { useInstances, useSnackbar } from '../../context';

// Components
import { CustomModal } from '../../components';

const Header = () => {
    const { currentInstance, instances, setupInstanceManager, addInstance, changeCurrentInstance, clearAll } = useInstances();
    const { setSnackbarData, closeSnackbar } = useSnackbar();

    const [ modalData, setModalData ] = useState<{open: boolean, title: string, body: JSX.Element, closeModal: () => void}>({open: false, title: "", body: <></>, closeModal: () => null});

    // Instance refs
    const instanceManagerAddressRef = createRef<any>();
    const manualInstanceNameRef = createRef<any>();
    const manualInstanceAddressRef = createRef<any>();

    useEffect(() => {
        openSetupModal();
    }, [])

    useEffect(() => {
        if(!instances || instances.length === 0){
            openSetupModal();
        }
        else{
            console.log(instances)
            closeModal();
        }
    }, [instances, currentInstance])


    const connectToInstanceManager = () => {
        if(!instanceManagerAddressRef.current){
            setSnackbarData({open: true, msg: "No instance manager address", severity: "error", closeSnackbar: closeSnackbar});
            return;
        }

        setupInstanceManager(instanceManagerAddressRef.current?.value);
    }
    
    const connectToInstance = () => {
        if(!manualInstanceNameRef.current || !manualInstanceAddressRef.current){
            setSnackbarData({open: true, msg: "Instance info not provided", severity: "error", closeSnackbar: closeSnackbar});
            return;
        }

        addInstance({name:manualInstanceNameRef.current?.value, address: manualInstanceAddressRef.current?.value})
    }

    const openSetupModal = () => {
        setModalData({
            open: true,
            title: "Initial setup",
            closeModal: () => null,
            body: (
            <form>
                <div className="full-width mb-5">
                    <p>Are you using the <b>Instance Manager</b>?</p>
                </div>
                <div className="modal-prompt mt-5">
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => openInstanceManagerSetupModal()} startIcon={<ListIcon />}>Instance Manager</Button>
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => openManualSetupModal()} startIcon={<BuildIcon />}>Manual Setup</Button>
                </div>
            </form>
            )
        })
    }

    const openInstanceManagerSetupModal = () => {
        setModalData({
            open: true,
            title: "Instance Manager setup",
            closeModal: () => null,
            body: (
            <form>
                <TextField id="instance-manager-address" label="Instance Manager Address" variant="outlined" className="full-width mb-3" inputRef={instanceManagerAddressRef}/>
                <div className="modal-prompt mt-5">
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => connectToInstanceManager()} startIcon={<PowerIcon />}>Connect</Button>
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => openSetupModal()} startIcon={<ArrowBackIosIcon />}>Go back</Button>
                </div>
            </form>
            )
        })
    }

    const openManualSetupModal = () => {
        setModalData({
            open: true,
            title: "Manual setup",
            closeModal: () => null,
            body: (
            <form>
                <TextField id="manual-instance-name" label="Instance Name" variant="outlined" className="full-width mb-3" inputRef={manualInstanceNameRef}/>
                <TextField id="manual-instance-address" label="Instance Address" variant="outlined" className="full-width mb-3" inputRef={manualInstanceAddressRef}/>
                <div className="modal-prompt mt-5">
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => connectToInstance()} startIcon={<PowerIcon />}>Connect</Button>
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => openSetupModal()} startIcon={<ArrowBackIosIcon />}>Go back</Button>
                </div>
            </form>
            )
        })
    }

    const openNewInstanceModal = () => {
        setModalData({
            open: true,
            title: "Connect to new instance",
            closeModal: () => null,
            body: (
            <form>
                <TextField id="manual-instance-name" label="Instance Name" variant="outlined" className="full-width mb-3" inputRef={manualInstanceNameRef}/>
                <TextField id="manual-instance-address" label="Instance Address" variant="outlined" className="full-width mb-3" inputRef={manualInstanceAddressRef}/>
                <div className="modal-prompt mt-5">
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => connectToInstance()} startIcon={<PowerIcon />}>Connect</Button>
                    <Button variant="contained" color="primary" className="white-space-nowrap" onClick={() => closeModal()} startIcon={<CancelIcon />}>Close</Button>
                </div>
            </form>
            )
        })
    }

    const closeModal = () => {
        setModalData({...modalData, open: false})
    }

    return (
        <>
            <CustomModal {...modalData} />
            <div id="header" className="flex-center-center">
                <div id="logo">
                    <Typography align="center" noWrap className="header-title">Dockerized Android <img className="header-logo" src={logo} alt="Logo" /></Typography>
                </div>
                <div id="instance-chips">
                    
                    {instances?.map((instance) => {
                        console.log(instance)
                        return (
                            <Chip 
                                icon={<AndroidIcon className={`${currentInstance === instance.id && 'selected-chip'}`} />}
                                className={`custom-chip ${currentInstance === instance.id && 'selected-chip'}`}
                                label={instance.name}
                                clickable
                                onClick={() => changeCurrentInstance(instance.id)}
                            />
                        )
                    })}
                    <Chip
                        icon={<AddIcon className="add-instance-icon"/>}
                        label="New Instance"
                        className="custom-chip add-instance-chip"
                        clickable
                        onClick={() => openNewInstanceModal()}
                    />
                    <Chip
                        icon={<CloseIcon className="clear-all-icon" />}
                        label="Clear all"
                        className="custom-chip clear-all-chip"
                        clickable
                        onClick={() => clearAll()}
                    />
                </div>
            </div>
        </>
    )
}

export default Header;