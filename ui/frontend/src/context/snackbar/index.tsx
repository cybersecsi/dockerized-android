import { useState, createContext, useContext } from "react";

//Types
import { ISnackbarData } from '../../types';

interface SnackbarProps {
    snackbarData: ISnackbarData,
    setSnackbarData: (data: ISnackbarData) => void,
    closeSnackbar: () => void,
}

const SnackbarContext = createContext<SnackbarProps | null>(null);

const SnackbarProvider = ({ children }: any) => {
    const [ snackbarState, setSnackbarState ] = useState<ISnackbarData>({open: false, severity: 'info', closeSnackbar: () => null, msg: ""});

    const closeSnackbar = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
        })
    }

    return (
        <SnackbarContext.Provider
            value={{
                snackbarData: snackbarState,
                setSnackbarData: setSnackbarState,
                closeSnackbar: closeSnackbar,
            }}
        >
           {children} 
        </SnackbarContext.Provider>
    )
}

const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context){
        throw new Error('useSnackbar must be used within SnackbarProvider');
    }
    return context;
}

export { SnackbarProvider, useSnackbar };