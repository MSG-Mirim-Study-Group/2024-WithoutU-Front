// 초기 변수 값 설정
let variables = {
  dj: 0,
  sk: 0,
  hd: 0,
  hy: 0,
  ny: 0,
  jy: 0,
  dh: 0,
  gm: 0
};

// 로컬 스토리지에서 변수 값 불러오기
function loadVariables() {
  for (let key in variables) {
      if (localStorage.getItem(key)) { 
        // 아이템의 키값을 가지고와 10진수로 변환
          variables[key] = parseInt(localStorage.getItem(key), 10);   
      }
  }
}

// 변수 값 업데이트 함수
function updateVariables(pageUrl, ...args) {
  args.forEach(arg => {   // args 배열을 순회하며 각 arg 인자를 참조
      if (arg in variables) {
          variables[arg]++;   // 해당 속성값 1 증가
          localStorage.setItem(arg, variables[arg]);
      }
  });
  // 페이지 전환
  window.location.href = pageUrl;
}

// 페이지 로드 시 변수 값 로드
window.onload = loadVariables;