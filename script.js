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

async function fetchCategories() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    if (data.status && data.categories) {
      // Sidebar for large screens
      const list = document.getElementById("category-list");
      list.innerHTML = "";
      list.innerHTML += `<li><a href='#' data-id='all' class='category-btn bg-green-800 text-white w-[250px] px-4 py-1 rounded-lg block'>All Trees</a></li>`;
      data.categories.forEach((cat) => {
        list.innerHTML += `<li><a href='#' data-id='${cat.id}' title='${cat.small_description}' class='category-btn w-[250px] px-4 py-1 rounded-lg block'>${cat.category_name}</a></li>`;
      });
      list.querySelectorAll(".category-btn").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          list.querySelectorAll(".category-btn").forEach((btn) => {
            btn.classList.remove("bg-green-800", "text-white");
          });
          link.classList.add("bg-green-800", "text-white");
          const id = link.getAttribute("data-id");
          if (id === "all") {
            fetchPlants();
          } else {
            fetchPlantsByCategory(id);
          }
        });
      });
      // Small screen select
      const select = document.getElementById("category-select");
      if (select) {
        select
          .querySelectorAll('option:not([value="all"]):not([disabled])')
          .forEach((opt) => opt.remove());
        data.categories.forEach((cat) => {
          const option = document.createElement("option");
          option.value = cat.id;
          option.textContent = cat.category_name;
          select.appendChild(option);
        });
        select.value = "all";
        select.onchange = function () {
          const id = select.value;
          if (id === "all") {
            fetchPlants();
          } else {
            fetchPlantsByCategory(id);
          }
        };
      }
      async function fetchPlantsByCategory(categoryId) {
        try {
          showSpinner();
          const res = await fetch(
            `https://openapi.programming-hero.com/api/category/${categoryId}`
          );
          const data = await res.json();
          hideSpinner();
          if (data.status && data.plants) {
            const container = document.getElementById("card-container");
            container.innerHTML = "";
            data.plants.forEach((plant) => {
              container.appendChild(renderCard(plant));
            });
          }
        } catch (error) {
          hideSpinner();
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
    showSpinner();
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    hideSpinner();
    if (data.status && data.plants) {
      const container = document.getElementById("card-container");
      container.innerHTML = "";

      data.plants.forEach((plant) => {
        container.appendChild(renderCard(plant));
      });
    }
  } catch (error) {
    hideSpinner();
    console.error("Error fetching plants:", error);
  }
}
fetchPlants();

document.getElementById("close-modal").onclick = function () {
  document.getElementById("tree-modal").classList.add("hidden");
};
document.getElementById("close-modal-btn").onclick = function () {
  document.getElementById("tree-modal").classList.add("hidden");
};

function renderCard(plant) {
  const card = document.createElement("div");
  card.className =
    "w-[330px] h-[400px] rounded-lg p-[16px] bg-white shadow cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl";
  card.innerHTML = `
    <div class='flex justify-center bg-[#ededed]'>
      <img src='${plant.image}' alt='${
    plant.name
  }' class='rounded-lg h-[178.8px] w-[298px]'>
    </div>
    <div>
      <h2 class='card-title font-bold mb-[8px] mt-[12px] cursor-pointer'>${
        plant.name
      }</h2>
      <p class='text-sm mb-[8px]'>${plant.description.substring(0, 100)}...</p>
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
  // Only tree name click opens modal
  card.querySelector(".card-title").addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(plant.id);
  });
  card.querySelector(".add-to-cart").addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(plant);
  });
  return card;
}

function openModal(plantId) {
  fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status && data.plants) {
        const plant = data.plants;
        document.getElementById("modal-image").src = plant.image;
        document.getElementById("modal-name").textContent = plant.name;
        document.getElementById("modal-description").textContent =
          plant.description;
        document.getElementById("modal-category").textContent = plant.category;
        document.getElementById("modal-price").textContent = `৳${plant.price}`;
        document.getElementById("tree-modal").classList.remove("hidden");
      }
    });
}

function showSpinner() {
  document.getElementById("loading-spinner").classList.remove("hidden");
}
function hideSpinner() {
  document.getElementById("loading-spinner").classList.add("hidden");
}
