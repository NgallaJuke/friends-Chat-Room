/*
In this script we want to
1- Render the chat template to the DOM
2- Clear the list of chats(when the room changes)
*/

class ChatUI {
  constructor(list) {
    this.list = list;
  }

  render(data) {

    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true });
    const html = `
      <li class="list-group-item">
      <span class="username">${data.username}:</span>
      <span class=""message>${data.message}</span>
      <div class="time">${when}</div>
      </li>
    `;
    this.list.innerHTML += html;
  }
};