import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import global from "../../../utility/global";
import constants from "../../../utility/constants";
import prod_repository from "../../../repos/prod_repository";

// @inject("cartStore")
// @observer
class ProductsStore {

  @observable loading = false;
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable products = []
  @observable page = 0

  @action getProducts(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {
        
        this.loading = !this.refreshing && page==0;
        this.page = page;

        prod_repository.getProducts(
          data,
          this.onProducts.bind(this)
        );

      }
    });

  }

  onProducts(isError, responseData) {

    console.log('onRegistered ' + JSON.stringify(responseData))

    if (this.loading)
      this.loading = false;

    if (!isError) {

      if (this.page == 0)
        this.products = responseData.data
      else {
        var allProducts = [...this.products, ...responseData.data];
        this.products = allProducts
      }

    }
    else global.showMessage(responseData.message)

    if (!this.apiLoaded)
      this.apiLoaded = true

    if (this.refreshing)
      this.refreshing = false
  }


  @action addToCart(index, id) {

    console.log('onAddToCart called!')

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if (!item.count) {

      item.count = 1;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))

      return item;

    }

  }


  @action minusCart(index, id) {

    console.log('minusCart called!')

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if (item.count) {
      if (item.count == 1)
        delete item.count
      else
        item.count = item.count - 1;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      return item;

    }

  }


  @action plusCart(index, id) {

    // console.log('plusCart called!')

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    console.log('Plus cart productStore: ' + JSON.stringify(item))


    if (item.count) {
      item.count = item.count + 1;
      // this.caluclateTotal(item,constants.TYPE_PLUS)
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      return item;
    }

  }

  getIndex(id) {

    for (item of this.products) {
      if (item.id == id)
        return index;
    }

    return null

  }

  // caluclateTotal(item,type){

  //   if(type==constants.TYPE_PLUS)
  //    this.total = (item.price + this.total)
  //    else this.total = (this.total-item.price)

  // }


  // @observable products = [
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     id:1,
  //     price: 100
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     id:2,
  //     price: 60
  //   },

  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     id:3,
  //     price: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     id:4,
  //     price: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     id:5,
  //     price: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     id:6,
  //     price: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     id:7,
  //     price: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     id:8,
  //     price: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     id:9,
  //     price: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     id:10,
  //     price: 150
  //   },
  // ];

  // @action increment() {
  //   this.count += 1;
  // }

  // @action decrement() {
  //   this.count -= 1;
  // }
}

export default ProductsStore