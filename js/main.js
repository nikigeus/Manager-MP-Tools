(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  const grid = document.getElementById('toolsGrid');

  function starsMarkup(avg) {
    const full = Math.round(avg);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function renderTools() {
    grid.innerHTML = window.TOOLS.map(tool => {
      const { count, avg } = window.Reviews.stats(tool.id);
      const ratingBlock = count
        ? `<span class="stars" title="${avg.toFixed(1)} из 5">${starsMarkup(avg)}</span>
           <span class="rating-meta">${avg.toFixed(1)} · ${count} отзыв${count === 1 ? '' : count < 5 ? 'а' : 'ов'}</span>`
        : `<span class="rating-meta">Пока нет отзывов</span>`;

      return `
        <article class="tool-card">
          <div class="tool-icon">${tool.icon || '🧩'}</div>
          <h3>${escapeHtml(tool.title)}</h3>
          <p>${escapeHtml(tool.subtitle)}</p>
          <div class="tags">${(tool.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
          <div class="rating">${ratingBlock}</div>
          <a class="btn primary" href="tool.html?tool=${encodeURIComponent(tool.id)}" target="_blank" rel="noopener">
            Открыть инструмент →
          </a>
        </article>
      `;
    }).join('');
  }

  function renderRecentReviews() {
    const container = document.getElementById('recentReviews');
    const all = window.Reviews.all();
    const flat = [];
    for (const [toolId, list] of Object.entries(all)) {
      list.forEach(r => flat.push({ toolId, ...r }));
    }
    flat.sort((a, b) => b.ts - a.ts);
    const top = flat.slice(0, 6);

    if (!top.length) {
      container.innerHTML = `<p class="muted">Отзывов пока нет. Станьте первым!</p>`;
      return;
    }

    container.innerHTML = top.map(r => {
      const tool = window.TOOLS.find(t => t.id === r.toolId);
      const toolName = tool ? tool.title : r.toolId;
      const date = new Date(r.ts).toLocaleString('ru-RU');
      return `
        <div class="review-item">
          <div class="review-head">
            <strong>${escapeHtml(toolName)}</strong>
            <span class="stars small">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
          </div>
          ${r.comment ? `<p>${escapeHtml(r.comment)}</p>` : `<p class="muted">Без комментария</p>`}
          <small class="muted">${date}</small>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  renderTools();
  renderRecentReviews();

  // Обновим отзывы, если вернулись из другой вкладки
  window.addEventListener('storage', (e) => {
    if (e.key === 'toolbox_reviews_v1') {
      renderTools();
      renderRecentReviews();
    }
  });
})();
