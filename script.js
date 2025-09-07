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
      list.innerHTML += `<li class='bg-green-800 text-white w-[250px] px-4 py-1 rounded-lg'><a href='#'>All Trees</a></li>`;
      data.categories.forEach((cat) => {
        list.innerHTML += `<li><a href='#' title='${cat.small_description}'>${cat.category_name}</a></li>`;
      });
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
        const card = `
            <div class="w-[330px] h-[400px] rounded-lg p-[16px] bg-white shadow">
              <div class="flex justify-center bg-[#ededed]">
                <img src="${plant.image}" alt="${
          plant.name
        }" class="rounded-lg h-[178.8px] w-[298px]">
              </div>
              <div>
                <h2 class="card-title font-bold mb-[8px] mt-[12px]">${
                  plant.name
                }</h2>
                <p class="text-sm mb-[8px]">${plant.description.substring(
                  0,
                  100
                )}...</p>
              </div>
              <div class="flex justify-between mb-[12px]">
                <h1 class="text-[#15803d] px-4 bg-[#dcfce7] rounded-full">${
                  plant.category
                }</h1>
                <h1 class="font-semibold">৳${plant.price}</h1>
              </div>
              <div class="mt-2">
                <a href="#" class="btn bg-[#15803D] text-white rounded-full border-none w-[298px] mb-[16px] hover:bg-[#14532d]">
                  Get Involved
                </a>
              </div>
            </div>
          `;
        container.innerHTML += card;
      });
    }
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}
fetchPlants();
