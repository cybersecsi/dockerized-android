import { VncScreen } from 'react-vnc';
import { BACKEND_ENDPOINT } from '../../config';

// Context
import { useInstances } from '../../context';

interface DeviceProps {
    numCol: number,
}

const Device = (props: DeviceProps) => {
    const { instances, currentInstance } = useInstances();

    return (
        <div className={`device-container-${props.numCol.toString()}`}>
            {instances && currentInstance !== null && instances[currentInstance] && (
                <VncScreen
                    scaleViewport
                    url={`${BACKEND_ENDPOINT.VNC_PREFIX}${instances[currentInstance].address}:${instances[currentInstance].vnc_port}`}
                    style={{
                        height: "100%",
                    }}
                />
            )}

        </div>
    )
}

export default Device;