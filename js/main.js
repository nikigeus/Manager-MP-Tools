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
      
      // Проверяем, является ли инструмент скачиваемым файлом
      const isDownload = tool.action === 'download';
      
      // Если да, ссылка ведет прямо на файл. Если нет — на страницу инструмента.
      const linkUrl = isDownload ? tool.file : `tool.html?tool=${encodeURIComponent(tool.id)}`;
      
      // Меняем текст кнопки в зависимости от типа
      const btnText = isDownload ? 'Скачать файл ⬇️' : 'Открыть инструмент →';

      return `
        <article class="tool-card">
          <div class="tool-icon">${tool.icon || '🧩'}</div>
          <h3>${escapeHtml(tool.title)}</h3>
          <p>${escapeHtml(tool.subtitle)}</p>
          <div class="tags">${(tool.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
          
          <!-- Ссылка на инструмент. Открывается в новой вкладке -->
          <a class="btn primary" href="${linkUrl}" target="_blank" rel="noopener">
            ${btnText}
          </a>
        </article>
      `;
    }).join('');
  }

  // Запускаем отрисовку
  renderTools();
})();
