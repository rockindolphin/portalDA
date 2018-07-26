### Установка
```
npm install
```
### Таски
```
gulp html - сборка html
gulp js - сборка js
gulp css - сборка css
gulp svg_sprites - сборка svg спрайта с иконками
gulp watch - следить за изменениями в src
gulp server - livereload сервер
gulp build - сборка проекта в dist
gulp - build + server + watch
```
### Структура
```

├── dist
├── src
│   ├── css
│   │   ├── bootstrap-4.1.2
│   │   ├── style
│   │   │   ├── blocks
│   │   │   ├── ...
│   │   │   ├── style.scss
│   │   ├── vendors
│   ├── favicon
│   ├── fonts
│   ├── images
│   │   ├── sprites
│   │   │   ├── svg
│   ├── js
│   │   ├── vendors
│   │   ├── app.js
│   ├── pug
│   │   ├── partials
│   │   ├── mixins
│   │   ├── index.pug
├── node_modules
├── gulpfile.js
├── README.md
├── package.json
└── .gitignore
```
style.scss - импортит все стили из blocks + некоторые части бутстрапа
css/vendors - стили js библиотек
images/sprites/svg - иконки для svg спрайта