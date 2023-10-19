function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('sidebar-hidden')) {
    sidebar.classList.remove('sidebar-hidden');
  } else {
    sidebar.classList.add('sidebar-hidden');
  }
}
