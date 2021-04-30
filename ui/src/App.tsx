import {useEffect} from 'react';


// Containers
import { Header, Content, Footer } from './containers';

// Cross Screen
import CrossScreen from './cross-screen';

// Providers
import { FeaturesProvider, SnackbarProvider, InstancesProvider } from './context';

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
    <SnackbarProvider>
      <InstancesProvider>
        <FeaturesProvider>
          {/* Cross Screen component */}
          <CrossScreen />

          {/* UI structure */}
          <Header />
          <Content/>
          <Footer />
  
        </FeaturesProvider>
      </InstancesProvider>
    </SnackbarProvider>
  );
}

export default App;
