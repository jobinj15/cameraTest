import { observable, action } from "mobx";

export default class SearchByBrandsStore {
  // @observable banners = [];
  @observable brands = [

    {
      image: require("../../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    }

  ];

  // @action increment() {
  //   this.count += 1;
  // }

  // @action decrement() {
  //   this.count -= 1;
  // }
}