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
  this.size = size, // "Small", "Medium", or "Large"
  this.toppings = [] // toppings added to the pizza order
};

Pizza.prototype.addTopping = function (topping) {
  return this.toppings.push(topping);
};

Pizza.prototype.toppingsList = function () {

  return this.toppings.toString().replace(",", ", ");
};

Pizza.prototype.priceFor = {
  Small: 10,
  Medium: 15,
  Large: 20,
  toppings: 1
};

Pizza.prototype.cost = function () {
  return this.priceFor[this.size] + this.priceFor.toppings * this.toppings.length;
};

// Order class
function Order () {
  this.pizzas = [];
};

Order.prototype.addItem = function (pizza) {
  return this.pizzas.push(pizza);
};

Order.prototype.cost = function () {
  return this.pizzas.reduce((total, pizza) => total + pizza.cost(), 0);
};

// -- Test --
// let pizza = new Pizza("Small");
// pizza.addTopping("Pineapple");
// pizza.addTopping("Jalepeños");
// console.log(pizza.cost());
//
// let order = new Order();
// order.addItem(pizza);
// console.log(order.cost());
//
// pizza = new Pizza("Medium");
// pizza.addTopping("Pepperoni");
// console.log(pizza.cost());
//
// order.addItem(pizza);
// console.log(order.cost());

// -- User Interface --
$(function (){
  // Add topping choices
  toppings.forEach( (topping, i) => {
    $("#toppings").append(`
      <div class="form-check">
        <input id="topping${i}" type="checkbox" name="toppings" value="${topping}">
        <label for="topping${i}">${topping}</label>
      </div>
    `);
  });
  // Initialize order
  let order = new Order();

  // Form submit handler
  $("form#pizza").submit(function (event) {
    event.preventDefault();
    // get pizza size input
    let inputSize = $("input:radio[name=size]:checked").val();
    let newPizza = new Pizza(inputSize);
    // get pizza toppings input
    $("input:checkbox[name=toppings]:checked").each(function () {
      newPizza.addTopping($(this).val());
    });
    // add pizza to order
    order.addItem(newPizza);
    // display order and cost
    console.log(htmlForPizza(newPizza));
    $("#order-items").append(htmlForPizza(newPizza));
    $("#cost").text(order.cost());
    console.log(order);
  });
});

function htmlForPizza (pizza) {
  let htmlString = `
    <div class="order-item row">
      <div class="col-sm-8">
        <p class="item-description">${pizza.size} Pizza</p>
        <p class="toppings">Toppings: ${pizza.toppingsList()}</p>
      </div>
      <div class="col-sm-2">
        <p class="item-cost">$${pizza.cost()}</p>
      </div>
    </div>
  `
  return htmlString;
}
