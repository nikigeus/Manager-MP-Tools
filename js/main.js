(function () {
  // Устанавливаем текущий год в подвале сайта
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById('toolsGrid');

  // Функция для безопасного вывода текста (защита от HTML-инъекций)
  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // Отрисовка карточек инструментов
  function renderTools() {
    if (!grid) return;
    
    // window.TOOLS берется из файла js/tools.js
    grid.innerHTML = window.TOOLS.map(tool => {
      return `
        <article class="tool-card">
          <div class="tool-icon">${tool.icon || '🧩'}</div>
          <h3>${escapeHtml(tool.title)}</h3>
          <p>${escapeHtml(tool.subtitle)}</p>
          <div class="tags">${(tool.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
          
          <!-- Ссылка на инструмент. Открывается в новой вкладке -->
          <a class="btn primary" href="tool.html?tool=${encodeURIComponent(tool.id)}" target="_blank" rel="noopener">
            Открыть инструмент →
          </a>
        </article>
      `;
    }).join('');
  }

  // Запускаем отрисовку
  renderTools();
})();
