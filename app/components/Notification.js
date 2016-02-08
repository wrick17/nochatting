export default function playNotificationSound(msg) {
  var audio = new Audio('/public/notification.mp3');
  audio.play();
}