
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
        window.location.href = './type/typeLine5.html';
    } else if (maxKey === 'sk') {
        window.location.href = './type/typeLine8.html';
    } else if (maxKey === 'hd') {
        window.location.href = './type/typeLine3.html';
    } else if (maxKey === 'hy') {
        window.location.href = './type/typeLine2.html';
    } else if (maxKey === 'ny') {
        window.location.href = './type/typeLine4.html';
    } else if (maxKey === 'jy') {
        window.location.href = './type/typeLine7.html';
    } else if (maxKey === 'dh') {
        window.location.href = './type/typeLine6.html';
    } else if (maxKey === 'gm') {
        window.location.href = './type/typeLine1.html';
    }
}