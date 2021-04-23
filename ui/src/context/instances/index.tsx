import { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios';

// Config
import { INSTANCE_MANAGER_ENDPOINT } from '../../config';

// Types
import { IInstance } from '../../types';

interface InstanceWithID extends IInstance{
    id: number
}

interface InstacenContextProps {
    instanceManagerEnabled: boolean | null,
    instanceManagerAddress: string | null,
    setupInstanceManager: (address: string) => void,
    instances: InstanceWithID[] | null,
    currentInstance: number | null,
    addInstance: (instance: IInstance) => void,
    removeInstance: (id: number) => void,
    changeCurrentInstance: (id: number) => void,
    clearAll: () => void,
}

const InstancesContext = createContext<InstacenContextProps | null>(null);

const InstancesProvider = ({ children }: any) => {
    const [ instanceManagerStatus, setInstanceManagerStatus ] = useState<boolean | null>(null);
    const [ instanceManagerAddress, setInstanceManagerAddress ] = useState<string | null>(null);
    const [ instances, setInstances ] = useState<InstanceWithID[] | null>(null);
    const [ currentInstance, setCurrentInstance ] = useState<number | null>(null);

    useEffect(() => {
        const _rawCurrentinstance = sessionStorage.getItem('currentInstance');
        const _rawInstances = sessionStorage.getItem('instances');
        const _rawInstanceManagerStatus = sessionStorage.getItem('instanceManagerStatus');
        // parsed values from sessionStorage
        const _currentInstance = _rawCurrentinstance !== null ? parseInt(_rawCurrentinstance) : null;
        const _instances = _rawInstances !== null ? JSON.parse(_rawInstances) : null;
        const _instanceManagerStatus = _rawInstanceManagerStatus !== null ? (_rawCurrentinstance === "true") : null 
        const _instanceManagerAddress = sessionStorage.getItem('instanceManagerAddress');
        // Set values (null is okay)
        setCurrentInstance(_currentInstance)
        setInstances(_instances);
        setInstanceManagerStatus(_instanceManagerStatus);
        setInstanceManagerAddress(_instanceManagerAddress);        
    }, [])

    useEffect(() => {
        const getInstances = async () => {
            try {
                const instanceManagerResponse = await axios.get(`http://${instanceManagerAddress}${INSTANCE_MANAGER_ENDPOINT.PATH_INSTANCES}`);
                const _instancesWithoutId: IInstance[] = instanceManagerResponse.data;
                if (_instancesWithoutId.length > 0){
                    const _instances: InstanceWithID[] = _instancesWithoutId.map((i: IInstance, key: number) => Object.assign({},{...i, id: key}) )
                    setInstances(_instances);
                    setCurrentInstance(0);
                    // Set session storage
                    sessionStorage.setItem('instances', JSON.stringify(_instances));
                    sessionStorage.setItem('currentInstance', '0')
                }
                else {
                    setInstanceManagerStatus(false);
                    setInstanceManagerAddress(null);
                    // Set session storage
                    sessionStorage.setItem('instanceManagerStatus', 'false');
                    sessionStorage.removeItem('instanceManagerAddress')
                }
            }
            catch (error) {
                console.log("Cannot get instances from instance-manager");
                setInstanceManagerStatus(false);
                setInstanceManagerAddress(null);
                // Set session storage
                sessionStorage.setItem('instanceManagerStatus', 'false');
                sessionStorage.removeItem('instanceManagerAddress')
            }
        }

        if(instanceManagerStatus && instanceManagerAddress){
            console.log("Loading instances...")
            getInstances();
        }
    }, [instanceManagerStatus, instanceManagerAddress])


    const setupInstanceManager = (address: string) => {
        setInstanceManagerAddress(address)
        setInstanceManagerStatus(true);
        // Set session storage
        sessionStorage.setItem('instanceManagerAddress', address);
        sessionStorage.setItem('instanceManagerStatus', 'true')
    }

    const addInstance = (_instance: IInstance) => {
        const _id: number = instances ? instances.length : 0;
        const _instances: InstanceWithID[] = [{..._instance, id: _id}].concat(instances ?? []);
        setInstances(_instances);
        setCurrentInstance(_id);
        // Set session storage
        sessionStorage.setItem('instances', JSON.stringify(_instances));
        sessionStorage.setItem('currentInstance', _id.toString())
    }

    const removeInstance = (id: number) => {
        if (instances && instances[id]){
            const _instances: InstanceWithID[]  = instances?.splice(id, 1);
            setInstances(_instances);
            const _nextCurrentInstance: number | null = _instances.length === 0 ? null : id - 1;
            setCurrentInstance(_nextCurrentInstance)
            // Set session storage
            sessionStorage.setItem('instances', JSON.stringify(_instances));
            if(_nextCurrentInstance !== null){
                sessionStorage.setItem('currentInstance', _nextCurrentInstance.toString());
            }
            else {
                sessionStorage.removeItem('currentInstance');
            }
        }
    }

    const changeCurrentInstance = (id: number) => {
        if(instances && instances[id]){
            setCurrentInstance(id);
            // Set session storage
            sessionStorage.setItem('currentInstance', id.toString())
        }
    }

    const clearAll = () => {
        setInstanceManagerStatus(null);
        setInstanceManagerAddress(null);
        setInstances(null);
        setCurrentInstance(null);
        // Set session storage
        sessionStorage.removeItem('instanceManagerStatus')
        sessionStorage.removeItem('instanceManagerAddress')
        sessionStorage.removeItem('instances')
        sessionStorage.removeItem('currentInstance')
    }

    return (
        <InstancesContext.Provider value={{
            instances: instances,
            instanceManagerEnabled: instanceManagerStatus,
            instanceManagerAddress: instanceManagerAddress,
            setupInstanceManager: setupInstanceManager,
            addInstance: addInstance,
            removeInstance: removeInstance,
            changeCurrentInstance: changeCurrentInstance,
            currentInstance: currentInstance,
            clearAll: clearAll,
        }}>
            {children}
        </InstancesContext.Provider>
    )
}

const useInstances = () => {
    const context = useContext(InstancesContext);
    if (!context){
        throw new Error('useInstances must be used within InstancesProvider');
    }
    return context;
}

export { InstancesProvider, useInstances };