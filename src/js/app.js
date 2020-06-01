//слушатель для таблицы
let table = document.getElementById('table');
table.onclick = function(evt) {
    let target = evt.target;
    if(target.id == 'delet') {
        if(confirm("Удалить:"+" "+target.parentNode.parentNode.id)) {
            delet(target.parentNode.parentNode.id);
            drawTable();
        }
    }
    else if(target.id=='edit') {
        alert('НЕ УСПЕЛ СДЕЛАТЬ =)');
    }
    else return;
}

//удалить
function delet(name) {
    localStorage.removeItem(name);
}

//заполнить таблицу
function drawTable() {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let singleObj = JSON.parse(localStorage.getItem(key));
        let row = document.createElement("TR");
        row.setAttribute('id', key);
        tbody.appendChild(row);
        for(let x in singleObj) {
            let td = document.createElement('TD');
            row.appendChild(td);
            td.innerHTML = singleObj[x];
        }
        let b = document.createElement('BUTTON');
        let b1 = document.createElement('BUTTON');
        let td1 = document.createElement('TD');
        row.appendChild(td1);
        td1.appendChild(b);
        td1.appendChild(b1);
        b.setAttribute('id', 'delet');
        b1.setAttribute('id', 'edit');
        b.innerHTML = 'Удалить';
        b1.innerHTML = 'Редактировать';
    }
}

// загрузить файл
document.getElementById('read').addEventListener('click', read);
function read() {
    localStorage.clear();
    let fileObject = document.getElementById('file');
    let file = fileObject.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        let dataObject = JSON.parse(reader.result);
        for(let key in dataObject) {
            localStorage.setItem(key, JSON.stringify(dataObject[key]));
        }
        alert("Успешно");
        drawTable();
    }
}

// добавить учреждение
document.getElementById('addData').addEventListener('click', addObject);
function addObject(evt) {
    evt.preventDefault();
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    if(fullName&&address&&phone) {
        let data = {
            fullName: fullName,
            address: address,
            phone: phone
        }
        let json = JSON.stringify(data);
        localStorage.setItem(fullName, json);
        alert('Добавлено');
        drawTable();
    }        
}
