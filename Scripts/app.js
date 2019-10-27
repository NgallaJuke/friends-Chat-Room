// DOM queries
const chatList = document.querySelector('.chat-list');

// Class instance
const chatUi = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'Ngalla');

/* get the chat and render */
chatroom.getChats(data => chatUi.render(data));
