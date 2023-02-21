import React from 'react'
import '../../styles/transportes.css'


//use this code to set state inside a componente:
// const [isLoaderActive, toggleLoader] = useState(false);
//use this to show or hide the loader:
// toggleLoader(true) ou toggleLoader(false);
//use this inside the component to render the loader
// <Loader isActive={isLoaderActive} />


const Loader = (props) =>
    <>
        {props.isActive ? <div className='modal'>
            <div className='center'>
                <div className='loader' />
            </div>
        </div> : null}
    </>

export default Loader;