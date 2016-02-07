export default function playNotificationSound() {
  var audio = new Audio('/public/notification.mp3');
  audio.play();
}