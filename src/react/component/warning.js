import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {hideWarning, selectWarning} from '../../redux/warningSlice'
import '../../styles/transportes.css'


const Warning = (props) => {
    
    const dispatch = useDispatch();

    const warning = useSelector(selectWarning);

    return (
        <>
            <div className='modal' onClick={()=>dispatch(hideWarning(false))}>
                <div className="modal-content">
                    <div className="modal-bar-content">
                        <p>{warning.title}</p>
                    </div>
                    <div className="modal-content-content">
                        {warning.text}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Warning;