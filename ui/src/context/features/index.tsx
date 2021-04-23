import { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios';

// Config
import { BACKEND_ENDPOINT } from '../../config';

// Types
import { IFeatures } from '../../types';

// Context
import { useInstances } from '../instances';

const FeaturesContext = createContext<IFeatures | null>(null);

const FeaturesProvider = ({ children }: any) => {
    const { instances, currentInstance } = useInstances();
    const [ availableFeatures, setAvailableFeatures ] = useState<IFeatures>({TERMINAL: false, APK: false, SMS: false, FORWARD: false, DEVICEINFO: false, REBOOT: false});

    useEffect(() => {
        const getFeatures = async () => {
            if(!instances || currentInstance === null || !instances[currentInstance]){
                return;
            }

            try {
                const backendResponse = await axios.get(`${BACKEND_ENDPOINT.CORE_PREFIX}${instances[currentInstance].address}:${instances[currentInstance].core_port}${BACKEND_ENDPOINT.PATH_FEATURES}`);
                const _availableFeatures: IFeatures = backendResponse.data;
                console.log("Got available features:")
                console.log(_availableFeatures)
                setAvailableFeatures(_availableFeatures);
            }
            catch (error) {
                console.log("Cannot get features available from backend, everything set to false")
            }
        }

        if(currentInstance !== null){
            getFeatures();
        }
    }, [currentInstance])

    return (
        <FeaturesContext.Provider
            value={{
                ...availableFeatures
            }}
        >
           {children} 
        </FeaturesContext.Provider>
    )
}

const useFeatures = () => {
    const context = useContext(FeaturesContext);
    if (!context){
        throw new Error('useSnackbar must be used within FeaturesProvider');
    }
    return context;
}

export { FeaturesProvider, useFeatures };