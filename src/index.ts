import App from './components/app';
import './styles/main.scss';

const app: App = new App();
app.start();

console.log(`
Score for cross-check: 210/220
 - [X] - Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются [требования к вёрстке](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/online-store#verstka) (10/10)

- [X] - Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине (10/10)
- [X] - Карточки товаров добавляются динамически средствами JavaScript (на кросс-чеке этот пункт не проверяется) (0/0)

- [X] - Добавление товаров в корзину (20/20)
    - [X] - Кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных (10/10)
    - [X] - На странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" (10/10)

- [X] - Сортировка (20/20)
    - [X] -сортировка товаров по названию в возрастающем и убывающем порядке (10/10)
    - [X] -сортировка товаров по году их выхода на рынок в возрастающем и убывающем порядке (10/10)

- [X] - Фильтры в указанном диапазоне от и до (30/30)
    - [X] - фильтры по количеству (10/10)
    - [X] - фильтры по году выпуска на рынок (10/10)
    - [X] - для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка (10/10)

- [X] - Фильтры по значению (20/30)
    - [X] - выбранные фильтры выделяются стилем.
    - [X] - фильтры по производителю (5/5)
    - [X] - фильтры по цвету (5/5)
    - [ ] - фильтры по размеру (в случае с Демо - по количеству камер) (0/5)
    - [ ] - можно отобразить только популярные товары (0/5)
    - [X] - можно отфильтровать товары по нескольким фильтрам одного типа (10/10)
    
- [X] - Можно отфильтровать товары по нескольким фильтрам разного типа (20/20)
    - [X] - если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено"
   
- [X] -Сброс фильтров (20/20)
    - [X] -есть кнопка reset для сброса фильтров (10/10)
    - [X] - при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом (10/10)

- [X] - Сохранение настроек в local storage (30/30)
    - [X] - выбранные пользователем фильтры, порядок сортировки, добавленные в избранное товары сохраняются при перезагрузке страницы. (20/20)
    - [X] -Есть кнопка сброса настроек, которая очищает local storage (10/10)

- [X] - Поиск (30/30)
    - [X] - при открытии приложения курсор находится в поле поиска (2/2)
    - [X] - автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) (2/2)
    - [X] - есть placeholder (2/2)
    - [X] - в поле поиска есть крестик, позволяющий очистить поле поиска (2/2)
    - [X] - если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" (2/2)
    - [X] - при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается (10/10)
    - [X] - Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
    - [X] - если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки (10/10)`);