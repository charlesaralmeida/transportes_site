export const openPage = (url) => {
    return () => window.open(url, '_blank');
}

export const makeTable = (headers, rows) => {
    return <table className='table'>
        <thead>
            <tr>
                {headers.map((h, index) => <th key={index}>{h}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map((row, index) => <tr key={index}>{Object.keys(row).map((key, index) => <td key={index}>{row[key]}</td>)}</tr>)}
        </tbody>
    </table>
}

export const getAdressLink = (cidade, endereco, uf) => {
    let link_endereco = endereco + " - " + cidade + " - " + uf;
    link_endereco = link_endereco.replace(/\s/g, "%20");
    let link = "https://www.google.com/maps/search/?api=1&query=" + link_endereco;
    return link;
}

export const setFocus = (ref) => () => ref.current.focus();

//recebe uma array de JSON e uma key
//retorna um objeto classificado pela key informada
export const groupByKey = (data, key) => {
    let dados = {}

    data.forEach(row => {
        if (dados[row[key]])
            dados[row[key]].push(row)
        else
            dados[row[key]] = [row]
    });

    return dados
}

//se o objeto possui: espaço, .$, [, ], /, #, º, - => substitui por underscore
let reg = /[\s\.\s]+|[\.\s]+|[\s\.]+|[\.]+|[\$]+|[\[]+|[\]]+|[/]+|[#]+|[º\s]+|[\s-\s]+|[\s-]+|[-\s]+|[-]+|[\s]/g;
export const fixObjKey = (obj) => {
    obj.forEach((instance, index) => {
        Object.keys(instance).forEach(key => {
            let old_key = key;
            key = key.replace(reg, "_");
            if (key != old_key) {
                instance[key] = instance[old_key];
                delete instance[old_key];
            }
            obj[index] = instance;
        })
    })
    return obj;
}
export const fixString = (string) => {
    return string.replace(reg, "_");
}

export const replaceObjData = (obj, key, old_value, new_value) => {
    for (let item in obj) {
        if (obj[key] == old_value) {
            obj[key] = new_value;
        }
    }
    return obj;
}

export const maskCodOrgao = (cod) =>{    
    return cod.slice(0, 2) + '.' + cod.slice(2, 4) + '.' + cod.slice(4, 6) + '.' + cod.slice(6, 8) + '.' + cod.slice(8, 10) + '.' + cod.slice(10, 12) + '.' + cod.slice(12, 14);
}

export const unmaskCodOrgao = (cod) =>{    
    return cod.split('.').join('');    
}

export const validateMoney = (numStr) => {
    let regex = /^\d+(?:\.\d{2})$/;
    return regex.test(numStr);
}

export const validadeEmailUnicamp = (email) =>{
    const PATTERN_MAIL = /@unicamp.br/;
    return email.search(PATTERN_MAIL) >= 0;
}

export const removeEmailDomain = (email) =>{
    return email.split('@')[0];
}

export const validateCNPJ = (numStr) => {
    if (numStr.length < 18)
        return false
    else
        return (numStr[2] === '.' && numStr[6] === '.' && numStr[10] === '/' && numStr[15] === '-')
}

export const getOnlyNumbers = (numStr) => {
    let pattern = /\d+/g;
    return numStr.match(pattern).join('');
}

export const maskDecimal = (numStr) => {
    let pattern = /\d+/g;
    numStr = numStr.match(pattern);

    if (numStr)
        numStr = numStr.join('');

    if (numStr > 2)
        numStr = numStr.slice(0, -2) + '.' + numStr.slice(-2);

    return numStr;
}

export const maskCNPJ = (numStr) => {

    numStr = getOnlyNumbers(numStr);

    if (numStr.length > 14) {
        numStr = numStr.slice(0, 2) + '.' + numStr.slice(2, 5) + '.' + numStr.slice(5, 8) + '/' + numStr.slice(8, 12) + '-' + numStr.slice(12, 14);
        return numStr;
    }

    if (numStr.length > 12) {
        numStr = numStr.slice(0, 2) + '.' + numStr.slice(2, 5) + '.' + numStr.slice(5, 8) + '/' + numStr.slice(8, 12) + '-' + numStr.slice(12);
        return numStr;
    }

    if (numStr.length > 8) {
        numStr = numStr.slice(0, 2) + '.' + numStr.slice(2, 5) + '.' + numStr.slice(5, 8) + '/' + numStr.slice(8);
        return numStr;
    }

    if (numStr.length > 5) {
        numStr = numStr.slice(0, 2) + '.' + numStr.slice(2, 5) + '.' + numStr.slice(5);
        return numStr;
    }

    if (numStr.length > 2) {
        numStr = numStr.slice(0, 2) + '.' + numStr.slice(2);
        return numStr;
    }

    return numStr;
}