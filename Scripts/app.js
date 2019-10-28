// DOM queries
const chatList = document.querySelector('.chat-list');

//Add a new chat
const newChatForm = document.querySelector('.new-chat');

newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch(error => console.log(error));
});


// update userName 
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();

  chatroom.updateName(newName);
  newNameForm.reset();

  //show and hide tbe update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// Update the xhat room
const room = document.querySelector('.chat-room');

room.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUi.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => {
      chatUi.render(chat);
    });
  }

});

//check localStorage for a name
const username = localStorage.username ? localStorage.username : 'Anon';

// Class instance
const chatUi = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

/* get the chat and render */
chatroom.getChats(data => chatUi.render(data));
