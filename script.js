/**
 * 국가공무원인재개발원 (NHI) x 먼작귀 스페셜 에디션 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 다크 모드 (밤하늘 별빛 모드) 토글 기능
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const savedTheme = localStorage.getItem('nhi-chii-theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark.matches)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('nhi-chii-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // 2. 모바일 내비게이션 토글
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    const navLinks = navMenu.querySelector('.nav-links');
    mobileToggle.addEventListener('click', () => {
      if (navLinks) {
        navLinks.classList.toggle('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.className = navLinks.classList.contains('show')
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
        }
      }
    });

    const links = navMenu.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks) {
          navLinks.classList.remove('show');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // 3. 교육훈련 로드맵 탭 전환
  const roadmapBtns = document.querySelectorAll('.rm-chii-btn');
  const roadmapPanels = document.querySelectorAll('.roadmap-panel');

  roadmapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      roadmapBtns.forEach(b => b.classList.remove('active'));
      roadmapPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. FAQ 아코디언 토글
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isActive = card.classList.contains('active');

      document.querySelectorAll('.faq-card').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          const otherContent = otherCard.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (!isActive) {
        card.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        card.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // 5. 모달 내용 초기화
  updateModalInfo();
});

// 캠퍼스 뷰 전환 (진천 vs 과천)
window.switchCampusView = function(campus) {
  const jincheonBtn = document.querySelector('.campus-select-btn:nth-child(1)');
  const gwacheonBtn = document.querySelector('.campus-select-btn:nth-child(2)');
  const jincheonView = document.getElementById('view-jincheon');
  const gwacheonView = document.getElementById('view-gwacheon');

  if (campus === 'jincheon') {
    jincheonBtn.classList.add('active');
    gwacheonBtn.classList.remove('active');
    jincheonView.classList.add('active');
    gwacheonView.classList.remove('active');
  } else {
    jincheonBtn.classList.remove('active');
    gwacheonBtn.classList.add('active');
    jincheonView.classList.remove('active');
    gwacheonView.classList.add('active');
  }
};

// 모달 제어 함수
window.openRouteModal = function() {
  const modal = document.getElementById('routeModal');
  if (modal) {
    modal.classList.add('show');
    updateModalInfo();
  }
};

window.closeRouteModal = function() {
  const modal = document.getElementById('routeModal');
  if (modal) {
    modal.classList.remove('show');
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeRouteModal();
  }
});

const routeModal = document.getElementById('routeModal');
if (routeModal) {
  routeModal.addEventListener('click', (e) => {
    if (e.target === routeModal) {
      window.closeRouteModal();
    }
  });
}

// 모달 정보 업데이트
window.updateModalInfo = function() {
  const select = document.getElementById('selectDest');
  const result = document.getElementById('modalResult');
  if (!select || !result) return;

  const val = select.value;
  if (val === 'gwacheon') {
    result.innerHTML = `
      <div style="line-height: 1.6; font-size: 0.95rem;">
        <h4 style="color: #ec4899; margin-bottom: 8px; font-weight: 800;">
          🌸 과천 캠퍼스 오시는 길 핵심 요약
        </h4>
        <ul style="padding-left: 20px; list-style-type: disc; margin-bottom: 12px; color: var(--text-body);">
          <li><strong>권장 경로:</strong> 지하철 4호선 <strong>정부과천청사역 6번 출구</strong> 전방 100m에서 <strong>무료 셔틀버스</strong> 탑승 (5분 소요)</li>
          <li><strong>셔틀 운행:</strong> 출근 시간(07:15~09:00 수시 운행), 퇴근 시간(18:00~ 집중 운행)</li>
          <li style="color: #f43f5e; font-weight: bold;">주의: 주차 공간이 협소하여 일반 교육생 자가용 진입이 통제됩니다.</li>
        </ul>
        <a href="#location" onclick="window.closeRouteModal(); switchCampusView('gwacheon');" style="color: #ec4899; font-weight: 800; text-decoration: underline;">
          상세 과천 오시는 길 확인하기 &rarr;
        </a>
      </div>
    `;
  } else {
    result.innerHTML = `
      <div style="line-height: 1.6; font-size: 0.95rem;">
        <h4 style="color: #3b82f6; margin-bottom: 8px; font-weight: 800;">
          🌳 진천 본원 오시는 길 핵심 요약
        </h4>
        <ul style="padding-left: 20px; list-style-type: disc; margin-bottom: 12px; color: var(--text-body);">
          <li><strong>시외버스:</strong> '충북혁신도시 버스터미널' 하차 후 도보 15분 또는 택시 3분 (동서울/남부터미널 약 1시간 30분)</li>
          <li><strong>KTX:</strong> '오송역' 하차 후 충북혁신도시행 시외버스/택시 환승</li>
          <li><strong>자가용:</strong> 중부고속도로 진천IC 또는 평택제천고속도로 금왕꽃동네IC (원내 넓은 주차 가능)</li>
        </ul>
        <a href="#location" onclick="window.closeRouteModal(); switchCampusView('jincheon');" style="color: #3b82f6; font-weight: 800; text-decoration: underline;">
          상세 진천 오시는 길 확인하기 &rarr;
        </a>
      </div>
    `;
  }
};
