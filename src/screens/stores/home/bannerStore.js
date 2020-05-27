import { observable, action } from "mobx";
import prod_repository from "../../../repos/prod_repository";
import global from "../../../utility/global";

export default class BannerStore {

  @observable banners = [];
  @observable loading =false;

  @action getBanners(userId) {

    global.isOnline().then(isNetworkAvailable => {
      if (isNetworkAvailable) {
        this.loading = true;
        prod_repository.getBanners(
          userId,
          this.onBanners.bind(this)
        );

      }
    });

  }

  onBanners(isError, responseData) {
    this.loading = false;

    if (!isError) {
      this.banners = responseData.banners
    }
    else global.showMessage(responseData.message)
  }


  // @observable banners = [

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