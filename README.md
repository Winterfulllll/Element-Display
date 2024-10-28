# RepoSearcher 🔎

## Описание 💡

Сервис поиска репозиториев на базе [GitHub Rest API](https://docs.github.com/en/rest)

### Технологический стек ⚙️

- [Vite](https://vite.dev/) + [React](https://react.dev/) + [TS](https://www.typescriptlang.org/)
- **State-manager:** [MobX](https://mobx.js.org)
- **React UI Component Library:** [Material UI](https://mui.com/)
- **Testing:** [Jest](https://jestjs.io) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Реализованные фичи ✨

- [x] Поиск репозиториев с плавной прогрузкой данных
- [x] Сортировка по трём критериям в определенном порядке
- [x] Локальное редактирование и удаление полученных от API данных
- [ ] Тестирование unit-тестами

### Возможные улучшения 🧠

- [ ] Темы (_тёмная/светлая_)
- [ ] Расширение параметров для поиска (подробнее [_здесь_](https://docs.github.com/en/search-github/searching-on-github/searching-code))
- [ ] Добавить OAuth для увеличения количества запросов

## Техническое задание ✅

Необходимо получить с сервера и отобразить список элементов. Список должен поддерживать бесконечный плавный скролл, постепенную подгрузку элементов, локальное удаление и редактирование.

### Требования 🎯

- **Обязательно использование:** TS, React/MobX, CSS-модули, Webpack/Vite, Jest, React Testing Library;
- **API:** Для получения списка нужно использовать публичный API какого-либо сервиса: github api, npmjs api, imdb api и др. Важно, чтобы список данных был очень большим с возможностью пагинации. Например:

  ```
  $ curl "https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=2"
  ```

- **Аутентификация:** Добавить аутентификацию, если требует API;
- **Работа с API:** Работать с API можно через библиотеку, либо делать запросы напрямую;
- **Механика отображения:** Механику отображения и работу со списком необходимо написать самостоятельно. Нельзя использовать готовую библиотеку;
- **Локальное редактирование:** Нужна возможность редактировать и удалять элементы из списка локально (работа со стором);
- **Дизайн:** Требований к дизайну нет. Для отображения списка необходимо использовать любой UI Kit/Framework, например Ant Design. Обосновать свой выбор.
- **Тестирование:** Функциональность покрыть unit-тестами на Jest + React Testing Library.

#### Желательно 😎

- **Сортировка:** Поддержать сортировку списка по разным полям, если поддерживает API;
- **Индикация загрузки:** Добавить индикацию подгрузки данных.

## Вывод 🤔

Скоро будет...
