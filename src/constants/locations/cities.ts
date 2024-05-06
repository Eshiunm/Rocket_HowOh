import changhuaDistricts from "./districts/changhuaDistricts";
import chiayiCityDistricts from "./districts/chiayiCityDistricts";
import chiayiCountyDistricts from "./districts/chiayiCountyDistricts";
import hsinchuCityDistricts from "./districts/hsinchuCityDistricts";
import hsinchuCountyDistricts from "./districts/hsinchuCountyDistricts";
import hualienDistricts from "./districts/hualienDistricts";
import kaohsiungDistricts from "./districts/kaohsiungDistricts";
import keelungDistricts from "./districts/keelungDistricts";
import kinmenDistricts from "./districts/kinmenDistricts";
import lienchiangDistricts from "./districts/lienchiangDistricts";
import miaoliDistricts from "./districts/miaoliDistricts";
import nantouDistricts from "./districts/nantouDistricts";
import newTaipeiDistricts from "./districts/newTaipeiDistricts";
import penghuDistricts from "./districts/penghuDistricts";
import pingtungDistricts from "./districts/pingtungDistricts";
import taichungDistricts from "./districts/taichungDistricts";
import tainanDistricts from "./districts/tainanDistricts";
import taipeiDistricts from "./districts/taipeiDistricts";
import taitungDistricts from "./districts/taitungDistricts";
import taoyuanDistricts from "./districts/taoyuanDistricts";
import yilanDistricts from "./districts/yilanDistricts";
import yunlinDistricts from "./districts/yunlinDistricts";

const cities = [
  {
    city: "台北市",
    districts: taipeiDistricts,
  },  {
    city: "新北市",
    districts: newTaipeiDistricts,
  },  {
    city: "基隆市",
    districts: keelungDistricts,
  },  {
    city: "桃園市",
    districts: taoyuanDistricts,
  },  {
    city: "新竹縣",
    districts: hsinchuCountyDistricts,
  },  {
    city: "新竹市",
    districts: hsinchuCityDistricts,
  },  {
    city: "苗栗縣",
    districts: miaoliDistricts,
  },  {
    city: "台中市",
    districts: taichungDistricts,
  },  {
    city: "彰化縣",
    districts: changhuaDistricts,
  },  {
    city: "南投縣",
    districts: nantouDistricts,
  },  {
    city: "雲林縣",
    districts: yunlinDistricts,
  },  {
    city: "嘉義市",
    districts: chiayiCityDistricts,
  },  {
    city: "嘉義縣",
    districts: chiayiCountyDistricts,
  },  {
    city: "台南市",
    districts: tainanDistricts,
  },  {
    city: "高雄市",
    districts: kaohsiungDistricts,
  },  {
    city: "屏東縣",
    districts: pingtungDistricts,
  },  {
    city: "宜蘭縣",
    districts: yilanDistricts,
  },  {
    city: "花蓮縣",
    districts: hualienDistricts,
  },  {
    city: "台東縣",
    districts: taitungDistricts,
  },  {
    city: "澎湖縣",
    districts: penghuDistricts,
  },  {
    city: "金門縣",
    districts: kinmenDistricts,
  },  {
    city: "連江縣",
    districts: lienchiangDistricts,
  }
];

export default cities;