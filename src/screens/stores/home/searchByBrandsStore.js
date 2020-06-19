import { observable, action } from "mobx";
import prod_repository from "../../../repos/prod_repository";
import global from "../../../utility/global";

export default class SearchByBrandsStore {
  @observable brands = [];
  // @observable brands = [

  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic1.jpg"),
  //     text: "Loren ipsum"
  //   },
  //   {
  //     image: require("../../../assets/images/pic2.jpg"),
  //     text: "Loren ipsum"
  //   }

  // ];

  @action getBrands() {
    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable){
        this.loading = true ;
        prod_repository.getBrands(this.onBrandsLoaded.bind(this))    
      }
    });

  }

  onBrandsLoaded(isError,responseData){
     this.loading = false; 
     if(!isError){
       this.brands = responseData.data;      
     }
  }

  
}