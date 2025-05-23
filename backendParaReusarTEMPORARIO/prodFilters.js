// Espera o DOM carregar
window.addEventListener("DOMContentLoaded", () => {
  // 1. Container e template
  const filtrosContainer = document.getElementById("filters");
  const template = document.querySelector(".filtersTemplate");

  // 2. Coleta os tipos únicos
  const tiposUnicos = [...new Set(produtos.map(p => p.prodType))];

  // 3. Para cada tipo, clona o template
  tiposUnicos.forEach(tipo => {
    const clone = template.cloneNode(true);
    clone.textContent = tipo;
    clone.style.display = "block";

    filtrosContainer.appendChild(clone);
  });

  // 4. Remove o template original (opcional)
  template.remove();
});

