(() => {
    const DELAY_MS = 5000;       // показать через 5 сек
    const AUTOCLOSE_MS = 15000;  // автозакрыть через 15 сек
    const SS_KEY = 'toastSeen';
  
    if (sessionStorage.getItem(SS_KEY)) return;
  
    const css = `
    .toast-wrap{position:fixed;z-index:100000;display:none}
    .toast{max-width:340px;background:#fff;color:#3b2a1f;
           border:1px solid rgba(0,0,0,.08);border-radius:12px;
           box-shadow:0 12px 32px rgba(0,0,0,.18);
           padding:12px 14px;display:flex;gap:10px;align-items:flex-start}
    .toast-dot{width:10px;height:10px;border-radius:50%;background:#f2c341;
               margin-top:6px;flex:0 0 10px}
    .toast-text{font:600 14px/1.4 "Poppins",sans-serif}
    .toast-close{margin-left:8px;border:0;background:transparent;cursor:pointer;
                 width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#694;
                 transition:background .15s ease}
    .toast-close:hover{background:rgba(0,0,0,.06)}
    .toast-enter{animation:toastIn .18s ease forwards}
    .toast-leave{animation:toastOut .15s ease forwards}
    @keyframes toastIn{from{transform:translateY(8px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes toastOut{from{transform:translateY(0);opacity:1}to{transform:translateY(8px);opacity:0}}
    /* Десктоп */
    @media (min-width:721px){
      .toast-wrap{left:16px;bottom:16px}
    }
    /* Мобилка */
    @media (max-width:720px){
      .toast-wrap{top:16px;left:50%;transform:translateX(-50%);width:calc(100% - 20px)}
      .toast{max-width:100%}
    }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  
    const wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    wrap.innerHTML = `
      <div class="toast toast-enter" role="status" aria-live="polite">
        <div class="toast-dot" aria-hidden="true"></div>
        <div class="toast-text">Напишите сейчас и получите скидку до 10% на все туры</div>
        <button class="toast-close" aria-label="Закрыть уведомление">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(wrap);
  
    let tm;
    const open = () => {
      wrap.style.display = 'block';
      sessionStorage.setItem(SS_KEY, '1');
      tm = setTimeout(close, AUTOCLOSE_MS);
    };
    const close = () => {
      const toast = wrap.firstElementChild;
      if (!toast) return;
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-leave');
      clearTimeout(tm);
      setTimeout(() => wrap.remove(), 150);
    };
  
    wrap.addEventListener('click', (e) => {
      if (e.target.closest('.toast-close')) close();
    });
  
    setTimeout(open, DELAY_MS);
  })();
  