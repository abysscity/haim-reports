// sidebar-loader.js
// 로그인 페이지를 제외한 모든 페이지에 사이드바를 자동으로 로드

(function() {
  // 현재 페이지가 login.html인지 확인
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'login.html' || currentPage === 'login') {
    return; // 로그인 페이지면 사이드바를 로드하지 않음
  }

  // 페이지 로드 시 사이드바와 오버레이 추가
  document.addEventListener('DOMContentLoaded', function() {
    // 사이드바 컨테이너 생성
    const sidebarContainer = document.createElement('div');
    sidebarContainer.id = 'sidebar-container';
    
    // 오버레이 생성
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = toggleSidebar;
    
    // body 시작 부분에 추가
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(sidebarContainer, document.body.firstChild);
    
    // 사이드바 HTML 로드
    fetch('sidebar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('sidebar.html을 찾을 수 없습니다');
        }
        return response.text();
      })
      .then(html => {
        sidebarContainer.innerHTML = html;
        
        // 햄버거 버튼 생성
        createHamburgerButton();
      })
      .catch(err => {
        console.error('사이드바 로드 실패:', err);
        console.error('sidebar.html 파일이 같은 폴더에 있는지 확인하세요');
      });
  });
})();

// 햄버거 버튼 생성
function createHamburgerButton() {
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.innerHTML = '☰';
  hamburger.onclick = toggleSidebar;
  document.body.appendChild(hamburger);
}

// 사이드바 토글 함수
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

// 전역 함수로 노출 (sidebar.html과 다른 페이지에서 사용 가능하도록)
window.toggleSidebar = toggleSidebar;
