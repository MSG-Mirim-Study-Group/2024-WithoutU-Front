// 이름을 서버에 저장하는 함수
function inputValueChange() {
    let inputName = document.getElementById('input-name').value.trim();
    if (inputName) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../api/submit_name.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    console.log(response.message);
                } else {
                    console.error(response.message);
                }
            }
        };
        xhr.send("name=" + encodeURIComponent(inputName));
        console.log(inputName);
    } else {
         console.log('Please enter a valid name.');
    }
}

// 서버에서 이름을 가져오는 함수
function getNameFromServer(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../api/get_name.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    callback(response.name);
                } else {
                    console.error(response.message);
                    callback('error1');
                }
            } catch (error) {
                console.error("Parsing error:", xhr.responseText);
                callback('error2');
            }
        }
    };
    xhr.send();
}

// 메시지를 서버로 전송하는 함수
function sendMessage() {
    getNameFromServer(function(name) {
        const chatInput = document.getElementById('chat-input').value.trim();
        const pageId = document.getElementById('send').dataset.pageId;

        if (name && chatInput) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "../api/submit_message.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            console.log(response.message);
                            loadMessages();
                        } else {
                            console.error(response.message);
                        }
                    } catch (error) {
                        console.error("Parsing error:", xhr.responseText);
                    }
                }
            };
            xhr.send("name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(chatInput) + "&page_id=" + encodeURIComponent(pageId));
            document.getElementById('chat-input').value = '';  // 메시지 입력 필드 초기화
        } else {
             console.log('Please enter a message.');
        }
    });
}

// 서버에서 메시지를 로드하는 함수
function loadMessages() {
    const chatWrap = document.getElementById('chat_wrap');  // 메시지를 표시할 영역 가져오기
    const pageId = document.getElementById('send').dataset.pageId;  // 페이지 ID 가져오기

    // AJAX 요청을 통해 메시지를 서버에서 가져오기
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../api/load_messages.php?page_id=" + encodeURIComponent(pageId), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);  // 서버에서 받은 응답을 JSON으로 파싱
                if (response.success) {
                    const messages = response.messages;
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
                } else {
                    console.error(response.message);  // 오류 메시지 출력
                }
            } catch (error) {
                console.error("Parsing error:", xhr.responseText);
            }
        }
    };
    xhr.send();
}


// 페이지가 로드되면 메시지를 불러옴
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();  // 메시지 로드 함수 호출
    document.getElementById('send').addEventListener('click', sendMessage);  // 메시지 전송 버튼에 이벤트 리스너 추가
});