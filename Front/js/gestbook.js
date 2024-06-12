// 이름을 서버에 저장하는 함수
function inputValueChange() {
    let inputName = document.getElementById('input-name').value.trim(); //입력한 이름을 저장, trim() 공백 제거
    if (inputName) {  //iniputName이 비어있지 않을 경우 실행
        //XMLHttpRequest() : 페이지를 새로고침하지 않아도 url을 이용해 데이터 전송하거나 받아올 수 있음
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../api/submit_name.php", true);  //POST 방식으로 ../api/submit_name.php 파일 읽기
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {    //오류 확인 코드   //페이지가 로딩되면 자동으로 실행
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    console.log(response.message);
                } else {    //오류 발생 시 에러코드 출력
                    console.error(response.message);
                }
            }
        };
        xhr.send("name=" + encodeURIComponent(inputName));  //서버로 name이라는 키에 inputName값을 전송
        console.log(inputName);
    } else {
         console.log('Please enter a valid name.');  //경고메세지 출력
    }
}

// 서버에서 이름을 가져오는 함수
function getName(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../api/get_name.php", true);  //GET 방식으로 ../api/get_name.php 파일 읽기
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText); //가져온 이름을 json객체로 변환
                if (response.success) { //이름을 가져오면 callback 함수에 전달
                    callback(response.name);
                } else {
                    console.error(response.message); //이름을 가져오면 callback 함수에 error1 전달
                    callback('error1');
                }
            } catch (error) {
                console.error("Parsing error:", xhr.responseText);  //parsing중 오류 발생 시 error2전달
                callback('error2');
            }
        }
    };
    xhr.send();
}

// 메시지를 서버로 전송하는 함수
function sendMessage() {
    getName(function(name) {    //서버에서 이름 가져오기
        //입력한 메시지를 가져오고 trim()으로 앞 뒤 공백 제거
        const chatInput = document.getElementById('chat-input').value.trim();
        const pageId = document.getElementById('send').dataset.pageId;  //페이지 번호 가져오기

        if (name && chatInput) {    //이름과 메세지가 둘 다 존재하는지 확인
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
            //이름, 메시지, 페이지 번호를 서버로 전송
            xhr.send("name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(chatInput) + "&page_id=" + encodeURIComponent(pageId));
            document.getElementById('chat-input').value = '';  // 메시지 입력 필드 초기화
        } else {    //오류 발생 시 오류메시지 출력
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
                        const messageElement = document.createElement('div'); //div로 말풍선 생성
                        const fromElement = document.createElement('p');
                        const textElement = document.createElement('p');
                        
                        fromElement.textContent = "from. " + messageData.name;//이름 앞에 from. 추가
                        fromElement.className = 'from';
                        
                        textElement.innerHTML = messageData.message.replace(/\n/g, '<br>');  // 줄바꿈 문자를 <br> 태그로 변환
                        textElement.className = 'text';

                        const messageClass = index % 2 === 0 ? 'chat red' : 'chat blue';  // 메시지 색상 결정
                        messageElement.className = messageClass;

                        messageElement.appendChild(textElement);  //text를 말풍선의 자식으로 설정
                        messageElement.appendChild(fromElement);  //from을 말풍선의 자식으로 설정

                        chatWrap.appendChild(messageElement);  //말풍선을 chatWrap의 자식으로 설정
                    });
                    chatWrap.scrollTop = chatWrap.scrollHeight;  // 스크롤을 맨 아래로 이동
                } else {
                    console.error(response.message);  // 오류 메시지 출력
                }
            } catch (error) {   //오류 발생 시 에러메시지 출력
                console.error("Parsing error:", xhr.responseText);
            }
        }
    };
    xhr.send();
}

// 페이지가 로드되면 메시지를 불러옴
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();  //서버에서 메세지 불러오기
    document.getElementById('send').addEventListener('click', sendMessage());  // 메시지 전송 버튼에 이벤트 리스너 추가
});

// JS 방명록 임시

// function inputValueChange() {
//     let inputName = document.getElementById('input-name').value;
//     console.log(inputName);
//     localStorage.setItem("input-name", inputName);
// }

// let messageCount = 0;

// document.getElementById('send').addEventListener('click', sendMessage);

// function sendMessage() {
//     const NameInput = localStorage.getItem('input-name');
//     const chatInput = document.getElementById('chat-input');
//     const chatWrap = document.getElementById('chat_wrap');
    
//     const from = "from. " + NameInput.trim(); // 이름 앞에 "from." 추가
//     const message = chatInput.value.trim();

//     if (from && message) {
//         const messageElement = document.createElement('div');
//         const fromElement = document.createElement('p');
//         const textElement = document.createElement('p');
        
//         fromElement.textContent = from;
//         fromElement.className = 'from';
        
//         textElement.innerHTML = message.replace(/\n/g, '<br>'); // 줄바꿈 문자를 <br> 태그로 변환
//         textElement.className = 'text';

//         const messageClass = messageCount % 2 === 0 ? 'chat red' : 'chat blue';
//         messageElement.className = messageClass;

//         messageElement.appendChild(textElement);
//         messageElement.appendChild(fromElement);

//         chatWrap.appendChild(messageElement);
//         chatWrap.scrollTop = chatWrap.scrollHeight;

//         chatInput.value = '';
//         messageCount++;
//     }
// }