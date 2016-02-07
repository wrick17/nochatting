export default function playNotificationSound(msg) {
  function showNotification(msg) {
    navigator.serviceWorker.register('sw.js');
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(msg.message, {
        body: msg.name,
        icon: '/public/notification.png'
      });
    });
  }
  function notify(msg) {
    if (!("Notification" in window)) {
      return false;
    }
    else if (window.Notification.permission === "granted") {
      showNotification(msg);
      return true;
    }
    else if (window.Notification.permission !== 'denied') {
      window.Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          showNotification(msg);
          return true;
        }
        else
          return false;
      });
    }
    else
      return false;
  }
  if (!notify(msg)) {
    var audio = new Audio('/public/notification.mp3');
    audio.play();
  }

}