//npm install xlsx
import { isRejected } from '@reduxjs/toolkit';
import * as XLSX from 'xlsx'

const toArray = (fileUpload) => {
    return new Promise((resolve) => {
        let regex = /[a-zA-Z\u00C0-\u00FF ]+/i;
        if (regex.test(fileUpload.name.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                let reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        let workbook = XLSX.read(e.target.result, {
                            type: 'binary'
                        });
                        let firstSheet = workbook.SheetNames[0];                        
                        resolve(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]));                                                
                    };
                    reader.readAsBinaryString(fileUpload);
                } else {
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        let workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        let firstSheet = workbook.SheetNames[0];                        
                        resolve(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]));                                                
                    };
                    reader.readAsArrayBuffer(fileUpload);
                }
            } else
                alert("This browser does not support HTML5.");
        } else
            alert("Please upload a valid Excel file.");
    });
}

const arrayToExcel = (data) => {        
    /* make the worksheet */
    let ws = XLSX.utils.json_to_sheet(data);
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OS");    
    /* generate an XLSX file */
    XLSX.writeFile(wb, "relatorio.xlsx");   
}

const Excel = {
    toArray,
    arrayToExcel
}

export default Excel;