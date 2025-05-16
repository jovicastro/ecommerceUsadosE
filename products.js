    const produtos = [
      { name: "Camiseta Preta", price: 49.99, imageUrl: "bg.jpg" },
      { name: "Tênis Esportivo", price: 999.90, imageUrl: "bg.jpg" },
      { name: "Mochila Escolar", price: 89.50, imageUrl: "bg.jpg" }
    ];

    const container = document.getElementById("products");
    const template = document.getElementById("product-template");

    produtos.forEach(produto => {
      const clone = template.cloneNode(true);
      clone.style.display = "block";
      clone.removeAttribute("id");

      clone.querySelector(".productName").textContent = produto.name;
      clone.querySelector(".productPrice").textContent = `R$ ${produto.price.toFixed(2)}`;
      clone.querySelector("img").src = produto.imageUrl;

      container.appendChild(clone);
    });
