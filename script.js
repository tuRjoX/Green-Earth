// Cart state
let cart = [];

function renderCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    cartList.innerHTML += `
      <li class="flex items-center justify-between mb-3 bg-[#e6f4ea] rounded-lg shadow">
        <div class="flex-1 p-3">
          <h1>${item.name}</h1>
          <p>৳${item.price} x ${item.qty}</p>
        </div>
        <div>
          <button onclick="removeFromCart(${idx})">
            <i class='fa-solid fa-xmark'></i>
          </button>
        </div>
      </li>
    `;
  });
  // Show total
  const totalSpan = document.getElementById("cart-total");
  totalSpan.innerHTML = `
  <div class="flex justify-between">
    <h1>Total:</h1>
    <p>৳${total}</p>
  </div>
  `;
}

window.removeFromCart = function (idx) {
  cart.splice(idx, 1);
  renderCart();
};

function addToCart(plant) {
  const found = cart.find((item) => item.id === plant.id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...plant, qty: 1 });
  }
  renderCart();
}

// Fetch and render categories in the sidebar
async function fetchCategories() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    if (data.status && data.categories) {
      const list = document.getElementById("category-list");
      list.innerHTML = "";
      // Add 'All Trees' option
      list.innerHTML += `<li><a href='#' data-id='all' class='category-btn bg-green-800 text-white w-[250px] px-4 py-1 rounded-lg block'>All Trees</a></li>`;
      data.categories.forEach((cat) => {
        list.innerHTML += `<li><a href='#' data-id='${cat.id}' title='${cat.small_description}' class='category-btn w-[250px] px-4 py-1 rounded-lg block'>${cat.category_name}</a></li>`;
      });

      // Add click listeners to category links
      list.querySelectorAll(".category-btn").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          // Remove highlight from all
          list.querySelectorAll(".category-btn").forEach((btn) => {
            btn.classList.remove("bg-green-800", "text-white");
          });
          // Highlight selected
          link.classList.add("bg-green-800", "text-white");
          const id = link.getAttribute("data-id");
          if (id === "all") {
            fetchPlants();
          } else {
            fetchPlantsByCategory(id);
          }
        });
      });
      // Fetch plants by category
      async function fetchPlantsByCategory(categoryId) {
        try {
          const res = await fetch(
            `https://openapi.programming-hero.com/api/category/${categoryId}`
          );
          const data = await res.json();
          if (data.status && data.plants) {
            const container = document.getElementById("card-container");
            container.innerHTML = "";
            data.plants.forEach((plant) => {
              const card = document.createElement("div");
              card.className =
                "w-[330px] h-[400px] rounded-lg p-[16px] bg-white shadow";
              card.innerHTML = `
                <div class='flex justify-center bg-[#ededed]'>
                  <img src='${plant.image}' alt='${
                plant.name
              }' class='rounded-lg h-[178.8px] w-[298px]'>
                </div>
                <div>
                  <h2 class='card-title font-bold mb-[8px] mt-[12px]'>${
                    plant.name
                  }</h2>
                  <p class='text-sm mb-[8px]'>${plant.description.substring(
                    0,
                    100
                  )}...</p>
                </div>
                <div class='flex justify-between mb-[12px]'>
                  <h1 class='text-[#15803d] px-4 bg-[#dcfce7] rounded-full'>${
                    plant.category
                  }</h1>
                  <h1 class='font-semibold'>৳${plant.price}</h1>
                </div>
                <div class='mt-2'>
                  <button class='btn bg-[#15803D] text-white rounded-full border-none w-[298px] mb-[16px] hover:bg-[#14532d] add-to-cart'>Add to Cart</button>
                </div>
              `;
              card
                .querySelector(".add-to-cart")
                .addEventListener("click", () => addToCart(plant));
              container.appendChild(card);
            });
          }
        } catch (error) {
          console.error("Error fetching plants by category:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

fetchCategories();
async function fetchPlants() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    if (data.status && data.plants) {
      const container = document.getElementById("card-container");
      container.innerHTML = "";

      data.plants.forEach((plant) => {
        const card = document.createElement("div");
        card.className =
          "w-[330px] h-[400px] rounded-lg p-[16px] bg-white shadow";
        card.innerHTML = `
          <div class='flex justify-center bg-[#ededed]'>
            <img src='${plant.image}' alt='${
          plant.name
        }' class='rounded-lg h-[178.8px] w-[298px]'>
          </div>
          <div>
            <h2 class='card-title font-bold mb-[8px] mt-[12px]'>${
              plant.name
            }</h2>
            <p class='text-sm mb-[8px]'>${plant.description.substring(
              0,
              100
            )}...</p>
          </div>
          <div class='flex justify-between mb-[12px]'>
            <h1 class='text-[#15803d] px-4 bg-[#dcfce7] rounded-full'>${
              plant.category
            }</h1>
            <h1 class='font-semibold'>৳${plant.price}</h1>
          </div>
          <div class='mt-2'>
            <button class='btn bg-[#15803D] text-white rounded-full border-none w-[298px] mb-[16px] hover:bg-[#14532d] add-to-cart'>Add to Cart</button>
          </div>
        `;
        card
          .querySelector(".add-to-cart")
          .addEventListener("click", () => addToCart(plant));
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}
fetchPlants();
