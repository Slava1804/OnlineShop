function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('sidebar-hidden')) {
    sidebar.classList.remove('sidebar-hidden');
  } else {
    sidebar.classList.add('sidebar-hidden');
  }
}

window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (window.scrollY > 50) {  // 50px в качестве примера. Вы можете изменить это значение.
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
