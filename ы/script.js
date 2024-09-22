document.getElementById('search-form').addEventListener('submit', function(event) { //находим элемент по ID
    //event listener - функция которая выполняет код по происшествии какого-то события по типу нажатии на мышь
    event.preventDefault(); //не дает браущеру перезагрузить страницу чтобы появились результаты

    const searchthingy = document.querySelector('.search').value; //берем значение из поиска-ввода
    const link = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchthingy)}`; //ссылка которую надо будет достать

    fetch(link) //достаем ссылку
        .then(response => {
            return response.json(); //ответ сервера, если данные не типа джейсона то джава будет капризным
        })
        .then(data => {
            displayResults(data.items); //айтемс это массив, в частности книг который присылает нам сайт и мы его показываем 
        })
        .catch(error => console.error('ашибка:', error)); //при нахождении ошибки оповещаем пользователя
        alert ('Либо инет не работает, либо сайт сдох. Это ошибка и обычно ее тут не должно. НО раз уж я тут, то как ваши дела?');
});
//в переменных константы потому что значения не изменяются и типо все так делают я не лысый
function displayResults(books) {
    const resultsDiv = document.getElementById('results');//находим резы поиска
    resultsDiv.innerHTML = ''; //очистка предыдущих результатов если вы не хотите наложения друг на друга или бесконечного списка

    if (!books || books.length === 0) { // проверка на наличие
        resultsDiv.innerHTML = '<p>Книги не найдены Измените свой запрос.</p>';//абзац, отделен от ост. текста
        return;//присылает текст смотрителю
    }
//для каждой книги создаем свою строку текста
    books.forEach(book => {
        const bookDiv = document.createElement('div'); //создания строки книги типа div - bookDiv
        bookDiv.classList.add('book'); //dobavlyaet class book k spisky Div-a, chtoby primenit' CSS дизайн
//если нет названия у искомых элементов то выводим, что такого не нашлось а если картинку то пофиг
        const title = book.volumeInfo.title || 'Нет названия'; 
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестный автор'; //вопросики для проверки существования как в булеан
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''; //сверху в скобках запятая потому что функция должна соединять куски массива ограничивая их запятой и пробелом, но текста у нас в данном случае нет, поэтому просто лепим туда нет автора
//иннер эйчтиэмэл позволяет джаве внутри эйтиэмэл работать. Прикольно, да?
        bookDiv.innerHTML = ` 
            <h2>${title}</h2>
            <p>Автор(ы): ${authors}</p>
            ${thumbnail ? `<img src="${thumbnail}" alt="${title} обложка">` : ''}
            <button class="buy-button" data-url="https://docs.google.com/forms/d/e/1FAIpQLScVISFeEc_TxCk30ngBgHRXrawBQM_sttGS_Y3WEzVF6l07LQ/viewform?usp=sf_link">Купить книгу тут</button>
        `; // сверху ссылка на сайт с формой внутри кнопки
        // вопросительный знак проверяет существование как bool
        //бакс и квадратные скобки позваляют нам внутри текста вставить значение переменной без использования конкатинации - плюсования, у меня кстати из-за нее сайт немного поломался и теперь каждый раз при поиске выдает пустую ошибку
        resultsDiv.appendChild(bookDiv); //добавление в конец списка родителя дочернего элемента - строку книг к результатам
    });
    //обработчик событий для 'купить'-кнопок типа класс buy-button, прикольно же, да?
    const buyButtons = document.querySelectorAll('.buy-button');//возвращает статический список о всех кнопках купить
    buyButtons.forEach(button => { //для каждой из таких кнопок, это ясно
        button.addEventListener('click', function() { //ну тут снова, по клику код
            const ssylka2 = this.getAttribute('data-url'); // изымаем ссылку сайта из атрибута data-url
            window.location.href = ssylka2; //уводим пользователя на сайт
        });
    });
}
