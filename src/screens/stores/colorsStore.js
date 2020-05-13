import { observable, action, computed } from "mobx";

const colorsItem = ['antiquewhite', 'aqua', 'aquamarine', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
    'cadetblue', 'chartreuse', 'chocolate', 'coral', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow',
    'hotpink', 'indianred', 'indigo'];


export default class ColorsStore {
  @observable color = 'brown';

  @action changeColor() {
    this.color = colorsItem[Math.floor(Math.random() * colorsItem.length)];
  }

  @computed get colorName(){
    return this.color 
  }
  
}