// Единый реестр. Добавляйте сюда новые инструменты.
window.TOOLS = [
  {
    id: 'html-live-editor',
    title: 'HTML редактор текста',
    subtitle: 'Двусторонний редактор HTML с живым превью',
    icon: '⚡',
    file: 'tools/html-live-editor.html',
    tags: ['HTML', 'Редактор', 'Превью']
  },
  {
    id: 'text-fixer',
    title: 'Редактор раскладки',
    subtitle: 'Исправление раскладки клавиатуры и транслита',
    icon: '⌨️',
    file: 'tools/text-fixer.html',
    tags: ['Текст', 'Раскладка', 'Транслит']
  },
  {
    id: 'photo-preview',
    title: 'Фото на разных устройствах',
    subtitle: 'Предпросмотр фото товара на разных устройствах',
    icon: '🖼️',
    file: 'tools/photo-preview.html',
    tags: ['Фото', 'Маркетплейсы', 'Превью']
  },
  {
    id: 'promptforge',
    title: 'Генератор промптов для ИИ',
    subtitle: 'Конструктор промптов для карточек товаров',
    icon: '🛠️',
    file: 'tools/promptforge.html',
    tags: ['Промпты', 'Маркетплейсы', 'AI']
  },
  {
    id: 'methodology', // <--- Исправлено: латиница, без пробелов
    title: 'Методичка: Карточка товара',
    subtitle: 'Полное руководство по созданию продающих карточек (PDF)',
    icon: '📚',
    file: 'tools/methodology_guide.pdf',
    action: 'download', 
    tags: ['Маркетплейсы', 'Гайд', 'PDF']
  }
];
