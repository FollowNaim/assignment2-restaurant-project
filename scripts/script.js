console.log("start");
const productContainer = document.querySelector(".products");
const seeMoreProducts = document.querySelector("#see-products");
const btnText = document.querySelector(".btn-text");
const ErrorTxt = document.querySelector(".error-text");
const subscribeBtn = document.querySelector("#subscribe");
const inputMail = document.querySelector("#inputMail");
const products = [
  {
    image: "assets/product-7.jpg",
    title: "Premium Tea",
  },
  {
    image: "assets/product-8.jpg",
    title: "Egg Cookie",
  },
  {
    image: "assets/product-9.jpg",
    title: "Delicious Noodles",
  },
  {
    image: "assets/product-10.jpg",
    title: "Pasta",
  },
  {
    image: "assets/product-11.jpg",
    title: "Best Dinner",
  },
  {
    image: "assets/product-12.jpg",
    title: "Cold Coffee",
  },
];
let productsAppended = false;
let appendedProducts = [];
let uniqueIndex = 6;

// Product Add To Cart

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest(".product");
      const productId = productElement.getAttribute("data-id");
      const productHtml = productElement.outerHTML;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex === -1) {
        cart.push({ id: productId, html: productHtml });
      } else {
        console.log(`Product with id ${productId} already in cart`);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      event.target.disabled = true;
      event.target.innerText = "Added to Cart";
      event.target.style.backgroundColor = "black";
      console.log(
        "Cart after adding:",
        JSON.parse(localStorage.getItem("cart"))
      );
    });
  });
});

// navigation bar scripts

const navIcon = document.querySelector(".mobile-nav-icon");
const navItems = document.querySelector(".mobile-nav-items");
let track = false;
navIcon.addEventListener("click", () => {
  track = !track;
  if (track) {
    navItems.style.marginTop = "50px";
    if (navIcon.classList.contains("fa-bars")) {
      navIcon.classList.replace("fa-bars", "fa-xmark");
    }
  } else {
    navItems.style.marginTop = "-530px";
    if (navIcon.classList.contains("fa-xmark")) {
      navIcon.classList.replace("fa-xmark", "fa-bars");
    }
  }
});

// more products script

seeMoreProducts.addEventListener("click", (e) => {
  productContainerTracker = true;
  if (!productsAppended) {
    for (const product of products) {
      uniqueIndex++;
      console.log(product.title);
      const singleProduct = document.createElement("div");
      singleProduct.classList.add("product");
      singleProduct.setAttribute("data-id", uniqueIndex);
      singleProduct.innerHTML += `
                      <img src="${product.image}" alt="" />
                      <div class="heading">
                        <div class="head">
                          <h2>
                            <h2>${product.title}</h2>
                          </h2>
                        </div>
                        <div class="ratings">
                          <i class="fa-solid fa-star"></i>
                          <p>4.9</p>
                        </div>
                      </div>
                      <div class="btn-price">
                        <div class="btn">
                          <button class="">Add To Cart</button>
                        </div>
                        <div class="price">
                          <p>$15.00</p>
                        </div>
                      </div>
            `;
      productContainer.appendChild(singleProduct);
      appendedProducts.push(singleProduct);
      console.log(appendedProducts);
      btnText.textContent = "See Less Products";
      productsAppended = true;
    }
  } else {
    btnText.textContent = "See More Products";
    for (const product of appendedProducts) {
      productContainer.removeChild(product);
      productsAppended = false;
      appendedProducts = [];
      console.log(appendedProducts);
    }
  }
});

// Subscribe btn error handling

subscribeBtn.addEventListener("click", () => {
  if (inputMail.value === "") {
    ErrorTxt.classList.remove("success");
    ErrorTxt.textContent = "Sorry ! You have to enter your email address";
  } else {
    ErrorTxt.classList.add("success");
    ErrorTxt.textContent = "Subscribed Successfully !";
    inputMail.value = "";
  }
});

// Testimonials script

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      name: "John Smith",
      position: "Marketing Head",
      image: "assets/man.png",
      testimonial:
        "Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Willians Jhone",
      position: "CEO & Co-Founder",
      image: "assets/man2.jpg",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet nisl tincidunt adipiscing dictumst blandit hac. Lectus cras velit sed dignissim ac, aliquet. Metus egestas habitant feugiat neque ultrices nunc, dolor egestas mus.",
    },
    {
      name: "Jane Doe",
      position: "CTO",
      image: "assets/man3.jpg",
      testimonial:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur.",
    },
  ];

  let currentTestimonialIndex = 0;

  const nameElement = document.querySelector(".testimonial .name");
  const positionElement = document.querySelector(".testimonial .position");
  const imageElement = document.querySelector(".testimonial .image img");
  const testimonialTextElement = document.querySelector(
    ".testimonial .what-say p"
  );
  const testimonialElement = document.querySelector(".testimonial");

  function showTestimonial(index) {
    testimonialElement.classList.add("fade-out");
    setTimeout(() => {
      const testimonial = testimonials[index];
      nameElement.textContent = testimonial.name;
      positionElement.textContent = testimonial.position;
      imageElement.src = testimonial.image;
      testimonialTextElement.textContent = testimonial.testimonial;

      testimonialElement.classList.remove("fade-out");
      testimonialElement.classList.add("fade-in");

      setTimeout(() => {
        testimonialElement.classList.remove("fade-in");
      }, 500);
    }, 500);
  }

  document.querySelector(".prev").addEventListener("click", () => {
    currentTestimonialIndex =
      (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
  });

  document.querySelector(".next").addEventListener("click", () => {
    currentTestimonialIndex =
      (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
  });

  showTestimonial(currentTestimonialIndex);
});
