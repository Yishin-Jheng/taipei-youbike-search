import axios from "axios";

const fetchUbikeJson = async function () {
  try {
    const dataTP = await axios.get("/.netlify/functions/getTaipeiCityUbikeApi");
    const dataNTP = await axios.get(
      "/.netlify/functions/getNewTaipeiCityUbikeApi",
    );

    return [...dataTP.data, ...dataNTP.data];
  } catch (err) {
    // TODO: for ts
    // if (err instanceof Error) throw err;

    throw new Error(String(err));
  }
};

export default fetchUbikeJson;
