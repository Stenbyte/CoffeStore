import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";

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
  },
  {
    id: 2,
    name: "beans",
    price: "30$",
  },
  {
    id: 3,
    name: "cup",
    price: "40$",
  },
  {
    id: 4,
    name: "machine",
    price: "120$",
  },
];

export function filterByCategory(name) {
  return category.filter((cat) => cat.name === name);
}
