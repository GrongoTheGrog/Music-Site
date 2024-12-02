let toggleRightSidebar = false;

function funcToggleRightSidebar(){
  const element = document.getElementById('rightSidebar');
  toggleRightSidebar = !toggleRightSidebar;

  if (toggleRightSidebar){
    element.classList.add('right-sidebar-hide');
  }else{
    element.classList.remove('right-sidebar-hide');
  }

  console.log(toggleRightSidebar);
}
