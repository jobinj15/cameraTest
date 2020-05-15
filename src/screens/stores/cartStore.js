import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../utility/constants";
// import productStore from "./home/productsStore"

// @inject("productStore")
// @observer
class CartStore {
  // @observable banners = [];

  @action addToCart(index,item) {

    console.log('onAddToCart called!')

    var allCart = [...this.cart];
    allCart.push(item);

    this.caluclateTotal(item,constants.TYPE_PLUS)
    this.cart = allCart

    // console.log('Modified cart: ' + JSON.stringify(this.products[index]))


  }


  @action deleteItem(index) {

    if(!index==undefined)
    return

    console.log('deleteItemCart called!')

    var allCart = [...this.cart];
    this.caluclateTotal(allCart[index],constants.TYPE_DELETE)
    allCart.splice(index,1);
    this.cart = allCart

    // console.log('Modified cart: ' + JSON.stringify(this.products[index]))


  }


  @action minusCart(index,productId) {

    console.log('minusCart called! ' + productId)

    if(index==null)
    index = this.getIndex(productId);

    if(index==null)
    return;

    var allCart = [...this.cart];
    var item = allCart[index];
    
    console.log('minusCart cart cartStore: ' + JSON.stringify(item))

    if (item.count) {
      if(productId==undefined)
      item.count = item.count - 1;
      this.caluclateTotal(item, constants.TYPE_MINUS)
      
      if(item.count==0)
      allCart.splice(index,1)
      this.cart = allCart;
    }
    else{
      allCart.splice(index,1)
      this.cart = allCart;
    }
  }


  @action plusCart(index,productId) {

    console.log('plusCart called! ' + index)

    if(index==null)
    index = this.getIndex(productId);

    if(index==null) 
    return;

    var allCart = [...this.cart];
    var item = allCart[index];
    

    if (item.count) {
      
      if(productId==undefined)
      item.count = item.count + 1;
      
      this.caluclateTotal(item, constants.TYPE_PLUS)
      this.cart = allCart;

      console.log('Plus cart cartStore: ' + JSON.stringify(this.cart))

    }

  }

  caluclateTotal(item, type) {

    if (type == constants.TYPE_PLUS)
      this.total = (item.amount + this.total)
    else if(type == constants.TYPE_DELETE)
      this.total = (this.total - (item.amount*item.count))  
    else this.total = (this.total - item.amount)

  }

  getIndex(productId){
    
    // console.log('getIndex cart' + JSON.stringify(this.cart))

    // for(let item of this.cart){
    //   if(item.productId==productId)
    //   return index;
    // }
    const length = this.cart.length;

    for(var i=0;i<length;i++){
      if(this.cart[i].productId==productId)
      return i;
    }

    return null

  } 



  @observable total = 0
  @observable cart = []
  // @observable cart = [
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     productId:1,
  //     amount: 100
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     productId:2,
  //     amount: 60
  //   },

  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     productId:3,
  //     amount: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     productId:4,
  //     amount: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     productId:5,
  //     amount: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     productId:6,
  //     amount: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     productId:7,
  //     amount: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     productId:8,
  //     amount: 150
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     description: "Loren ipsum item ",
  //     quantity: "5 Kg",
  //     productId:9,
  //     amount: 500
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     description: "Loren ipsum new item 2",
  //     quantity: "2 Kg",
  //     productId:10,
  //     amount: 150
  //   },
  // ];

}

export default  CartStore