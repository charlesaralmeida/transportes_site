import React from 'react';
import InputMask from 'react-input-mask';

const MoneyInput = (props) => {
    return (
        <InputMask
            mask='99.999.999/9999-99'
            value={props.value}
            onChange={props.onChange}>
        </InputMask>
    )
}

export default MoneyInput;