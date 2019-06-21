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
$(document).ready(function (){
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

  // Install add pizza to order button handler
  $("button#add-to-order").click(function () {
    $(this).hide();
    $("form#build-pizza").show();
  });

  // Install build pizza form submit handler
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
    let pizzaDescription = newPizza.size;
    let toppingsAdded = newPizza.toppings.length != 0;
    if (toppingsAdded) {
      pizzaDescription += " Pizza";
    } else {
      pizzaDescription += " Cheese Pizza";
    }
    let htmlString = `
      <div class="order-item row">
        <div class="col-sm-10">
          <p class="item-description"><strong>${pizzaDescription}</strong></p>
    `;
    if (toppingsAdded) {
      htmlString += `<p class="toppings"> Toppings: ${newPizza.toppingsList()}</p>`
    }
    htmlString += `
        </div>
        <div class="col-sm-2">
          <p class="item-cost">$${newPizza.cost()}</p>
        </div>
      </div>
      <hr>
    `;
    $("#order-items").append(htmlString);
    $("#cost").text(order.cost());
    // show add pizza button
    $("button#add-to-order").show();
    $("button#submit-order").show();
  });

  // Install cancel add pizza to order button handler
  $("button#cancel").click(function () {
    console.log("cancel clicked");
    // hide and reset new pizza form
    $("form#build-pizza").hide();
    $("form#build-pizza")[0].reset();
    // show add pizza button
    $("button#add-to-order").show();
  });

  // Install submit order button handler
  $("button#submit-order").click(function () {
    if (order.pizzas.length !== 0) {
      $("#order-confirmation").show();
      $("button#add-to-order").hide();
      $("button#submit-order").hide();
    }
  });
});
