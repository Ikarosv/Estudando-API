const apiData = {
  url: 'https://api.coincap.io/v2/assets',
};

const fetchCoins = async () => {
  const response = await fetch(apiData.url);
  const data = await response.json();
  console.log(data.data);
};

fetchCoins();