const ulCoinsList = document.querySelector('#coins-list');
const apisData = {
  cryptoApi: 'https://api.coincap.io/v2/assets',
  currencyApi: {
    url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/',
    endpoint: 'currencies/brl.min.json',
  },
};
const createLi = (text) => {
  const li = document.createElement('li');
  li.innerText = text;
  return li;
};

const fetchCoins = async () => {
  try {
    const response = await fetch(apisData.cryptoApi);
    let data = await response.json();
    data = data.data;
    const topTen = data.slice(0, 10);
    topTen.forEach((coin) => {
      const price = parseFloat(coin.priceUsd);
      const liText = `${coin.name} (${coin.symbol}): ${price.toFixed(2)}`;
      ulCoinsList.appendChild(createLi(liText));
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

fetchCoins();