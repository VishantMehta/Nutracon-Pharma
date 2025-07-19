
    // for hamburger toggling 
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const icon = document.getElementById("hamburger").querySelector("i");

  nav.classList.toggle("active");

  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}


    const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = products[id];

if (product) {
  document.getElementById("productImage").src = product.images[0];
  document.getElementById("productImage").alt = product.name;

  document.getElementById("productCategory").innerHTML = `<i class="fa fa-capsules"></i> ${product.category}`;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productTagline").textContent = product.tagline;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("productComposition").textContent = product.composition;

  const featureList = document.getElementById("productFeatures");
  featureList.innerHTML = "";
  product.features.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa fa-circle"></i> ${f}`;
    featureList.appendChild(li);
  });

  const tipList = document.getElementById("productTips");
  tipList.innerHTML = "";
  product.tips.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    tipList.appendChild(li);
  });

  const indicationList = document.getElementById("productIndications");
  indicationList.innerHTML = "";
  product.indications.forEach(i => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa fa-check-circle" style="color:green; margin-right:6px;"></i> ${i}`;
    indicationList.appendChild(li);
  });
} else {
  alert("Product not found.");
}
