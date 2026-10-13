const notification = document.querySelector('#notification');
const notificationMessage = document.querySelector('#notification-message');
let notificationTimer;

function showNotification(message, type = 'info') {
    if (!notification || !notificationMessage) return;
    clearTimeout(notificationTimer);
    notificationMessage.textContent = message;
    notification.className = `notification ${type} show`;
    notificationTimer = setTimeout(() => notification.classList.remove('show'), 3000);
}
