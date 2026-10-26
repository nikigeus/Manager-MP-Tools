(function () {
  const params = new URLSearchParams(location.search);
  const toolId = params.get('tool');
  const tool = window.TOOLS ? window.TOOLS.find(t => t.id === toolId) : null;

  const $ = (s) => document.querySelector(s);
  const stages = {
    tool: $('#stageTool'),
    review: $('#stageReview'),
    thanks: $('#stageThanks')
  };

  if (!tool) {
    document.body.innerHTML = `
      <div style="padding:40px;font-family:sans-serif;text-align:center;color:white;background:#0f172a;height:100vh">
        <h1>Инструмент не найден</h1>
        <p>В адресе указан ID: <b>${toolId}</b></p>
        <p>Проверьте, правильно ли настроен файл js/tools.js</p>
        <p><a href="index.html" style="color:#a855f7">← На главную</a></p>
      </div>`;
    return;
  }

  document.title = `${tool.title} — Toolbox`;
  if ($('#toolTitle')) $('#toolTitle').textContent = tool.title;
  if ($('#toolFrame')) $('#toolFrame').src = tool.file;
  if ($('#reviewToolName')) $('#reviewToolName').textContent = tool.title;

  function show(name) {
    Object.entries(stages).forEach(([k, el]) => {
      if (el) el.classList.toggle('hidden', k !== name);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if ($('#finishBtn')) {
    $('#finishBtn').addEventListener('click', () => show('review'));
  }

  const starButtons = [...document.querySelectorAll('#starInput button')];
  const starsValue = $('#starsValue');
  const starsError = $('#starsError');

  function paintStars(value) {
    starButtons.forEach((b, i) => {
      b.classList.toggle('active', i < value);
    });
  }

  starButtons.forEach((btn, idx) => {
    btn.addEventListener('mouseenter', () => paintStars(idx + 1));
    btn.addEventListener('mouseleave', () => paintStars(Number(starsValue?.value) || 0));
    btn.addEventListener('click', () => {
      if(starsValue) starsValue.value = String(idx + 1);
      if(starsError) starsError.textContent = '';
      paintStars(idx + 1);
    });
  });

  const comment = $('#comment');
  const commentCount = $('#commentCount');
  if (comment) {
    comment.addEventListener('input', () => {
      if(commentCount) commentCount.textContent = String(comment.value.length);
    });
  }

  if ($('#reviewForm')) {
    $('#reviewForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const stars = Number(starsValue?.value);
      if (!stars || stars < 1 || stars > 5) {
        if(starsError) starsError.textContent = 'Поставьте оценку от 1 до 5 звёзд';
        return;
      }
      if(window.Reviews) {
          window.Reviews.add(tool.id, { stars, comment: comment ? comment.value : '' });
      }
      show('thanks');
      startCountdown();
    });
  }

  function startCountdown() {
    let left = 3;
    const el = $('#countdown');
    if (!el) return;
    el.textContent = String(left);
    const timer = setInterval(() => {
      left -= 1;
      el.textContent = String(left);
      if (left <= 0) {
        clearInterval(timer);
        window.location.href = 'index.html';
      }
    }, 1000);
  }
})();
