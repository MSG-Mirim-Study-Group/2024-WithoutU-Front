// 이름을 서버에 저장하는 함수
function submitName() {
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
    } else {
        console.log('error!!');
    }
}

// 메시지 전송 버튼 클릭 이벤트 핸들러 등록
document.getElementById('send').addEventListener('click', sendMessage);

// 메시지를 서버로 전송하는 함수
function sendMessage() {
    const chatInput = document.getElementById('chat-input').value.trim();
    const pageId = document.getElementById('send').dataset.pageId;

    if (chatInput) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/submit_message.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    console.log(response.message);
                    loadMessages();
                } else {
                    console.error(response.message);
                }
            }
        };
        xhr.send("message=" + encodeURIComponent(chatInput) + "&page_id=" + encodeURIComponent(pageId));
        document.getElementById('chat-input').value = '';
    }
}

// 페이지가 로드되면 메시지를 불러옴
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();  // 메시지 로드 함수 호출
    document.getElementById('input-name').addEventListener('input', inputValueChange);  // 이름 입력 필드에 이벤트 리스너 추가
    document.getElementById('input-name-submit').addEventListener('click', submitName);  // 이름 제출 버튼에 이벤트 리스너 추가
});
