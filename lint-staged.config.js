module.exports = {
  '*.{ts,tsx}': ['npm run lint:js'],
  '*.scss': ['npm run lint:css'],
  '*.{ts,tsx,scss}': ['npm run lint:format', 'git add .'],
}

// TODO добавить линтинг имен коммитов
