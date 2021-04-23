import { CustomSnackbar } from '../components';
import { useSnackbar } from '../context';


/*
Used to show cross screen component:
    - Snackbar
*/

const CrossScreen = () => {
    const { snackbarData } = useSnackbar();

    return (
        <>
            <CustomSnackbar {...snackbarData} />
        </>
    )

}

export default CrossScreen;