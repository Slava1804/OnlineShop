function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menu = document.getElementById('menu');
  if (sidebar.classList.contains('sidebar-hidden')) {
    sidebar.classList.remove('sidebar-hidden');
    menu.setAttribute('src', '/static/assets/icons/close.svg');
  } else {
    sidebar.classList.add('sidebar-hidden');
    menu.setAttribute('src', '/static/assets/icons/menu.svg');
  }
}

window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
