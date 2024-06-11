document.addEventListener("DOMContentLoaded", () => {
  function loadCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart on load:", cart);

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.innerHTML = item.html;
      const removeButton = cartItem.querySelector(".add-to-cart-btn");
      if (removeButton) {
        removeButton.innerText = "Remove from Cart";
        removeButton.classList.remove("add-to-cart");
        removeButton.classList.add("remove-from-cart");
        removeButton.addEventListener("click", removeFromCart);
      }
      cartItemsContainer.appendChild(cartItem);
    });
  }

  function removeFromCart(event) {
    const button = event.target;
    const productElement = button.closest(".product");
    const productId = productElement.getAttribute("data-id");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(
      "Cart after removing:",
      JSON.parse(localStorage.getItem("cart"))
    );
    location.reload();
  }

  loadCartItems();
});
