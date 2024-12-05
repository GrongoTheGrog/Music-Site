let hideSidebarLeftToggle = true;
function hideSidebar(){
  const sideBar = document.querySelector('.left-sidebar');
  const body = document.querySelector('body');
  if (!hideSidebarLeftToggle){
    sideBar.classList.add('left-sidebar-hide');
    body.classList.remove('body-hide-left-sidebar');
    hideSidebarLeftToggle = true;
  }else{
    sideBar.classList.remove('left-sidebar-hide');
    body.classList.add('body-hide-left-sidebar');
    hideSidebarLeftToggle = false;
  }
}