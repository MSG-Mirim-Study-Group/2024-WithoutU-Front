// 변수 초기화
let dj = 0;     // 동진
let hd = 0;     // 희두
let gm = 0;     // 규민
let jy = 0;     // 주원
let dh = 0;     // 다혜
let ny = 0;     // 나연
let hy = 0;     // 해은
let sk = 0;     // 서경

window.onload = function () {
    if (localStorage.getItem("dj")) {
      i = parseInt(localStorage.getItem("dj"));
    }
    if (localStorage.getItem("hd")) {
      j = parseInt(localStorage.getItem("hd"));
    }
    if (localStorage.getItem("gm")) {
      s = parseInt(localStorage.getItem("gm"));
    }
    if (localStorage.getItem("jy")) {
      e = parseInt(localStorage.getItem("jy"));
    }
    if (localStorage.getItem("dh")) {
      f = parseInt(localStorage.getItem("dh"));
    }
    if (localStorage.getItem("ny")) {
      n = parseInt(localStorage.getItem("ny"));
    }
    if (localStorage.getItem("hy")) {
      p = parseInt(localStorage.getItem("hy"));
    }
    if (localStorage.getItem("sk")) {
      t = parseInt(localStorage.getItem("sk"));
    }
  };