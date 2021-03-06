$(document).on('turbolinks:load', function() {
  function appendAutoMessage(message){
    var message_image = message.image ? message.image : ""
    var html = `<div class="chat-body__message" data-message-id="${message.id}">
                  <div class="chat-body__message-user-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-body__message-created-time">
                    ${message.date}
                  </div>
                  <div class="chat-body__message-content">
                    ${message.content}
                    <div class="lower-message__image">
                    <img src=${message_image}>
                    </div>
                  </div>
                </div>`
    $(".chat-body").append(html);
  }

  var setIntervaler = setInterval(function(){

    if (location.href.match(/\/groups\/\d+\/messages/)){

        lastMessageId = $(".chat-body__message:last").data("message-id") || 0

        $.ajax({
          type: "get",
          url: location.href,
          data: {lastMessageId: lastMessageId},
          dataType: "json"
        })
        .done(function(autoMessages){
          if (autoMessages.length != 0){

            autoMessages.forEach(function(autoMessage){
              appendAutoMessage(autoMessage);
            })
          }
        })


    }

  }, 5000);

});
