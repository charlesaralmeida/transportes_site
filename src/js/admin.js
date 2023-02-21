import { getUserProfile, isUserUnicamp, PATH_OS_NOT_VALIDATED, PATH_OS_VALIDATED, PATH_OS_PROCESSED, readData, updateData, writeData, deleteData } from "../admin/js/firebase.js"

function getOsNotValidated(target_id) {
    let user = getUserProfile();
    if (isUserUnicamp(user)) {
        let data = [];
        let find = readData(PATH_OS_NOT_VALIDATED);
        find.then((result) => {
            let container = document.getElementById(target_id);
            for (let os in result) {
                data.push(result[os]);
                let div = document.createElement("div");
                let line = document.createElement("hr");
                div.appendChild(line);
                let p = document.createElement("p");
                p.innerHTML = os;
                div.appendChild(p);
                for (let item in result[os]) {
                    let p = document.createElement("p");
                    p.innerHTML = item + ": " + result[os][item];
                    div.appendChild(p);
                }
                line = document.createElement("hr");
                div.appendChild(line);
                container.appendChild(div);
            }
            console.log(data);
        })
            .catch((error) => console.log(error));
    }
}

function getOsValidated(target_id) {
    let user = getUserProfile();
    if (isUserUnicamp(user)) {
        let data_os = {};
        let find = readData(PATH_OS_VALIDATED);
        find.then((result) => {
            if (result) {
                let container = document.getElementById(target_id);
                for (let item in result) {
                    console.log(result[item]);
                    let p = document.createElement('p');
                    p.innerHTML = JSON.stringify(result[item]);
                    container.appendChild(p);
                }
            } else (alert('Nenhuma OS para ser processada'));
        })
            .catch((error) => console.log(error));
    }
}

function exportOsToExcel() {
    let user = getUserProfile();
    if (isUserUnicamp(user)) {
        let data = [];
        let find = readData(PATH_OS_VALIDATED);
        find.then((result) => {
            if (result) {
                for (let os in result) {
                    let base = result[os];
                    let aux = {
                        OS: base["os_id"],
                        Data_emissão: base["data_gerada"],
                        Data_validação: base["data_validada"],
                        Frota: base["frota"],
                        Placa: base["placa"],
                        Cod_unidade: base["cod_unidade"],
                        Tipo_serviço: base["tipo"],
                        Valor: convertMoney(base["valor"]),
                        CNPJ_Fornecedor: CNPJOnlyNum(base["fornecedor_cnpj"]),
                        Fornecedor_nome: base["fornecedor_nome"],
                        Nome_solicitante: base["name"],
                        Email_solicitante: base["email"],
                        Cod_autenticação: base["auth_code"]
                    };
                    data.push(aux);
                }
                array_to_excel(data);
            } else (alert('Nenhuma OS para ser processada'));
        })
            .catch((error) => console.log(error));
    }
}

function CNPJOnlyNum(cnpj) {
    let reg = /[\.]+|[\-]+|[\/]/g;
    cnpj = cnpj.replace(reg, "");
    return cnpj;
}

function convertMoney(value) {
    let reg = /[\.]/g;
    value = value.replace(reg, ",");
    value = parseFloat(value);
    return value;
}

function processAllOs() {
    let user = getUserProfile();
    if (isUserUnicamp(user)) {
        if (confirm('Confirmar processamento?')) {
            let find = readData(PATH_OS_VALIDATED);
            find.then((result) => {
                if (result) {
                    for (let os in result) {
                        let date = disjointDate(result[os]["data_validada"], "/");
                        let year = date[2];
                        let month = date[1];
                        let day = date[0];
                        let path = PATH_OS_PROCESSED + "/" + year + "/" + month + "/" + day + "/" + result[os]["auth_code"];
                        let data = result[os];
                        let save = updateData(path, data);
                        save
                            .then(() => {
                                let path = PATH_OS_PROCESSED + "/list";
                                find = readData(path);
                                find.then((list) => {
                                    console.log(list);
                                    if (list) {
                                        list.push(result[os]["auth_code"]);
                                    } else {
                                        list = [];
                                        list.push(result[os]["auth_code"]);
                                    }
                                    writeData(path, list)
                                        .then(() => {
                                            let path = PATH_OS_VALIDATED + "/" + result[os]["auth_code"];
                                            deleteData(path);
                                        });
                                });
                            })
                            .catch(error => alert("Erro: " + error));
                    }
                    alert('Processamento realizado!');
                    document.getElementById('div-admin-os-validadas').innerHTML = '';
                } else (alert('Nenhuma OS para ser processada'));
            })
                .catch((error) => console.log(error));
        }
    }
}

export { getOsValidated, getOsNotValidated, exportOsToExcel, processAllOs }