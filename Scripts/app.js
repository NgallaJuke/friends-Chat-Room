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
// Class instance
const chatUi = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'Ngalla');

/* get the chat and render */
chatroom.getChats(data => chatUi.render(data));
