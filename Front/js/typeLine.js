document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelectorAll('.saying').forEach(function(element) {
            element.classList.add("fade-in");
        });
        //명대사 서서히 출력 
    }, 500);
});