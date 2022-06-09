const STORAGE_KEY = "BOOKS_APPS";

let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Mohon maaf! Browser Anda tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(title, author, year, date, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        date,
        isComplete
    };
}

function findBook(bookId) {
    for (bookItem of books) {
        if (bookItem.id === bookId)
            return bookItem;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (bookItem of books) {
        if (bookItem.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const incompleteBookshelfList = document.getElementById(uncompleteReadBook);
    const completeBookshelfList = document.getElementById(completeReadBook);

    for (bookItem of books) {
        const newBook = makeBook(bookItem.title, `Penulis: ${bookItem.author}`, `Tahun: ${bookItem.year}`, `Tanggal: ${bookItem.date}`, bookItem.isComplete);
        newBook[BOOK_ITEM] = bookItem.id;

        if (bookItem.isComplete) {
            completeBookshelfList.append(newBook);
        } else {
            incompleteBookshelfList.append(newBook);
        }
    }
}