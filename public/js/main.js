window.addEventListener('DOMContentLoaded', () => {
    const chatWrap = document.querySelector('.chat-wrap');
    const usersList = chatWrap.querySelector('.users-list');
    const chatMessages = chatWrap.querySelector('.chat-messages');
    const chatInput = chatWrap.querySelector('.chat-input');
    const sendBtn = chatWrap.querySelector('.chat-send-btn');
    const userSelectWrap = chatWrap.querySelector('.users-select');
    const userSelected = {selected: false, user: null};
    const unselectBtn = chatWrap.querySelector('.unselectbtn');

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (userSelected.selected && userSelected.user) {
            console.log('test')
            return;
        }
        socket.emit('message', {'msg': chatInput.value});
    });

    unselectBtn.addEventListener('click', (e) => {
        userSelected.selected = false;
        userSelected.user = null;
    });

    const selectUser = (e) => {
        const selectedUser = e.target.value;

        userSelected.selected = true;
        userSelected.user = selectedUser;
    };


    const createSelectUser = (username) => {
        if (!username) return;
        const option = document.createElement('option');
        option.classList.add('user-select-item');
        option.value = username;
        option.textContent = username;

        userSelectWrap.appendChild(option);
    };

    const addUserToList = (userName) => {
        const li = document.createElement('li');
        li.textContent = userName;
        li.classList.add('user-item');
        createSelectUser(userName);
        return li;
    };

    const createMessage = (text, user) => {
        if (!user || !text) return;
        const div = document.createElement('div');
        const span = document.createElement('span');
        const p = document.createElement('p');

        div.classList.add('message-wrap');
        span.textContent = user;
        div.appendChild(span);
        p.classList.add('chat-message');
        p.textContent = text;
        div.appendChild(p);

        return div;
    };

    socket.on('checkUsers', (msgObj) => {
        const allUsers = usersList.querySelectorAll('.user-item');
        const allUserOptions = userSelectWrap.querySelectorAll('.user-select-item');
        if (allUsers && allUsers.length > 0) {
            allUsers.forEach((item) => item.remove());
            allUserOptions.forEach((item) => item.remove());
        }
        msgObj.users.forEach((username) => {
            const user = addUserToList(username);
            usersList.appendChild(user);
        });
    });

    socket.on('message', (msgData) => {
        const message = createMessage(msgData.msg, msgData.user);
        if (message) chatMessages.appendChild(message);
        chatMessages.scrollTo(0, chatMessages.scrollHeight);
        chatInput.value = '';
    });

    userSelectWrap.addEventListener('change', selectUser);
});