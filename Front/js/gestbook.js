function inputValueChange() {
    let inputName = document.getElementById('input-name').value;
    console.log(inputName);
    localStorage.setItem("input-name", inputName);
}

let messageCount = 0;

document.getElementById('send').addEventListener('click', sendMessage);

function sendMessage() {
    const NameInput = localStorage.getItem('input-name');
    const chatInput = document.getElementById('chat-input');
    const chatWrap = document.getElementById('chat_wrap');
    
    const from = "from. " + NameInput.trim(); // 이름 앞에 "from." 추가
    const message = chatInput.value.trim();

    if (from && message) {
        const messageElement = document.createElement('div');
        const fromElement = document.createElement('p');
        const textElement = document.createElement('p');
        
        fromElement.textContent = from;
        fromElement.className = 'from';
        
        textElement.innerHTML = message.replace(/\n/g, '<br>'); // 줄바꿈 문자를 <br> 태그로 변환
        textElement.className = 'text';

        const messageClass = messageCount % 2 === 0 ? 'chat red' : 'chat blue';
        messageElement.className = messageClass;

        messageElement.appendChild(textElement);
        messageElement.appendChild(fromElement);

        chatWrap.appendChild(messageElement);
        chatWrap.scrollTop = chatWrap.scrollHeight;

        chatInput.value = '';
        messageCount++;
    }
}
