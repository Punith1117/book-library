function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.combine = function() {
    return (this.title + ' written by ' + this.author + ' has ' + this.pages + ' pages');
}

let books = [];
let gridContainer = document.querySelector('.grid-container');
let addButton = document.querySelector('.add');
const book1 = new Book('Wrong Side of the Bed', 'Poojitha Prasad', 256, true);
addBook(book1);
const book2 = new Book('Dune', 'Frank Herbert', 412, false);
addBook(book2);
console.log(books);
displayBooks();
console.log(book1.combine());
console.log(book2.combine());

let addBookDialog = document.querySelector('.add-book-dialog');
addButton.addEventListener('click', () => {
    addBookDialog.showModal();
})

let addBookForm = document.querySelector('.add-book-form');

let cancelAddBook = document.querySelector('.cancel');
cancelAddBook.addEventListener('click', () => {
    addBookDialog.close();
    console.log('closed');
})

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    let formData = new FormData(addBookForm);
    let newTitle = formData.get('input-title');
    let newAuthor = formData.get('input-author');
    let newPages = formData.get('input-pages');
    let newRead = formData.get('read');
    if (newRead == 'on') {
        newRead = true;
    } else {
        newRead = false;
    }

    console.log(newTitle,
        newAuthor,
        newPages,
        newRead
    );

    let newBook = new Book(newTitle, newAuthor, newPages, newRead);
    addBook(newBook);
    displayBooks();
    addBookDialog.close();
    console.log('submitted');
}) 

function handleRead() {
    let readButtons =  document.querySelectorAll('.read');

    readButtons.forEach(readButton => {
        readButton.addEventListener('click', () => {
            let readValue = readButton.dataset.bookIndex;
            console.log(readButton);
            if (readButton.classList.contains('read-true')) {
                books[readValue].read = false;
            } else {
                books[readValue].read = true;
            }
            displayBooks();
        });
    });
    
}

function deleteBookButtons() {
    let deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            confirmDeleteDialog(deleteButton.dataset.bookIndex);
            console.log(deleteButton.dataset.bookIndex);
        })
    })
}

function confirmDeleteDialog(deleteBookIndex) {
    let deleteDialog = document.querySelector('.delete-book-dialog');
    deleteDialog.innerHTML = '';

    let deleteForm = document.createElement('form');
    deleteForm.innerHTML = '';
    deleteForm.setAttribute('method', 'dialog');
    deleteForm.classList.add('delete-book-form');

    let confirmDeleteText = document.createElement('div');
    confirmDeleteText.classList.add('confirm-delete-text');
    confirmDeleteText.textContent = `Are you sure to delete ${books[deleteBookIndex].title}?`;
    deleteForm.appendChild(confirmDeleteText);
    deleteDialog.showModal();
    let cancelDelete = document.createElement('button');
    cancelDelete.classList.add('cancel-delete-book');
    cancelDelete.textContent = 'cancel';
    cancelDelete.type = 'button';
    let deleteConfirm = document.createElement('button');
    deleteConfirm.type = 'submit';
    deleteConfirm.classList.add('confirm-delete-book');
    deleteConfirm.textContent = 'delete';
    deleteForm.appendChild(cancelDelete);
    deleteForm.appendChild(deleteConfirm);
    
    deleteDialog.append(deleteForm);
    cancelDelete.addEventListener('click', () => {
        deleteDialog.close();
        displayBooks();
    })
    
    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(deleteBookIndex);
        let bookRemoved = books.splice(deleteBookIndex, 1);
        console.log('Book removed: ' + bookRemoved[0].title);
        deleteDialog.close();
        displayBooks();
    });


}
function displayBooks() {
    gridContainer.innerHTML = ''; //clearing the previous books
    gridContainer.appendChild(addButton);
    books.forEach((bookToDisplay, index) => {
        let bookContainer = document.createElement('div');
        bookContainer.className = 'book-container';
        let book = document.createElement('div');
        book.className = 'book';

        let title = document.createElement('div');
        title.textContent = bookToDisplay.title;
        title.className = 'title';
        book.appendChild(title);

        let author = document.createElement('div');
        author.textContent = `~${bookToDisplay.author}`;
        author.className = 'author';
        book.appendChild(author);

        let pages = document.createElement('div');
        pages.textContent = `${bookToDisplay.pages} pages`;
        pages.className = 'pages';
        book.appendChild(pages);

        let read_delete = document.createElement('div');
        read_delete.className = 'read-delete';

        let read = document.createElement('button');
        read.className = 'read';
        if (bookToDisplay.read == true) {
            read.textContent = 'read';
            read.classList.add('read-true');
            read.classList.remove('read-false');
        } else {
            read.textContent = 'unread';
            read.classList.add('read-false');
            read.classList.remove('read-true');
        }
        read.setAttribute('data-book-index', index);
        read_delete.appendChild(read);

        let delete_button = document.createElement('button');
        delete_button.className = 'delete';
        delete_button.setAttribute('data-book-index', index);
        
        read_delete.appendChild(delete_button);

        bookContainer.appendChild(read_delete);

        bookContainer.appendChild(book);
        let bookSupport = document.createElement('div');
        bookSupport.className = 'book-support';
        bookContainer.appendChild(bookSupport);
        gridContainer.appendChild(bookContainer);
    });
    handleRead();
    deleteBookButtons();
}

function addBook(book) {
    books.push(book);
}
