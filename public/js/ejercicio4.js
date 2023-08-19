/* eslint-disable no-plusplus */
const formCreate = document.querySelector('#formArray');
const formSeach = document.querySelector('#formSeach');
const table = document.querySelector('#arrayTable');
const seachTable = document.querySelector('#seachedArrays');
const divBtns = document.querySelector('#arrayBtns');
const lastBtn = document.querySelector('#latest');
let list = [];

const postArray = async (firstArray, lastArray, column) => {
  const response = await fetch(
    '/api/array',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstArray,
        lastArray,
        column,
      }),
    },
  );
  return response.json();
};

const getArrays = async () => {
  const response = await fetch(
    '/api/array',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.json();
};

const getArray = async (id) => {
  const response = await fetch(
    '/api/array/byId',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', id },
    },
  );
  return response.json();
};

const gatRandom = (cant) => {
  list = [];
  for (let index = 0; index < cant; index++) {
    list.push(Math.ceil(Math.random() * 1000));
  }
  return list;
};

const sortArray = (array) => {
  const sortlist = [...array];
  for (let i = 1; i < sortlist.length; i++) {
    let j = i;
    while (j > 0 && sortlist[j - 1] > sortlist[j]) {
      const temporal = sortlist[j];
      sortlist[j] = sortlist[j - 1];
      sortlist[j - 1] = temporal;
      j--;
    }
  }
  return sortlist;
};

const finalMatriz = (array) => {
  const finalArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    finalArray.push(array[i]);
  }
  return finalArray;
};

const renderTable = (col, array) => {
  table.innerHTML = '';
  let cont = 0;
  let newTr;
  for (let i = 0; i < array.length; i++) {
    if (cont === 0) {
      newTr = document.createElement('tr');
    }
    const newTd = document.createElement('td');
    newTd.innerText = `${array[i]}`;
    cont++;
    newTr.appendChild(newTd);
    if (cont === col) {
      cont = 0;
      table.appendChild(newTr);
    }
  }
};

const renderDivArray = (array, col, id) => {
  const newDiv = document.createElement('div');
  const newP = document.createElement('p');
  const newTable = document.createElement('table');
  newDiv.setAttribute('class', 'flex flex-col bg-secondary-200 p-6 rounded-md text-center');
  newP.innerText = `id: ${id}`;
  newP.setAttribute('class', 'py-2 font-bold');
  newTable.setAttribute('class', 'border-separate border-spacing-1');
  let cont = 0;
  let newRow;
  for (let i = 0; i < array.length; i++) {
    if (cont === 0) {
      newRow = document.createElement('tr');
    }
    const newTd = document.createElement('td');
    newTd.innerText = `${array[i]}`;
    cont++;
    newRow.appendChild(newTd);
    if (cont === col) {
      cont = 0;
      newTable.appendChild(newRow);
      newDiv.appendChild(newP);
      newDiv.appendChild(newTable);
      seachTable.appendChild(newDiv);
    }
  }
};

const renderBtn = (id, msg, col) => {
  divBtns.innerHTML = '';
  const btn = document.createElement('button');
  btn.setAttribute('id', `${id}`);
  btn.setAttribute('class', 'bg-primary-200 px-2 rounded-md text-white hover:bg-primary-100');
  btn.innerText = `${msg}`;
  divBtns.appendChild(btn);
  document.querySelector(`#${id}`).addEventListener('click', async (event) => {
    event.preventDefault();
    const sortedList = sortArray([...list]);
    if (event.target.id === 'sort') {
      renderTable(col, sortedList);
      renderBtn('final', 'Transformar y Guardar', col);
    } else {
      const finalList = finalMatriz([...sortedList]);
      renderTable(col, finalList);
      const response = await postArray(list, finalList, col);
      if (response.error) {
        alert(response.message);
      } else {
        alert(response.body.message);
        table.innerHTML = '';
        divBtns.innerHTML = '';
      }
    }
  });
};

formCreate.addEventListener('submit', (event) => {
  event.preventDefault();
  const dataForm = Object.fromEntries(new FormData(event.target));
  dataForm.fila = Number(dataForm.fila);
  dataForm.columna = Number(dataForm.columna);
  const cant = dataForm.fila * dataForm.columna;
  gatRandom(cant);
  renderTable(dataForm.columna, list);
  renderBtn('sort', 'Ordenar', dataForm.columna);
});

lastBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const { body } = await getArrays();
  seachTable.innerHTML = '';
  body.forEach((element) => {
    renderDivArray(element.firstArray, element.column, element.id);
    renderDivArray(element.lastArray, element.column, element.id);
  });
});

formSeach.addEventListener('submit', async (event) => {
  event.preventDefault();
  const dataForm = Object.fromEntries(new FormData(event.target));
  dataForm.id = Number(dataForm.id);
  const { body, error } = await getArray(dataForm.id);
  seachTable.innerHTML = '';
  if (error) {
    alert('No se encontro el ID');
  } else {
    renderDivArray(body.firstArray, body.column, body.id);
    renderDivArray(body.lastArray, body.column, body.id);
  }
});
