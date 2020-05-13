
import CounterStore from "./CounterStore";
import colorsStore from "./colorsStore";
import homeStore from "./homeStore";
import bannerStore from "./home/bannerStore";
import catHomeStore from "./home/catHomeStore";
import recoHomeStore from "./home/recoHomeStore";

export default {
  counterStore: new CounterStore(),
  colorsStore: new colorsStore(),
  homeStore: new homeStore(),
  bannerStore: new bannerStore(),
  catHomeStore: new catHomeStore(),
  recoHomeStore: new recoHomeStore(),
};