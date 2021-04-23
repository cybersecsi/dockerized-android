import { useEffect } from 'react';
//Material UI imports
import {Typography} from '@material-ui/core';

//Dependencies
import axios from 'axios';
import Terminal from 'terminal-in-react';
import { useResizeDetector } from 'react-resize-detector';

//Context
import { useFeatures, useSnackbar } from '../../context';

//Config
import { BACKEND_ENDPOINT } from '../../config';

//Types 
import { IFeatures, ISnackbarData } from '../../types';

interface CustomTerminalProps {
    cwd: string,
    onCwdChange: (nextCwd: string) => void,
}

const CustomTerminal = (props: CustomTerminalProps) => {
    const availableFeatures: IFeatures = useFeatures();
    const { setSnackbarData, closeSnackbar } = useSnackbar();
    const { height, ref } = useResizeDetector();
    
    useEffect(() => {
        const actualHeight = document.querySelector('.custom-terminal')?.clientHeight;
        const terminalBase = document.querySelector('.terminal-base') as HTMLElement;
        terminalBase.style.height = actualHeight+"px";
    }, [height]);

    return (
        <>
            <Typography variant="h5" component="h2">
                Terminal
            </Typography>
            <div className={`custom-terminal pt-3 grow`} ref={ref}>
                <Terminal
                promptSymbol={`${props.cwd} > `}
                hideTopBar={true}
                allowTabs={false}
                color='#fff'
                outputColor='#f50057'
                backgroundColor='black'
                barColor='black'
                style={{ fontWeight: "bold", fontSize: "1em" }}
                commandPassThrough={(cmd: string, print: (data: string) => void) => {     
                    if(!availableFeatures.TERMINAL){
                        return;
                    }
                    
                    const terminalArgs = {
                        'arg': cmd
                    }
                    axios.post(`${BACKEND_ENDPOINT.API}${BACKEND_ENDPOINT.PATH_TERMINAL}`, terminalArgs)
                    .then((res: any) => {
                        print(res.data.output)
                        props.onCwdChange(res.data.cwd)
                    })                
                    .catch ((err) => {
                        const nextSnackbarData: ISnackbarData = {
                            open: true,
                            msg: "Error in terminal",
                            severity: "error",
                            closeSnackbar: closeSnackbar,
                        }
                        setSnackbarData(nextSnackbarData);
                    })
                }}
                msg="You can (almost) fully control the terminal from here. It's handy, right?"
                />
            </div>
        </>
    )
}

export default CustomTerminal;