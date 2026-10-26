const REVIEWS_KEY = 'toolbox_reviews_v1';

window.Reviews = {
  all() {
    try {
      return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  },

  forTool(toolId) {
    const all = this.all();
    return Array.isArray(all[toolId]) ? all[toolId] : [];
  },

  add(toolId, { stars, comment }) {
    if (!toolId) throw new Error('toolId required');
    const rating = Math.max(1, Math.min(5, Number(stars) || 0));
    const text = String(comment || '').trim().slice(0, 1000);
    const all = this.all();
    if (!Array.isArray(all[toolId])) all[toolId] = [];
    all[toolId].unshift({
      stars: rating,
      comment: text,
      ts: Date.now()
    });
    // Ограничим историю 50 отзывами на инструмент
    all[toolId] = all[toolId].slice(0, 50);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
    return true;
  },

  stats(toolId) {
    const list = this.forTool(toolId);
    if (!list.length) return { count: 0, avg: 0 };
    const sum = list.reduce((s, r) => s + r.stars, 0);
    return { count: list.length, avg: sum / list.length };
  }
};
