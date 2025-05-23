const produtos = [
  { name: "Camiseta Preta", price: 49.99, imageUrl: "https://cdn.awsli.com.br/2500x2500/2179/2179851/produto/204033023/cpu-dell-7010-torre--9--5zi63jt2w4.jpeg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "camiseta" },
  { name: "Tênis Esportivo", price: 999.90, imageUrl: "https://gazin-marketplace.s3.amazonaws.com/midias/imagens/2020/05/projetor-epson-powerlite-s39-svga-3300-lumens-132005560634.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "tênis" },
  { name: "Mochila Escolar", price: 89.50, imageUrl: "https://images.tcdn.com.br/img/img_prod/1054632/cadeira_escolar_infantil_tamanho_6_azul_521_1_cb61ca886eda41f3fe49a744c47fb1b4.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "mochila" },
  { name: "Camiseta Preta", price: 49.99, imageUrl: "https://loja.shoppingescritorio.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diretor_tela_-_bcr_-_brg_3.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "camiseta" },
  { name: "Tênis Esportivo", price: 9999990000000000000000000000000999999999.90, imageUrl: "https://gazin-marketplace.s3.amazonaws.com/midias/imagens/2020/05/projetor-epson-powerlite-s39-svga-3300-lumens-132005560634.jpg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "tênis" },
  { name: "Mochila Escolar", price: 89.50, imageUrl: "https://cdn.awsli.com.br/2500x2500/2179/2179851/produto/204033023/cpu-dell-7010-torre--9--5zi63jt2w4.jpeg", local: "Guarulhos", data: "25/12/2024, 00:00", prodType: "mochila" },
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

function previewImages() {
  const preview = document.getElementById('image-preview');
  preview.innerHTML = ''; // Limpa prévias anteriores
  
  const files = document.getElementById('product-images').files;
  
  if (files.length === 0) {
    preview.innerHTML = '<p>Nenhuma imagem selecionada.</p>';
    return;
  }
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Verifica se é uma imagem
    if (!file.type.startsWith('image/')) {
      continue;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    
    reader.readAsDataURL(file); // Converte para URL exibível
  }
}