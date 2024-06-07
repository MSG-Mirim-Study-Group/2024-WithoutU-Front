// gestbook.js

// 입력된 이름을 로컬 스토리지에 저장하는 함수
function inputValueChange() {
    let inputName = document.getElementById('input-name').value;
    console.log(inputName);
    localStorage.setItem("input-name", inputName);  // 로컬 스토리지에 이름 저장
}

let messageCount = 0;

// 메시지 전송 버튼 클릭 이벤트 핸들러 등록
document.getElementById('send').addEventListener('click', sendMessage);

// 메시지를 서버로 전송하는 함수
function sendMessage() {
    const NameInput = localStorage.getItem('input-name');  // 로컬 스토리지에서 이름 가져오기
    const chatInput = document.getElementById('chat-input');  // 입력된 메시지 가져오기
    const chatWrap = document.getElementById('chat_wrap');  // 메시지를 표시할 영역 가져오기
    const pageId = document.getElementById('send').dataset.pageId;  // 페이지 ID 가져오기

    const from = "from. " + NameInput.trim();  // 이름 앞에 "from." 추가
    const message = chatInput.value.trim();  // 메시지 내용 가져오기

    if (from && message) {
        // AJAX 요청을 통해 메시지를 서버로 전송
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/submit_message.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                loadMessages();  // 메시지 로드 함수 호출
            }
        };
        xhr.send("name=" + encodeURIComponent(NameInput) + "&message=" + encodeURIComponent(message) + "&page_id=" + encodeURIComponent(pageId));
    }
}


// 서버에서 메시지를 로드하는 함수
function loadMessages() {
    const chatWrap = document.getElementById('chat_wrap');  // 메시지를 표시할 영역 가져오기
    const pageId = document.getElementById('send').dataset.pageId;  // 페이지 ID 가져오기

    // AJAX 요청을 통해 메시지를 서버에서 가져오기
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/load_messages.php?page_id=" + encodeURIComponent(pageId), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const messages = JSON.parse(xhr.responseText);  // 서버에서 받은 메시지를 JSON으로 파싱
            chatWrap.innerHTML = '';  // 기존 메시지 초기화
            messages.forEach((messageData, index) => {
                const messageElement = document.createElement('div');
                const fromElement = document.createElement('p');
                const textElement = document.createElement('p');
                
                fromElement.textContent = "from. " + messageData.name;
                fromElement.className = 'from';
                
                textElement.innerHTML = messageData.message.replace(/\n/g, '<br>');  // 줄바꿈 문자를 <br> 태그로 변환
                textElement.className = 'text';

                const messageClass = index % 2 === 0 ? 'chat red' : 'chat blue';  // 메시지 색상 결정
                messageElement.className = messageClass;

                messageElement.appendChild(textElement);
                messageElement.appendChild(fromElement);

                chatWrap.appendChild(messageElement);
            });
            chatWrap.scrollTop = chatWrap.scrollHeight;  // 스크롤을 맨 아래로 이동
        }
    };
    xhr.send();
}

// 페이지가 로드되면 메시지를 불러옴
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();  // 메시지 로드 함수 호출
});
