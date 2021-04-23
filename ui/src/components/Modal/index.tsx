import Modal from '@material-ui/core/Modal';
import { Backdrop, Fade } from '@material-ui/core';

//Types 
import { IModalData } from '../../types';

const CustomModal = (props: IModalData) => {

    const handleClose = () => {
        props.closeModal();
    }

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="custom-modal"
        open={props.open ?? false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open ?? false}>
          <div className="custom-modal-paper">
            <h2 id="transition-modal-title">{props.title}</h2>
            {props.body}
          </div>
        </Fade>
      </Modal>
    )
}

export default CustomModal;