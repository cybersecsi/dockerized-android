import { VncScreen } from 'react-vnc';
import { BACKEND_ENDPOINT } from '../../config';

interface DeviceProps {
    numCol: number,
}

const Device = (props: DeviceProps) => {
    return (
        <div className={`device-container-${props.numCol.toString()}`}>

            <VncScreen
                scaleViewport
                url={BACKEND_ENDPOINT.VNC}
                style={{
                    height: "100%",
                }}
            />

        </div>
    )
}

export default Device;