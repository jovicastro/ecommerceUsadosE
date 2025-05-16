const produtos = [
  { name: "Camiseta Preta", price: 49.99, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "camiseta" },
  { name: "Tênis Esportivo", price: 999.90, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "tênis" },
  { name: "Mochila Escolar", price: 89.50, imageUrl: "png.webp", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "mochila" },
  { name: "Camiseta Preta", price: 49.99, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "camiseta" },
  { name: "Tênis Esportivo", price: 9999990000000000000000000000000999999999.90, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "tênis" },
  { name: "Mochila Escolar", price: 89.50, imageUrl: "png.webp", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "mochila" },
];

const container = document.getElementById("products");
const template = document.getElementById("product-template");

produtos.forEach(produto => {
  const clone = template.cloneNode(true);
  clone.style.display = "block";
  clone.removeAttribute("id");

  clone.querySelector(".productName").textContent = produto.name;
  clone.querySelector(".productPrice").textContent = `R$ ${produto.price.toFixed(2)}`;
  clone.querySelector(".local").textContent = produto.local;
  clone.querySelector(".data").textContent = produto.data;
  clone.querySelector("img").src = produto.imageUrl;

  container.appendChild(clone);
});

