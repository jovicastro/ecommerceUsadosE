function trocarImagem(elemento) {
    // Muda a imagem principal
    const imagemDestaque = document.getElementById("imagem-destaque");
    imagemDestaque.src = elemento.src;

    // Atualiza a seleção visual
    document.querySelectorAll('.miniaturas img').forEach(img => {
      img.classList.remove('selecionada');
    });
    elemento.classList.add('selecionada');
  }