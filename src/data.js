import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";
import bean from "./img/coffeebeens.jpeg";
import maker from "./img/maker.jpeg";
import machine from "./img/machine.jpeg";
import cup from "./img/cup.jpeg";
import machine1 from "./img/coffeemachine.jpeg";

export const data = [
  {
    id: 1,
    img: img1,
  },
  {
    id: 2,
    img: img2,
  },
  {
    id: 3,
    img: img3,
  },
  {
    id: 4,
    img: img4,
  },
];

export const category = [
  {
    id: 1,
    name: "maker",
    price: "20$",
    pic: maker,
    qty: "Not available",
  },
  {
    id: 2,
    name: "beans",
    price: "30$",
    pic: bean,
    qty: "10",
  },
  {
    id: 3,
    name: "cup",
    price: "40$",
    pic: cup,
    qty: "20",
  },
  {
    id: 4,
    name: "machine",
    price: "120$",
    pic: machine,
    qty: "3",
  },
  {
    id: 5,
    name: "machine",
    price: "140$",
    pic: machine1,
    qty: "2",
  },
  {
    id: 6,
    name: "machine",
    price: "180$",
    pic: machine,
    qty: "1",
  },
  {
    id: 7,
    name: "maker",
    price: "120$",
    pic: maker,
    qty: "4",
  },
  {
    id: 8,
    name: "beans",
    price: "120$",
    pic: bean,
    qty: "8",
  },
  {
    id: 9,
    name: "beans",
    price: "70$",
    pic: bean,
    qty: "9",
  },
  {
    id: 10,
    name: "cup",
    price: "70$",
    pic: cup,
    qty: "10",
  },
];

export function filterByCategory(name) {
  return category.filter((cat) => cat.name === name);
}
export let names = [...new Set(category.map((cat) => cat.name))];
