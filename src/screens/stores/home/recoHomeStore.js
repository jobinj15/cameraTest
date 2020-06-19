import { observable, action } from "mobx";

export default class RecoHomeStore {
  // @observable recomm = [];


  @observable recomm = [
    {
      "product_id": 5, "name": "Apple",
      "description": "An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.",
      "regular_price": 180, "status": "Active", "id": 13, "quantity": 200, "price": 100, "attribute": "{\"1\":\"2\"}", "insert_at": "2020-05-18 03:52:49", "udpate_at": null, "cart_id": 0, "cart_quantity": 0,
      "variants": [{ "value_id": 8, "name": "Weight", "value": "1Kg" }],
      "images": [{ "images": "http://www.appoctet.com/ecommerce/assets/catlogue/apple-red-delicious-regular.jpg" }]
    }, {
      "product_id": 3, "name": "Onion", "description": "Special Onions", "regular_price": 28, "status": "Active", "id": 47, "quantity": 401, "price": 1001, "attribute": "{\"1\":\"2\",\"3\":\"4\"}",
      "insert_at": "2020-05-23 03:04:44", "udpate_at": null, "cart_id": 0, "cart_quantity": 0,
      "variants": [{ "value_id": 66, "name": "Weight", "value": "1Kg" }, { "value_id": 67, "name": "Size", "value": "M" }],
      "images": []
    }, {
      "product_id": 4, "name": "Potatoes", "description": "potatoes", "regular_price": 20,
      "status": "Active", "id": 12, "quantity": 0, "price": 30, "attribute": "{\"1\":\"2\"}",
      "insert_at": "2020-05-18 03:32:26", "udpate_at": null, "cart_id": 0, "cart_quantity": 0,
      "variants": [{ "value_id": 7, "name": "Weight", "value": "1Kg" }],
      "images": [{ "images": "http://www.appoctet.com/ecommerce/assets/catlogue/potatos.jpeg" }]
    },
    {
      "product_id": 6, "name": "Banana", "description": "It is loaded with essential vitamins and minerals such as potassium, calcium, manganese, magnesium, iron, folate, niacin, riboflavin, and B6.", "regular_price": 40, "status": "Active",
      "id": 14, "quantity": 130, "price": 40, "attribute": "{\"1\":\"1\"}", "insert_at": "2020-05-18 03:53:52",
      "udpate_at": null, "cart_id": 0, "cart_quantity": 0, "variants": [{
        "value_id": 9, "name": "Weight",
        "value": "500g"
      }], "images": [{ "images": "http://www.appoctet.com/ecommerce/assets/catlogue/banana-yelakki.jpg" }]
    }, {
      "product_id": 7, "name": "Capsicum", "description": "Capsicum, the pepper, is a genus of flowering plants in the nightshade family Solanaceae.",
      "regular_price": 50, "status": "Active", "id": 15, "quantity": 90, "price": 50, "attribute": "{\"1\":\"2\"}", "insert_at": "2020-05-18 03:55:19", "udpate_at": null, "cart_id": 0, "cart_quantity": 0,
      "variants": [{ "value_id": 10, "name": "Weight", "value": "1Kg" }], "images": [{ "images": "http://www.appoctet.com/ecommerce/assets/catlogue/capsicum-green.jpg" }]
    }
  ];

  @action getRecomms(){
    
  }
}