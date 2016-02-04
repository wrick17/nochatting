(function() {
  $('#name-form input').focus();
  $('#name-form').submit(function(e){
    e.preventDefault();
    $(this).hide();
    $('#chat-form').show();
    var name = $('#name').val();
    var socket = io();
    $('#m').focus();
    $('#chat-form').submit(function(e){
      e.preventDefault();
      socket.emit('chat message', {
        name: name,
        message: $('#m').val()
      });
      $('#m').val('').focus();
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').html('<label>'+msg.name+':</label> '+msg.message));
      $('#messages').scrollTop($("#messages")[0].scrollHeight);
    });
  });
})();