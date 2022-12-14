// dom query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
     .then(() => newChatForm.reset())
     .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.namespaceURI.value.trim();
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';

// update chatroom
rooms.addEventListener('event', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// class instances
const chatUI = new chatUI(chatList);
const chatroom = new Chatroom('gaming', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));
