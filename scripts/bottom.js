let toggleQueueButton = true;
document.querySelector('.js-button-queue').addEventListener('click', () => {
    toggleQueueButton = !toggleQueueButton;
    
    const queueBar = document.querySelector('.js-queue-bar').classList;
    const classHideQueue = 'queue-main-div-hide';

    toggleQueueButton ? queueBar.add(classHideQueue) : queueBar.remove(classHideQueue);

})

