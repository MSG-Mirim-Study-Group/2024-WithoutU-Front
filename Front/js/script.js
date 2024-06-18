// 드래그와 우클릭 방지
document.addEventListener('DOMContentLoaded', function() {
    // 드래그 방지
    document.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });

    // 우클릭 방지
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
});
