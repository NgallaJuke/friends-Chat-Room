class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
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

  getChats(callback) {
    // this.unsub is a function 
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            callback(change.doc.data());
          }
        });
      })
  }

  updateName(username) {
    this.username = username;
  }


  updateRoom(room) {
    this.room = room;
    console.log('room updated');
    // unsub to the last room that we were in.but we must xheck if it had a value
    if (this.unsub)
      this.unsub();
  }
}



