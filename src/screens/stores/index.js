
import CounterStore from "./CounterStore";
import colorsStore from "./colorsStore";
import homeStore from "./homeStore";


export default {
  counterStore: new CounterStore(),
  colorsStore: new colorsStore(),
  homeStore: new homeStore(),
};