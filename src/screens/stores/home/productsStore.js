import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import constants from "../../../utility/constants";
import cartStore from "../cartStore"

// @inject("cartStore")
// @observer
class ProductsStore {
  // @observable banners = [];

  @action addToCart(index,productId) {

    console.log('onAddToCart called!')

    if(isNaN(index) && isNaN(productId))
    return

    if(index==null)
    index = this.getIndex(productId);

    if(index==null)
    return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if (!item.count){
      
      item.count = 1;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))

      return item;

    }

  }


  @action minusCart(index,productId) {

    console.log('minusCart called!')

    if(isNaN(index) && isNaN(productId))
    return

    if(index==null)
    index = this.getIndex(productId);

    if(index==null)
    return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    if (item.count){
      if(item.count ==1)
      delete item.count
      else
      item.count = item.count-1;
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      return item;

    }

  }
  
  
  @action plusCart(index,productId) {

    // console.log('plusCart called!')

    if(isNaN(index) && isNaN(productId))
    return

    if(index==null)
    index = this.getIndex(productId);

    if(index==null)
    return;

    var allProducts = [...this.products];
    var item = allProducts[index];

    console.log('Plus cart productStore: ' + JSON.stringify(item))


    if (item.count){
      item.count = item.count + 1;
      // this.caluclateTotal(item,constants.TYPE_PLUS)
      this.products = allProducts;

      console.log('Modified prod: ' + JSON.stringify(this.products[index]))
      return item;
    }

  }

  getIndex(productId){
     
    for(item of this.products){
      if(item.productId==productId)
      return index;
    }

    return null

  } 

  // caluclateTotal(item,type){
     
  //   if(type==constants.TYPE_PLUS)
  //    this.total = (item.amount + this.total)
  //    else this.total = (this.total-item.amount)

  // }


  // @observable total = 0i
  @observable products = [
    {
      image: require("../../../assets/images/pic1.jpg"),
      description: "Loren ipsum item ",
      quantity: "5 Kg",
      productId:1,
      amount: 100
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      description: "Loren ipsum new item 2",
      quantity: "2 Kg",
      productId:2,
      amount: 60
    },

    {
      image: require("../../../assets/images/pic1.jpg"),
      description: "Loren ipsum item ",
      quantity: "5 Kg",
      productId:3,
      amount: 500
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      description: "Loren ipsum new item 2",
      quantity: "2 Kg",
      productId:4,
      amount: 150
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      description: "Loren ipsum item ",
      quantity: "5 Kg",
      productId:5,
      amount: 500
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      description: "Loren ipsum new item 2",
      quantity: "2 Kg",
      productId:6,
      amount: 150
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      description: "Loren ipsum item ",
      quantity: "5 Kg",
      productId:7,
      amount: 500
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      description: "Loren ipsum new item 2",
      quantity: "2 Kg",
      productId:8,
      amount: 150
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      description: "Loren ipsum item ",
      quantity: "5 Kg",
      productId:9,
      amount: 500
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      description: "Loren ipsum new item 2",
      quantity: "2 Kg",
      productId:10,
      amount: 150
    },
  ];

  // @action increment() {
  //   this.count += 1;
  // }

  // @action decrement() {
  //   this.count -= 1;
  // }
}

export default ProductsStore