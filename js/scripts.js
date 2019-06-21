// ---- Objects and Global Variables ----

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
  return this.toppings.toString().replace(/,/g, ", ");
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

// ---- Tests ----
// let pizza = new Pizza("Small");
// pizza.addTopping("Pineapple");
// pizza.addTopping("Jalepeños");
// pizza.addTopping("Pepperoni");
// console.log(pizza.toppingsList());
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

// ---- User Interface ----
function htmlForPizza (pizza) {
  let htmlString = `
    <div class="order-item row">
      <div class="col-sm-10">
        <p class="item-description">${pizza.size} Pizza</p>
        <p class="toppings">Toppings: ${pizza.toppingsList()}</p>
      </div>
      <div class="col-sm-2">
        <p class="item-cost">$${pizza.cost()}</p>
      </div>
    </div>
    <hr>
  `
  return htmlString;
}

// Document Ready
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
  $("button#add-to-order").click(function () {
    $(this).hide();
    $("form#build-pizza").show();
  });

  // Form submit handler
  $("form#build-pizza").submit(function (event) {
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
    // hide and reset new pizza form
    $("form#build-pizza").hide();
    $("form#build-pizza")[0].reset();
    // display order and cost
    $("#order-items").append(htmlForPizza(newPizza));
    $("#cost").text(order.cost());
    // show add pizza button
    $("button#add-to-order").show();
  });

  // Cancel add pizza to order button
  $("button#cancel").click(function () {
    console.log("cancel clicked");
    // hide and reset new pizza form
    $("form#build-pizza").hide();
    $("form#build-pizza")[0].reset();
    // show add pizza button
    $("button#add-to-order").show();
  });
});
