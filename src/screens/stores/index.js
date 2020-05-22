
import CounterStore from "./CounterStore";
import colorsStore from "./colorsStore";
import homeStore from "./homeStore";
import bannerStore from "./home/bannerStore";
import catHomeStore from "./home/catHomeStore";
import recoHomeStore from "./home/recoHomeStore";
import searchByBrandsStore from "./home/searchByBrandsStore";
import productsStore from "./home/productsStore";
import cartStore from "./cartStore";
import myOrdersStore from "./profile/myOrdersStore";
import addAddressStore from "./profile/AddAddressStore";
import orderDetailsStore from "./profile/OrderDetailsStore";
import addressListStore from "./profile/addressListStore";


export default {
  counterStore: new CounterStore(),
  colorsStore: new colorsStore(),
  homeStore: new homeStore(),
  bannerStore: new bannerStore(),
  catHomeStore: new catHomeStore(),
  recoHomeStore: new recoHomeStore(),
  searchByBrandsStore: new searchByBrandsStore(),
  productsStore: new productsStore(),
  cartStore: new cartStore(),
  myOrdersStore: new myOrdersStore(),
  addAddressStore: new addAddressStore(),
  orderDetailsStore: new orderDetailsStore(),
  addressListStore: new addressListStore(),
};