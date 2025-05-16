    const produtos = [
<<<<<<< HEAD
      { name: "Camiseta Preta", price: 49.99, imageUrl: "bg.jpg" },
      { name: "Tênis Esportivo", price: 999.90, imageUrl: "bg.jpg" },
      { name: "Mochila Escolar", price: 89.50, imageUrl: "bg.jpg" }
=======
      { name: "Camiseta Preta", price: 49.99, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00" },
      { name: "Tênis Esportivo", price: 999.90, imageUrl: "bg.jpg", local: "Guarulhos", data: "25/12/2024, 00:00" },
      { name: "Mochila Escolar", price: 89.50, imageUrl: "png.webp", local: "Guarulhos", data: "25/12/2024, 00:00"},
      { name: "Mochila Escolar", price: 89.50, imageUrl: "8136031.png", local: "Guarulhos", data: "25/12/2024, 00:00"},
      { name: "Mochila Escolar", price: 89.50, imageUrl: "png.jpg", local: "Guarulhos", data: "25/12/2024, 00:00"}
>>>>>>> 58c04ee (product cards)
    ];

    const container = document.getElementById("products");
    const template = document.getElementById("product-template");

    produtos.forEach(produto => {
      const clone = template.cloneNode(true);
      clone.style.display = "block";
      clone.removeAttribute("id");

      clone.querySelector(".productName").textContent = produto.name;
      clone.querySelector(".productPrice").textContent = `R$ ${produto.price.toFixed(2)}`;
<<<<<<< HEAD
=======
      clone.querySelector(".local").textContent = produto.local;
      clone.querySelector(".data").textContent = produto.data;
      
>>>>>>> 58c04ee (product cards)
      clone.querySelector("img").src = produto.imageUrl;

      container.appendChild(clone);
    });
