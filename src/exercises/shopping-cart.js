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

    const cartResponse = await fetch("http://localhost:4002/cart");
    const cartData = await cartResponse.json();

    const productResponse = await fetch("http://localhost:4002/products");
    const productData = await productResponse.json();

    const cartItems = cartData.map((cartItem) => {
      const productId = cartItem.id;
      const productDetail = productData.find(
        (product) => product.id === productId
      );
      return { id: productId, item: productDetail.name };
    });

    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.id}</td><td>${item.item}</td>`;
      tbodyElem.appendChild(row);
    });
  },
};
document.addEventListener("DOMContentLoaded", View.init);
