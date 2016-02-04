(function() {
  $('#name-form input').focus();

  $('#name-form').submit(function(e){

    e.preventDefault();

    $(this).hide();
    $('#chat-form').show();

    var name = $('#name').val();

    var socket = io(window.location.origin,{query:'name='+name});

    $('#m').focus();

    $('#chat-form').submit(function(e){
      e.preventDefault();

      socket.emit('chat message', {
        message: $('#m').val()
      });

      $('#m').val('').focus();

      return false;

    });

    socket.on('chat message', function(msg){

      $('#messages').append($('<li>').html('<label>'+msg.name+':</label> '+msg.message));
      $('#messages').scrollTop($("#messages")[0].scrollHeight);

    });

    socket.on('joined', function(name) {
      $('#messages').append($('<li class="notification">').html('<label>'+name+'</label> has joined the chat'));
      $('#messages').scrollTop($("#messages")[0].scrollHeight);
    });

    socket.on('left', function(name) {
      $('#messages').append($('<li class="notification">').html('<label>'+name+'</label> has left the chat'));
      $('#messages').scrollTop($("#messages")[0].scrollHeight);
    });

  });
})();