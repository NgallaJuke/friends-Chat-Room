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

const chatroom = new Chatroom('gaming', 'Ngalla');
chatroom.addChat('Hey Guys');

chatroom.getChats((data) => {
  console.log(data);
});


//now that this methode unsub us to the last room we need to set un a new listener
setTimeout(() => {
  chatroom.updateRoom('general');
  chatroom.updateName('Maimu');
  chatroom.getChats((data) => {
    console.log(data);
  });
  chatroom.addChat('Hey Ngalla');
}, 4000);