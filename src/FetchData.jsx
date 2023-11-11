import axios from "axios";

const fetchJSON = async function (url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    const error = `${err} 💣💣💣`;
    throw error;
  }
};

export default fetchJSON;
