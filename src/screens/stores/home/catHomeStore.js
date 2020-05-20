import { observable, action } from "mobx";
import global from "../../../utility/global";
import constants from "../../../utility/constants";
import prod_repository from "../../../repos/prod_repository";

export default class CatHomeStore {
  @observable categories = [];
  @observable loading = false;

  @action getCategories(data) {

    global.isOnline().then(isNetworkAvailable => {
      if (!isNetworkAvailable)
        global.showToast(constants.NO_INTERNET)
      else {
        this.loading = true ;
        prod_repository.getCategories(
          data,
          this.onCategories.bind(this)
        );

      }
    });

  }

  onCategories(isError, responseData) {

    this.loading = false;

    if(!isError){
      var correction = [];
      var categories = responseData.data;
      var length = categories.length;

      if(length%4!=0){
        var itemsToAdd = 4-length%4;
        for(var i=0;i<itemsToAdd;i++)
        correction.push({
          blank : true
        })
      }
    
      this.categories = [...categories,...correction]
      console.log('onCategories ' + JSON.stringify(this.categories))
    }
    else global.showMessage(responseData.message)
  }



  // @observable categories = [

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

  // @action increment() {
  //   this.count += 1;
  // }

  // @action decrement() {
  //   this.count -= 1;
  // }
}