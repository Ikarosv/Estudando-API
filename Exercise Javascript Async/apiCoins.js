const ulCoinsList = document.querySelector('#coins-list');
const ulRealList = document.querySelector('#real-list');
const h3RealTitle = document.querySelector('#real-title');
const convertInput = document.getElementById('convert-input');

const apisData = {
  cryptoApi: 'https://api.coincap.io/v2/assets',
  currencyApi: {
    url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/',
    endpoint: 'currencies/usd.min.json',
  },
};
const createLi = (text) => {
  const li = document.createElement('li');
  li.innerText = text;
  return li;
};

const usdValue = async (coin) => {
  try {
    const { currencyApi } = apisData;
    const response = await fetch(currencyApi.url + currencyApi.endpoint);
    let usd = await response.json();
    usd = usd.usd;
    return usd[coin];
  } catch (error) {
    console.log(error);
  }
};

const loadCryptos = (convert = Boolean, cryptos = Array, parent) => {
  parent.innerHTML = '';
  const coinName = convertInput.value ? convertInput.value.toLowerCase() : 'brl';
  h3RealTitle.innerText = 'Valor em ' + coinName.toUpperCase();

  cryptos.forEach(async (coin) => {
    let price;
    if (convert) {
      price = parseFloat(coin.priceUsd) * await usdValue(coinName);
    } else {
      price = parseFloat(coin.priceUsd);
    }

    const liText = `${coin.name} (${coin.symbol}): ${price.toFixed(2)}`;
    parent.appendChild(createLi(liText));
  });
}

let topTen;
const fetchCoins = async () => {
  try {
    const response = await fetch(apisData.cryptoApi);
    let data = await response.json();
    data = data.data;

    topTen = data.slice(0, 10);

    loadCryptos(false, topTen, ulCoinsList);
    loadCryptos(true, topTen, ulRealList);

    return data;
  } catch (error) {
    console.log(error);
  }
};

convertInput.addEventListener('change', () => {loadCryptos(true, topTen, ulRealList)})

fetchCoins();