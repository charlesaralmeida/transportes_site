import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const AddressInput = () => {

    const [endereco, changeEndereco] = useState('');

    return <TextField fullWidth
        label='Endereço'
        helperText='rua/avenida/praça/nº/etc'
        onChange={changeEndereco}
    />
}

export default AddressInput;
