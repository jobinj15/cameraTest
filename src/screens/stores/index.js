
import CounterStore from "./CounterStore";
import colorsStore from "./colorsStore";
import homeStore from "./homeStore";
import bannerStore from "./home/bannerStore";
import catHomeStore from "./home/catHomeStore";
import recoHomeStore from "./home/recoHomeStore";
import searchByBrandsStore from "./home/searchByBrandsStore";
import productsStore from "./products/productsStore";
import cartStore from "./order/cartStore";
import myOrdersStore from "./profile/myOrdersStore";
import addAddressStore from "./profile/AddAddressStore";
import orderDetailsStore from "./order/OrderDetailsStore";
import productDetailsStore from "./products/ProductDetailsStore";
import addressListStore from "./profile/addressListStore";
import selectAddressStore from "./order/SelectAddressStore";
import paymentsStore from "./order/PaymentsStore";
import themeStore from "./ThemeStore";


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
  selectAddressStore: new selectAddressStore(),
  paymentsStore: new paymentsStore(),
  productDetailsStore: new productDetailsStore(),
};