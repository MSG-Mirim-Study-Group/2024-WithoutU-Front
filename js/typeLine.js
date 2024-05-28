document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector('.saying').classList.add("fade-in");
    }, 500);

    // 3초 후에 리디렉션
    setTimeout(function() {
        window.location.href = "/result/result1.html";
    }, 3000);
});

