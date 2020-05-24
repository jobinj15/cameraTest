import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import global from "../../../utility/global";
import constants from "../../../utility/constants";
import prod_repository from "../../../repos/prod_repository";

// @inject("cartStore")
// @observer

var index, id;

class ProductsStore {

  @observable loading = false;
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable cartUpdating = false;
  @observable products = []
  @observable page = 0

  constructor(){
    this.onApiActionDone = undefined
  }

  @action getProducts(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.loading = !this.refreshing && page == 0;
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

   
  @action deleteItem(data,index) {
    
    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading(index);

        prod_repository.removeCart(
          data,
          this.afterMinusCart.bind(this),
          index
        );

      }
    });
  }


    // afterCartDelete(isError,responseData,index){

    //   console.log('afterCartDelete : ' + index)
  
    //   var allCart = [...this.cart];
    //   var item = allCart[index];
  
  
    //   if(isError){
    //     item.loading = false;
    //     this.cart = allCart;
    //     return;
    //   }
  
    //   console.log('afterCartDelete index ' + index + ' ' + JSON.stringify(allCart[index]))
  
    //   this.calculateTotal(allCart[index],constants.TYPE_DELETE)
    //   allCart.splice(index,1);
    //   this.cart = allCart
    // }
  


  @action addToCart(data, index, id) {

//     user_id:1
// catalogue_id:2
// quantity:1

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading(index);

        prod_repository.addToCart(
          data,
          this.onAddToCart.bind(this),
          index, id
        );

      }
    });

  }






  onAddToCart(isError, responseData, index, id) {

    // console.log('onAddToCart ' + JSON.stringify(responseData))

    this.cartUpdating = false;

    if (!isError) {
    }
    else global.showMessage(responseData.message)

    this.afterCartAdd(index, id,isError,responseData.cart_id)

  }


  setItemLoading(index) {

    var allProducts = [...this.products];
    var item = allProducts[index];
    item.loading = true;
    console.log('setItemLoading: ' + JSON.stringify(item))

    this.products = allProducts

  }

  afterCartAdd(index, id , isError,cart_id) {

    console.log('onAddToCart called!')

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if(isError){
      item.loading = false;
      this.products = allProducts
      return;
    }

    if (!item.cart_quantity) {
      item.cart_quantity = 1;
      item.cart_id = cart_id;
      item.loading = false;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))

      this.onApiActionDone( item , constants.TYPE_ADDCART);

    }

  }




  afterMinusCart(index, id,isError) {

    console.log('minusCart called!')

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if(isError){
      item.loading = false;
      this.products = allProducts
      return;
    }

    if (item.cart_quantity) {
      
      if (item.cart_quantity == 1)
        item.cart_quantity = 0

      else
        item.cart_quantity = item.cart_quantity - 1;
    
        item.loading = false;
        this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      this.onApiActionDone( item , constants.TYPE_MINUS);

    }

  }

  @action onApiActionDone(method){
    this.onApiActionDone =method
  }


  


  @action updateCart(data,index, id, type) {

    // console.log('plusCart called!')

  //     user_id:1
  // catalogue_id:2
  // quantity:1
  // cart_id:3

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading(index);

        prod_repository.updateCart(
          data,
          this.onUpdateCart.bind(this),
          index, id, type
        );

      }
    });

  }



  onUpdateCart(isError, responseData, index, id, type) {

    // console.log('onAddToCart ' + JSON.stringify(responseData))

    this.cartUpdating = false;

    if (!isError) {
      
    }
    else global.showMessage(responseData.message)

    if (type == constants.TYPE_PLUS)
        this.afterPlusCart(index, id,isError)
      else this.afterMinusCart(index, id,isError)
  }


  afterPlusCart(index, id,isError) {

    if (isNaN(index) && isNaN(id))
      return

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    console.log('Plus cart productStore: ' + JSON.stringify(item))

    if(isError){
      item.loading = false;
      this.products = allProducts
      return;
    }

    if (item.cart_quantity) {
      item.cart_quantity = item.cart_quantity + 1;
      item.loading = false;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      this.onApiActionDone( item , constants.TYPE_PLUS);
    }

  }

  getIndex(id) {

    for (item of this.products) {
      if (item.id == id)
        return index;
    }

    return null

  }

  
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
  //   this.cart_quantity += 1;
  // }

  // @action decrement() {
  //   this.cart_quantity -= 1;
  // }
}

export default ProductsStore