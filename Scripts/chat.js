class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }

  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };

    // Save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  getChat(callback) {
    this.chats
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            callback(change.doc.data());
          }
        });
      })
  }
}

const chatroom = new Chatroom('gaming', 'Ngalla');
chatroom.getChat((data) => {
  console.log(data);
});