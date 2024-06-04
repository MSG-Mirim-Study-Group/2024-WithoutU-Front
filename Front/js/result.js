document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector('.container-inner').classList.add("fade-in");
        //화면 서서히 출력 
    }, );
});

var alltype = '../All-of-Type.html';  

function alloftype() {
    window.location.href = alltype; 
}   //alloftype 페이지로 이동