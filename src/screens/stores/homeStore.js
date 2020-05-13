import { observable, action } from "mobx";

export default class HomeStore {
  // @observable banners = [];
  @observable banners = [

    {
      image: require("../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic2.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic1.jpg"),
      text: "Loren ipsum"
    },
    {
      image: require("../../assets/images/pic2.jpg"),
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