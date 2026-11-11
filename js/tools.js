// Единый реестр. Добавляйте сюда новые инструменты.
window.TOOLS = [
  {
    id: 'HTML конвертор текста',
    title: 'HTML Live Editor',
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
    id: 'Генератор промптов для ИИ',
    title: 'PromptForge',
    subtitle: 'Конструктор промптов для карточек товаров',
    icon: '🛠️',
    file: 'tools/promptforge.html',
    tags: ['Промпты', 'Маркетплейсы', 'AI']
  },
  {
  id: 'Методическое пособие по карточке товара',
  title: 'Методичка: Карточка товара',
  subtitle: 'Полное руководство по созданию продающих карточек (PDF)',
  icon: '📚',
  file: 'tools/methodology_guide.pdf',
  action: 'download', // <--- Это новая команда: "Скачать, а не открывать"
  tags: ['Маркетплейсы', 'Гайд', 'PDF']
}
];
