const apiData = {
  url: 'https://api.coincap.io/v2/assets',
};
const ulCoinsList = document.querySelector('#coins-list');
console.log(ulCoinsList);

const createLi = (text) => {
  const li = document.createElement('li');
  li.innerText = text;
  return li;
};

const fetchCoins = async () => {
  try {
    const response = await fetch(apiData.url);
    const data = await response.json();
    data.data.forEach((coin) => {
      const price = parseFloat(coin.priceUsd);
      const liText = `${coin.name} (${coin.symbol}): ${price.toFixed(2)}`;
      ulCoinsList.appendChild(createLi(liText));
    });
  } catch (error) {
    console.log(error);
  }
};

fetchCoins();