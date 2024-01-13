/*
 * Shopping Cart Requirements:
 * - Before you start, please run `npm run start:api` to start mock API server
 * - data for mock APIs come from ./db/db.json
 * - There are 2 APIs you need to call:
 *     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
 *     - http://localhost:4002/products : this will provide a list of products with full details
 *
 * We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
 * product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
 * inside table#shopping-cart-tbl as below:
 * ID     Item
 * 1001   TV
 * 1002   iPad
 *
 * */
const View = {
  init: async () => {
    const tbodyElem = document
      .getElementById("shopping-cart-tbl")
      .querySelector("tbody");

    //fectching data present in the cart
    const cartResponse = await fetch("http://localhost:4002/cart");
    const cartData = await cartResponse.json();

    //fetching the product details
    const productResponse = await fetch("http://localhost:4002/products");
    const productData = await productResponse.json();

    //Mapping the product id in the cart with product id in the product dB to identify the products picked by customer
    const cartItems = cartData.map((cartItem) => {
      const productId = cartItem.id;
      const productDetail = productData.find(
        (product) => product.id === productId
      );
      return { id: productId, item: productDetail.name };
    });

    //running a loop on the cartitems obatined to create the table
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.id}</td><td>${item.item}</td>`;
      tbodyElem.appendChild(row);
    });
  },
};
document.addEventListener("DOMContentLoaded", View.init);
