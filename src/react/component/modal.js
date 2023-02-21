import React from 'react';
import '../../styles/transportes.css';

const Modal = (props) => {    
    return (
        <div className='modal' style={{ display: 'block' }} onClick={props.closeModal}>
            {props.modal}
        </div>
    );
}

export default Modal;