/* eslint-disable no-plusplus */
const sortBtn = document.querySelector('#sortBtn');
const divP = document.querySelector('#divText');
const DATOS_ENTRADA = ['Yungay',
  'Calbuco',
  'Taltal',
  'Iquique',
  'Los Vilos',
  'Algarrobo',
  'Iquique',
  'Yungay',
  'Calbuco',
  'Palena',
  'Yungay'];

const restructureData = (array) => {
  const data = [...array];
  const provisionalObject = {};
  for (let i = 1; i < data.length; i++) {
    let j = i;
    while (j > 0 && data[j - 1] < data[j]) {
      const provisional = data[j];
      data[j] = data[j - 1];
      data[j - 1] = provisional;
      j--;
    }
  }
  data.forEach((element) => {
    // eslint-disable-next-line no-unused-expressions
    provisionalObject[element] === undefined
      ? provisionalObject[element] = { comuna: element, cantidad: 1 }
      : provisionalObject[element].cantidad++;
  });

  return Object.entries(provisionalObject).map((element) => element[1]);
};

sortBtn.addEventListener('click', () => {
  const data = restructureData(DATOS_ENTRADA);
  console.log(data);
  data.forEach((element) => {
    const newP = document.createElement('p');
    newP.innerText = `{ comuna: ${element.comuna}, cantidad: ${element.cantidad} }`;
    divP.appendChild(newP);
  });
});
