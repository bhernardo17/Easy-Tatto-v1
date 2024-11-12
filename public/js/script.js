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
