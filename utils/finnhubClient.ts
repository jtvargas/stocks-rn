const finnhub = require("finnhub");
const { ENV } = require("./environment")
const api_key = finnhub.ApiClient.instance.authentications['api_key'];

api_key.apiKey = ENV.FINNHUB_API_KEY; // API key no need to be stored in plain file, we need to use a env, but for demo purpose I'm going to keep it simple here, this key is going to be invalidated after demo submission.

export const finnhubClient = new finnhub.DefaultApi();
