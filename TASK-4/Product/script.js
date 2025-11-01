const products = [
  { name: "Wireless Bluetooth Headphones", category: "Electronics", price: 2499, rating: 4.5 },
  { name: "Smart LED TV 43-inch", category: "Electronics", price: 27999, rating: 4.3 },
  { name: "Gaming Mouse RGB", category: "Electronics", price: 1299, rating: 4.6 },
  { name: "Men’s Cotton T-Shirt", category: "Fashion", price: 699, rating: 4.2 },
  { name: "Women’s Floral Dress", category: "Fashion", price: 1299, rating: 4.5 },
  { name: "Unisex Sneakers", category: "Fashion", price: 2199, rating: 4.3 },
  { name: "Electric Kettle 1.5L", category: "Home", price: 1199, rating: 4.4 },
  { name: "Wall Clock Modern Design", category: "Home", price: 799, rating: 4.0 },
  { name: "Table Lamp Decorative", category: "Home", price: 999, rating: 4.5 },
  { name: "Moisturizing Face Cream", category: "Beauty", price: 499, rating: 4.2 },
  { name: "Hair Dryer 2000W", category: "Beauty", price: 1799, rating: 4.3 },
  { name: "Perfume Eau De Parfum 100ml", category: "Beauty", price: 1499, rating: 4.5 },
];

const productContainer = document.getElementById("product-container");
const categoryFilter = document.getElementById("filter-select");
const priceFilter = document.getElementById("price-filter");
const ratingSort = document.getElementById("sort-rating");



function displayProducts(items) {
  productContainer.innerHTML = "";
  if (items.length === 0) {
    productContainer.innerHTML = "<p>No products found</p>";
    return;
  }
  items.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p class="price">Price: ₹${p.price}</p>
      <p class="rating">⭐${p.rating}</p>
    `;
    productContainer.appendChild(card);
  });
}


function filterAndSort() {
  let filtered = [...products];

  const category = categoryFilter.value;
  const price = priceFilter.value;
  const sort = ratingSort.value;



  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }



  if (price === "low") {
    filtered = filtered.filter(p => p.price < 1000);
  } else if (price === "mid") {
    filtered = filtered.filter(p => p.price >= 1000 && p.price <= 5000);
  } else if (price === "high") {
    filtered = filtered.filter(p => p.price > 5000);
  }



  if (sort === "high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  displayProducts(filtered);
}



categoryFilter.addEventListener("change", filterAndSort);
priceFilter.addEventListener("change", filterAndSort);
ratingSort.addEventListener("change", filterAndSort);


displayProducts(products);
