let toggleRightSidebar = true;

function funcToggleRightSidebar(){
  const element = document.getElementById('rightSidebar');
  const body = document.querySelector('body');
  toggleRightSidebar = !toggleRightSidebar;

  if (toggleRightSidebar){
    element.classList.add('right-sidebar-hide');
    body.classList.remove('body-hide-right-sidebar');
  }else{
    element.classList.remove('right-sidebar-hide');
    body.classList.add('body-hide-right-sidebar');
  }
 

  console.log(toggleRightSidebar);
}
