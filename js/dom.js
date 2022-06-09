const uncompleteReadBook = "incompleteBookshelfList";
const completeReadBook = "completeBookshelfList";
const BOOK_ITEM = "itemBook";

function makeBook(title, author, year, date, isComplete) {
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const bookDate = document.createElement("p");
    bookDate.innerText = date;

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");
    if (isComplete) {
        bookAction.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        bookAction.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookTitle, bookAuthor, bookYear, bookDate, bookAction);

    return container;
}

function createUndoButton() {
    return createButton("green", "Belum selesai dibaca", function (event) {
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", "Hapus buku", function (event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function createCheckButton() {
    return createButton("green", "Selesai dibaca", function (event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function addBook() {
    const incompleteBookshelfList = document.getElementById(uncompleteReadBook);
    const completeBookshelfList = document.getElementById(completeReadBook);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookDate = document.getElementById("inputBookDate").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(bookTitle, `Penulis: ${bookAuthor}`, `Tahun: ${bookYear}`, `Tanggal: ${bookDate}`, isComplete);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookDate, isComplete);

    book[BOOK_ITEM] = bookObject.id;
    books.push(bookObject);

    if (isComplete) {
        completeBookshelfList.append(book);
    } else {
        incompleteBookshelfList.append(book);
    }
    updateDataToStorage();
}

function addBookToCompleted(bookElement) {
    const completeBookshelfList = document.getElementById(completeReadBook);
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
    const bookYear = bookElement.querySelectorAll("p")[1].innerText;
    const bookDate = bookElement.querySelectorAll("p")[2].innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, bookDate, true);
    const book = findBook(bookElement[BOOK_ITEM]);
    book.isComplete = true;
    newBook[BOOK_ITEM] = book.id;

    completeBookshelfList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBook(bookElement) {
    const isDelete = window.confirm("Apakah yakin ingin menghapus buku ini?");
    if (isDelete) {
        const bookPosition = findBookIndex(bookElement[BOOK_ITEM]);
        books.splice(bookPosition, 1);

        bookElement.remove();
        updateDataToStorage();
        alert("Buku berhasil dihapus");
    } else {
        alert("Buku gagal dihapus");
    }
}

function undoBookFromCompleted(bookElement) {
    const incompleteBookshelfList = document.getElementById(uncompleteReadBook);
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
    const bookYear = bookElement.querySelectorAll("p")[1].innerText;
    const bookDate = bookElement.querySelectorAll("p")[2].innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, bookDate, false);

    const book = findBook(bookElement[BOOK_ITEM]);
    book.isComplete = false;
    newBook[BOOK_ITEM] = book.id;

    incompleteBookshelfList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function searchBook() {
    const searchBook = document.getElementById("searchBookTitle");
    const filter = searchBook.value.toUpperCase();
    const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
    for (let i = 0; i < bookItem.length; i++) {
        txtValue = bookItem[i].textContent || bookItem[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            bookItem[i].style.display = "";
        } else {
            bookItem[i].style.display = "none";
        }
    }
}

function checkButton() {
    const span = document.querySelector("span");
    if (inputBookIsComplete.checked) {
        span.innerText = "Selesai dibaca";
    } else {
        span.innerText = "Belum selesai dibaca";
    }
}