// -- Objects and Variables --

// list of toppings available
let toppings = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Extra cheese",
  "Black olives",
  "Green peppers",
  "Pineapple",
  "Spinach",
  "Jalepeños"
];

// Pizza class
function Pizza (size) {
  this.size = size, // "small", "medium", or "large"
  this.toppings = [] // toppings added to the pizza order
};

Pizza.prototype.addTopping = function (topping) {
  return this.toppings.push(topping);
};

Pizza.prototype.priceFor = {
  small: 10,
  medium: 15,
  large: 20,
  toppings: 1
};

Pizza.prototype.cost = function () {
  return this.priceFor[this.size] + this.priceFor.toppings * this.toppings.length;
};

// Order class
function Order () {
  this.pizzas = [];
};

Order.prototype.add = function (pizza) {
  return this.pizzas.push(pizza);
};

Order.prototype.cost = function () {
  return this.pizzas.reduce((total, pizza) => total + pizza.cost(), 0);
};

// -- Test --
// let pizza = new Pizza("small");
// pizza.addTopping("Pineapple");
// pizza.addTopping("Jalepeños");
// console.log(pizza.cost());
//
// let order = new Order();
// order.add(pizza);
// console.log(order.cost());
//
// pizza = new Pizza("medium");
// pizza.addTopping("Pepperoni");
// console.log(pizza.cost());
//
// order.add(pizza);
// console.log(order.cost());

// -- User Interface --
$(function (){
  $("form#pizza").submit(function (event) {
    event.preventDefault();

    let inputSize = $("input:radio[name=size]:checked").val();
    let pizza = new Pizza(inputSize);
    console.log(pizza);

  });
});
