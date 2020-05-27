import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import global from "../../../utility/global";
import prod_repository from "../../../repos/prod_repository";
import user_repository from "../../../repos/user_repository";
// import productStore from "./home/productsStore"

// @inject("productStore")
// @observer
class CartStore {
  // @observable banners = [];

  @action addToCart(index, item) {

    console.log('onAddToCart called!' + JSON.stringify(item.cart_id))

    var allCart = [...this.cart];

    let newItem = {...item}
    newItem.catalogue_id = item.id;
    newItem.id = item.cart_id;

    console.log('onAddToCart afterModify: ' + JSON.stringify(newItem.id))

    allCart.push(newItem);

    this.calculateTotal(newItem, constants.TYPE_PLUS)
    this.cart = allCart

    console.log('onAddToCart afterModify All: ' + JSON.stringify(this.cart))

    
  }



  @action afterAddCart(index, item) {

    console.log('onAddToCart called!' + JSON.stringify(item.cart_id))

    var allCart = [...this.cart];

    let newItem = {...item}
    newItem.catalogue_id = item.id;
    newItem.id = item.cart_id;

    console.log('onAddToCart afterModify: ' + JSON.stringify(newItem.id))

    allCart.push(newItem);

    this.calculateTotal(newItem, constants.TYPE_PLUS)
    this.cart = allCart

  }


  @action deleteItem(data, index) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.cartUpdating = true;
        this.setItemLoading(index);

        prod_repository.removeCart(
          data,
          this.afterCartDelete.bind(this),
          index
        );

      }
    });


  }


  @action updateCart(data, index, id, type) {

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
      this.afterPlusCart(index, id, isError)
    else this.afterMinusCart(index, id, isError)
  }



  setItemLoading(index) {

    var allCart = [...this.cart];
    var item = allCart[index];

    console.log('setItemLoading: ' + JSON.stringify(item))

    item.loading = true;

    this.cart = allCart

  }

  @action afterCartDelete(index, responseData, isError,skip) {

    console.log('afterCartDelete : ' + index)

    this.cartUpdating = false;

    var allCart = [...this.cart];
    var item = allCart[index];

    if (isError) {
      item.loading = false;
      this.cart = allCart;
      return;
    }

    console.log('afterCartDelete index ' + index + ' ' + JSON.stringify(allCart[index]))

    this.calculateTotal(allCart[index], constants.TYPE_DELETE)
    allCart.splice(index, 1);
    this.cart = allCart

    if (this.onApiActionDone && !skip)
    this.onApiActionDone(item,constants.TYPE_DELETE)

  }


  @action minusCart(index, id) {

    console.log('minusCart called! ' + id)

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allCart = [...this.cart];
    var item = allCart[index];

    console.log('minusCart cart cartStore: ' + JSON.stringify(item))

    if (item.cart_quantity) {

      if (id == undefined)
        item.cart_quantity = item.cart_quantity - 1;
      this.calculateTotal(item, constants.TYPE_MINUS)

      if (item.cart_quantity == 0)
        allCart.splice(index, 1)
      this.cart = allCart;
    }
    else {
      this.calculateTotal(item, constants.TYPE_MINUS)
      allCart.splice(index, 1)
      this.cart = allCart;
    }
  }



  @action afterMinusCart(index, id, isError,skip) {

    console.log('afterMinusCart called! ' + id)

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allCart = [...this.cart];
    var item = allCart[index];

    if (isError) {
      item.loading = false;
      this.cart = allCart
      return;
    }

    console.log('minusCart cart cartStore: ' + JSON.stringify(item))

    if (item.cart_quantity) {
      // if(id==undefined)
      item.cart_quantity = item.cart_quantity - 1;
      this.calculateTotal(item, constants.TYPE_MINUS)
      item.loading = false;

      if (item.cart_quantity == 0)
        allCart.splice(index, 1)

      this.cart = allCart;
    }
    else {
      this.calculateTotal(item, constants.TYPE_MINUS)
      allCart.splice(index, 1)
      this.cart = allCart;
    }

    if (this.onApiActionDone && !skip)
    this.onApiActionDone(item,constants.TYPE_MINUS)

  }





  @action getCart(data, page) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {

        this.loading = !this.refreshing && page == 0;
        this.page = page;

        prod_repository.getCart(
          data,
          this.onCartLoaded.bind(this)
        );

      }
    });

  }

  onCartLoaded(isError, responseData) {

    console.log('onCartLoaded ' + JSON.stringify(responseData))

    if (this.loading)
      this.loading = false;

    if (!isError) {

      // if(responseData.total_amount)
      this.total = responseData.total_amount

      // if(responseData.total_items)
      this.noOfItems = responseData.total_items


      if (this.page == 0)
        this.cart = responseData.data
      else {
        var allCart = [...this.cart, ...responseData.data];
        this.cart = allCart
      }
    }
    else global.showMessage(responseData.message)

    if (!this.apiLoaded)
      this.apiLoaded = true

    if (this.refreshing)
      this.refreshing = false
  }


  @action getCartCount(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {

        // this.loading = true;

        user_repository.getCartCount(
          data,
          this.onCartCount.bind(this)
        );

      }
    });

  }


  onCartCount(isError, responseData) {

    console.log('onCartCount: ' + JSON.stringify(responseData))

    // this.loading = false;

    if (!isError) {
      this.noOfItems = responseData.total_items
    }
    else global.showMessage(responseData.message)

  }


  onPaymentList(isError, responseData) {

    console.log('onPaymentList: ' + JSON.stringify(responseData))

    this.loading = false;

    if (!isError) {
      this.paymentList = responseData.data
    }
    else global.showMessage(responseData.message)

  }



  @action plusCart(index, id) {

    console.log('plusCart called! ' + index)

    if (index == null)
      index = this.getIndex(id);

    if (index == null)
      return;

    var allCart = [...this.cart];
    var item = allCart[index];


    if (item.cart_quantity) {

      if (id == undefined)
        item.cart_quantity = item.cart_quantity + 1;

      this.calculateTotal(item, constants.TYPE_PLUS)
      this.cart = allCart;

      console.log('Plus cart cartStore: ' + JSON.stringify(this.cart))

    }




  }

  @action afterPlusCart(index, id, isError,skip) {

    console.log('afterPlusCart called! ' + id)

    if (index == null)
      index = this.getIndex(id);

    console.log('afterPlusCart called index! ' + index)


    if (index == null)
      return;

    var allCart = [...this.cart];
    var item = allCart[index];

    if (isError) {
      item.loading = false;
      this.cart = allCart
      return;
    }

    item.cart_quantity = item.cart_quantity + 1;
    item.loading = false;

    this.calculateTotal(item, constants.TYPE_PLUS)
    this.cart = allCart;

    console.log('Plus cart cartStore: ' + JSON.stringify(this.cart))

    if (this.onApiActionDone && !skip)
    this.onApiActionDone(item,constants.TYPE_PLUS)

    // if (item.cart_quantity) {


    // }
  }


  calculateTotal(item, type) {

    if (isNaN(item.price))
      return;

    const price = parseInt(item.price)

    if (type == constants.TYPE_PLUS) {
      this.total = (price + this.total)
      this.noOfItems++
    }
    else if (type == constants.TYPE_DELETE) {
      this.total = (this.total - (price * item.cart_quantity))
      this.noOfItems = this.noOfItems - item.cart_quantity
    }
    else {
      this.total = (this.total - price)
      this.noOfItems--
    }

  }

  getIndex(id) {


    // for(let item of this.cart){
    //   if(item.id==id)
    //   return index;
    // }
    const length = this.cart.length;

    for (var i = 0; i < length; i++) {

          console.log('getIndex cart' + JSON.stringify(this.cart[i]))

      if (this.cart[i].id == id)
        return i;
    }

    return null

  }


  @observable loading = false;
  @observable refreshing = false;
  @observable apiLoaded = false;
  @observable cartUpdating = false;
  @observable onApiActionDone = undefined;
  @observable total = 0
  @observable noOfItems = 0
  @observable cart = []
  // @observable cart = [
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

}

export default CartStore