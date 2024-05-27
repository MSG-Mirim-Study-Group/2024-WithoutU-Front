// let messageCount = 0;

// document.getElementById('send').addEventListener('click', sendMessage);

// function sendMessage() {
//     const nameInput = document.getElementById('name-input');
//     const chatInput = document.getElementById('chat-input');
//     const chatWrap = document.getElementById('chat-wrap');
    
//     const from = nameInput.value.trim();
//     const message = chatInput.value.trim();

//     if (from && message) {
//         const messageElement = document.createElement('div');
//         const senderElement = document.createElement('p');
        
//         senderElement.textContent = from;
//         senderElement.className = 'from';
        
//         messageElement.textContent = message;
//         messageElement.insertBefore(from, messageElement.firstChild);

//         const messageClass = messageCount % 2 === 0 ? 'chat red text' : 'chat blue text';
//         messageElement.className = 'message ' + messageClass;

//         chatWrap.appendChild(messageElement);
//         chatWrap.scrollTop = chatWrap.scrollHeight;

//         chatInput.value = '';
//         messageCount++;
//     }
// }

let messageCount = 0;

document.getElementById('send').addEventListener('click', sendMessage);

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatWrap = document.getElementById('chat_wrap');
    const message = chatInput.value.trim();

    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;

        // 홀수 메시지는 received, 짝수 메시지는 sent 클래스를 추가합니다.
        const messageClass = messageCount % 2 === 0 ? 'chat red text' : 'chat blue text';
        
        messageElement.className = 'message ' + messageClass;
        
        chatWrap.appendChild(messageElement);
        chatWrap.scrollTop = chatWrap.scrollHeight;

        chatInput.value = '';
        messageCount++;
    }
}