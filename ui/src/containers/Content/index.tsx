import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'; 

// Containers
import Device from '../Device';
import Toolbox from '../Toolbox';

// Config
import { GRAPHIC } from '../../config';

//Context
import {useInstances} from '../../context';

const Content = () => {
    const { currentInstance } = useInstances();

    return (
        <>
            {currentInstance !== null ?
            (
                <Box className="content-container" key={currentInstance}>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={6}>
                        <Device numCol={GRAPHIC.NUM_COL}/>
                        </Grid>
                        <Grid item xs={6} className="flex column">
                        <Toolbox/>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <div className="empty-content"/> //To bring footer on the bottom of the page
            )}
        </>
    )
}

export default Content;