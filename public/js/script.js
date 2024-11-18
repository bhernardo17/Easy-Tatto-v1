// Script para fechar a sidebar quando o mouse sair
const sidebar = document.getElementById('sidebar');

// Detecta quando o mouse entra na sidebar
sidebar.addEventListener('mouseenter', function() {
    sidebar.style.width = '250px';
});

// Detecta quando o mouse sai da sidebar
sidebar.addEventListener('mouseleave', function() {
    sidebar.style.width = '80px';
});


// MUDAR A COR DO BACKGROUND
document.addEventListener('DOMContentLoaded', () => {
    const bgColorPicker = document.getElementById('bgColorPicker');
  
    // Define a cor padrão se não houver uma no localStorage
    const savedBgColor = localStorage.getItem('backgroundColor') || '#1c1c1c';
    document.body.style.setProperty('--background-color', savedBgColor);
    bgColorPicker.value = savedBgColor;
  
    // Adiciona o evento de mudança de cor
    bgColorPicker.addEventListener('input', () => {
      const selectedColor = bgColorPicker.value;
      document.body.style.setProperty('--background-color', selectedColor);
      localStorage.setItem('backgroundColor', selectedColor);
    });
  });
  