$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main-message-top">
        <p>
        ${message.user_name}
        </p>
        <p>
        ${message.created_at}
        </p>
        </div>
        <div class="chat-main-message-bottom">
        <p class="message">
        ${message.content}
        </p>
        <img class="lower-message__image" src=${message.image} alt="Defaultbackground">
        </div>`
      return html;
    } else {
      var html =
       `<div class="chat-main-message-top">
        <p>
        ${message.user_name}
        </p>
        <p>
        ${message.created_at}
        </p>
        </div>
        <div class="chat-main-message-bottom">
        <p class="message">
        ${message.content}
        </p>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main-message').append(html);
      $('.chat-main-messages').animate({ scrollTop: $('.chat-main-messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit_send').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('form')[0].reset();
      $('.submit_send').prop('disabled', false);
    });
  });
});