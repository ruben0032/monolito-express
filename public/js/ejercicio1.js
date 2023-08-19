/* eslint-disable no-plusplus */
const rutBtn = document.querySelector('#rutBtn');
const txtRut = document.querySelector('#rut');
const mapCheck = {
  11: 0,
  10: 'k',
};

const getCheck = (array) => {
  let cont = 2;
  let sum = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    sum += array[i] * cont;
    cont++;
    if (cont === 8) {
      cont = 2;
    }
  }
  const remainder = sum % 11;
  const checkDigit = 11 - remainder;

  return checkDigit;
};

rutBtn.addEventListener('click', (event) => {
  event.preventDefault();
  txtRut.innerText = '';
  const rut = [];
  rut.push(Math.ceil(Math.random() * 9));
  for (let i = 1; i < 8; i++) {
    rut.push(Math.floor(Math.random() * 9));
  }
  const checkDigit = getCheck(rut);
  // eslint-disable-next-line no-unused-expressions
  mapCheck[checkDigit] ? rut.push(mapCheck[checkDigit]) : rut.push(checkDigit);
  txtRut.innerText = `${rut[0]}${rut[1]}.${rut[2]}${rut[3]}${rut[4]}.${rut[5]}${rut[6]}${rut[7]}-${rut[8]}`;
});
