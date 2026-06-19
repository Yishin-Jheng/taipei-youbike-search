import axios from "axios";

interface TaipeiCityUbikeData {
  sno: string;
  sna: string;
  sarea: string;
  mday: string;
  ar: string;
  sareaen: string;
  snaen: string;
  aren: string;
  act: string;
  srcUpdateTime: string;
  updateTime: string;
  infoTime: string;
  infoDate: string;
  Quantity: number;
  available_rent_bikes: number;
  latitude: number;
  longitude: number;
  available_return_bikes: number;
}

interface NewTaipeiCityUbikeData {
  scity: string;
  scityen: string;
  sna: string;
  sarea: string;
  ar: string;
  snaen: string;
  sareaen: string;
  aren: string;
  sno: string;
  tot_quantity: string;
  sbi_quantity: string;
  mday: string;
  lat: string;
  lng: string;
  bemp: string;
  act: string;
  yb2_quantity: string;
  eyb_quantity: string;
}

interface UBikeData {
  id: string;
  dist: string;
  stationName: string;
  availableRentBikes: string;
  availableReturnBikes: string;
}

const formatTaipeiUbikeData = (rawData: TaipeiCityUbikeData[]): UBikeData[] => {
  return rawData.map((site) => ({
    id: site.sno,
    dist: site.sarea,
    stationName: site.sna.split("_")[1],
    availableRentBikes: String(site.available_rent_bikes),
    availableReturnBikes: String(site.available_return_bikes),
  }));
};

const formatNewTaipeiUbikeData = (
  rawData: NewTaipeiCityUbikeData[],
): UBikeData[] => {
  return rawData.map((site) => ({
    id: site.sno,
    dist: site.sarea,
    stationName: site.sna.split("_")[1],
    availableRentBikes: site.sbi_quantity,
    availableReturnBikes: site.bemp,
  }));
};

const fetchUbikeJson = async function (): Promise<UBikeData[]> {
  try {
    const dataTP = await axios.get<TaipeiCityUbikeData[]>(
      "/.netlify/functions/getTaipeiCityUbikeApi",
    );
    const dataNTP = await axios.get<NewTaipeiCityUbikeData[]>(
      "/.netlify/functions/getNewTaipeiCityUbikeApi",
    );

    return [
      ...formatTaipeiUbikeData(dataTP.data),
      ...formatNewTaipeiUbikeData(dataNTP.data),
    ];
  } catch (err) {
    if (err instanceof Error) throw err;

    throw new Error(String(err));
  }
};

export default fetchUbikeJson;
