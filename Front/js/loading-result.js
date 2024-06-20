
document.addEventListener("DOMContentLoaded", function() {
    const title = "l o a d i n g . . ";
    const loadingTitle = document.querySelector('.loading-title');
    const progressBarGauge = document.querySelector('.progress-bar-gauge');
    let index = 0;

    function displayNextCharacter() {
        if (index < title.length) {
            loadingTitle.textContent += title[index];
            index++;
            setTimeout(displayNextCharacter, 150);
        } else {
            setTimeout(redirectToResultPage, 1000); // 1초 대기 후 결과 페이지로 이동
        }
    }

    function updateProgressBar() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width++;
                progressBarGauge.style.width = width + '%';
            }
        }, 15); // 15ms마다 width를 1씩 증가
    }

    displayNextCharacter();
    updateProgressBar();
});


let type = 0;

// 변수 값 비교하여 결과 페이지로 이동하는 함수
function redirectToResultPage() {
    loadVariables(); // 변수를 다시 불러오기
    let maxKey = null;
    let maxValue = -1;

    for (let key in variables) {
        if (variables[key] > maxValue) {
            maxValue = variables[key];
            maxKey = key;
        }
    }
    // 예시: maxKey가 'dj'일 경우 결과 페이지로 이동
    if (maxKey === 'dj') {
        type = 5;
        sendname(type);
        window.location.href = './type/typeLine5.html';
    } else if (maxKey === 'sk') {
        type = 8;
        sendname(type);
        window.location.href = './type/typeLine8.html';
    } else if (maxKey === 'hd') {
        type = 3;
        sendname(type);
        window.location.href = './type/typeLine3.html';
    } else if (maxKey === 'hy') {
        type = 2;
        sendname(type);
        window.location.href = './type/typeLine2.html';
    } else if (maxKey === 'ny') {
        type = 4;
        sendname(type);
        window.location.href = './type/typeLine4.html';
    } else if (maxKey === 'jy') {
        type = 7;
        sendname(type);
        window.location.href = './type/typeLine7.html';
    } else if (maxKey === 'dh') {
        type = 6;
        sendname(type);
        window.location.href = './type/typeLine6.html';
    } else if (maxKey === 'gm') {
        type = 1;
        sendname(type);
        window.location.href = './type/typeLine1.html';
    }

    // 메시지를 서버로 보내는 비동기 함수
    async function sendname(typeid) {
        const NameInput = localStorage.getItem('input-name');
        const TypeId = typeid;
        if (NameInput && TypeId) {
            try {
                console.log('메시지 전송 중:', { name: NameInput, type: TypeId });
                // 서버에 메시지를 제출하기 위한 요청
                const response = await fetch('../api/submit_name.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `name=${encodeURIComponent(NameInput)}&type=${encodeURIComponent(TypeId)}`
                });
                const responseText = await response.text();  // 응답을 텍스트 형식으로 먼저 파싱
                console.log('서버 응답 텍스트:', responseText);
                const data = JSON.parse(responseText);  // 텍스트를 JSON으로 파싱
                console.log('서버 응답 JSON:', data);
                if (data.success) {
                    console.log(data.type);  // 성공 메시지 출력
                } else {
                    console.error(data.type);  // 오류 메시지 출력
                }
            } catch (error) {
                console.error("메시지 전송 중 오류 발생:", error);  // 요청 중 오류 발생 시 메시지 출력
            }
        } else {
            console.log('메시지를 입력해 주세요.');  // 유효하지 않은 메시지일 경우 메시지 출력
        }
    }
}
