import {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Containers
import { Header, Device, Toolbox, Footer } from './containers';

// Cross Screen
import CrossScreen from './cross-screen';

// Config
import { GRAPHIC } from './config';

// Providers
import { FeaturesProvider, SnackbarProvider } from './context';

const App = () => {

  useEffect(() => {
      const updateTerminalHeight = () => {
        const actualHeight = document.querySelector('.custom-terminal')?.clientHeight;
        const terminalBase = document.querySelector('.terminal-base') as HTMLElement;
        terminalBase.style.height = actualHeight+"px";
      }
      window?.addEventListener('resize', updateTerminalHeight);   
  }, []);

  return (
    <FeaturesProvider>
      <SnackbarProvider>
        {/* Cross Screen component */}
        <CrossScreen />

        {/* UI structure */}
        <Header />
        <Box className="content-container">
          <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
              <Device numCol={GRAPHIC.NUM_COL}/>
            </Grid>
            <Grid item xs={6} className="flex column">
              <Toolbox/>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </SnackbarProvider>
    </FeaturesProvider>
  );
}

export default App;
