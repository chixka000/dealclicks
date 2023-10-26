const cron = require("node-cron");
const axios = require("axios");

cron.schedule("0 0 * * *", async () => {
  const options = {
    method: "GET",
    url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/v2/amz/amazon-lookup-prices",
    params: {
      page: "1",
      domainCode: "com",
      asin: "B07QFC6LN6"
    },
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
      "X-RapidAPI-Host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});
