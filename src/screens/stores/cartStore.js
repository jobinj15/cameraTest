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


  @action minusCart(index,id) {

    console.log('minusCart called! ' + id)

    if(index==null)
    index = this.getIndex(id);

    if(index==null)
    return;

    var allCart = [...this.cart];
    var item = allCart[index];
    
    console.log('minusCart cart cartStore: ' + JSON.stringify(item))

    if (item.count) {
      if(id==undefined)
      item.count = item.count - 1;
      this.caluclateTotal(item, constants.TYPE_MINUS)
      
      if(item.count==0)
      allCart.splice(index,1)
      this.cart = allCart;
    }
    else{
      this.caluclateTotal(item, constants.TYPE_MINUS)
      allCart.splice(index,1)
      this.cart = allCart;
    }
  }


  @action plusCart(index,id) {

    console.log('plusCart called! ' + index)

    if(index==null)
    index = this.getIndex(id);

    if(index==null) 
    return;

    var allCart = [...this.cart];
    var item = allCart[index];
    

    if (item.count) {
      
      if(id==undefined)
      item.count = item.count + 1;
      
      this.caluclateTotal(item, constants.TYPE_PLUS)
      this.cart = allCart;

      console.log('Plus cart cartStore: ' + JSON.stringify(this.cart))

    }

  }

  caluclateTotal(item, type) {

    if(isNaN(item.price))
    return;

    const price = parseInt(item.price)

    if (type == constants.TYPE_PLUS)
      this.total = (price + this.total)
    else if(type == constants.TYPE_DELETE)
      this.total = (this.total - (price*item.count))  
    else this.total = (this.total - price)

  }

  getIndex(id){
    
    // console.log('getIndex cart' + JSON.stringify(this.cart))

    // for(let item of this.cart){
    //   if(item.id==id)
    //   return index;
    // }
    const length = this.cart.length;

    for(var i=0;i<length;i++){
      if(this.cart[i].id==id)
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

export default  CartStore