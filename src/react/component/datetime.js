import React, {useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/pt-br";
import indigo from "@material-ui/core/colors/indigo";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

moment.locale("pt-br");

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: indigo[900],
        }
    },
});

export const TimeSelectInput = (props) => {

    const [selectedTime, changeTime] = useState(new Date());

    const handleTimeChange = (timeFullInfo) => {
        changeTime(timeFullInfo);
        let timeOnly = null;
        if (timeFullInfo)
            timeOnly = timeFullInfo.format('kk:mm:ss');
        props.handleTimeChange(timeOnly);
    };

    return <div style={{ width: '15%' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardTimePicker
                    autoOk
                    inputVariant="outlined"
                    variant="inline"
                    openTo="hours"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    placeholder="00:00"
                    format="HH:mm"
                    invalidDateMessage='Horário inválido'
                />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    </div>
}

export const DateSelectInput = (props) => {

    const [selectedDate, changeDate] = useState(new Date());

    const handleDateChange = (dateFullInfo) => {
        changeDate(dateFullInfo);
        let dateOnly = null;
        if (dateFullInfo)
            dateOnly = dateFullInfo.format('DD/MM/YYYY')
        props.handleDateChange(dateOnly);
    };

    return <div style={{ width: '15%' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                    autoOk
                    disablePast
                    disableToolbar
                    inputVariant="outlined"
                    variant="inline"
                    placeholder="dd/mm/aaaa"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    invalidDateMessage='Data inválida'
                    minDateMessage='Data deve ser maior ou igual à data atual'
                    minDate={new Date()}
                    initialFocusedDate={new Date()}
                />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    </div>
}