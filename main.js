let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = prompt("Enter the title of the book:");
  const author = prompt("Enter the author of the book:");

  let pages;
  while (true) {
    const pagesInput = prompt("Enter the number of pages:");
    if (!isNaN(pagesInput) && pagesInput.trim() !== '') {
      pages = parseInt(pagesInput);
      break;
    } else {
      alert("Invalid input. Please enter a valid number of pages.");
    }
  }
  let read;
  while (true) {
    const readInput = prompt("Has the book been read? (Enter 'Yes' or 'No')").toLowerCase();
    if (readInput === 'yes') {
      read = true;
      break;
    } else if (readInput === 'no') {
      read = false;
      break;
    } else {
      alert("Invalid input. Please enter 'Yes' or 'No'.");
    }
  }

  const check = myLibrary.find(book=>book.title==title && book.author==author)
  if(check){
    alert("This book already exixts");
    return;
  }
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
  saveLibraryToLocalStorage();
  displayLibrary();
}

function removeBook() {
  const card = this.parentNode;
  const index = card.getAttribute("data-index");
  myLibrary.splice(index, 1);
  saveLibraryToLocalStorage();
  displayLibrary();
}

function toggleReadStatus() {
  const card = this.parentNode;
  const index = card.getAttribute("data-index");
  myLibrary[index].read = !myLibrary[index].read;
  saveLibraryToLocalStorage();
  displayLibrary();
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
  }
}

function displayLibrary() {
  // Get the container element for displaying books
  const libraryContainer = document.getElementById("library-container");

  // Clear the existing content
  libraryContainer.innerHTML = "";

  // Loop through the library array and create elements for each book
  myLibrary.forEach((book, index) => {
    // Create a card element for the book
    const card = document.createElement("div");
    card.classList.add("card");

    // Set the card's data-index attribute to the book's index
    card.setAttribute("data-index", index);

    // Create elements for book details (title, author, pages, read status)
    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;

    const readElement = document.createElement("p");
    readElement.textContent = book.read ? "Read" : "Not Read";

    // Create buttons for removing the book and changing read status
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-remove");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", removeBook);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("btn");
    toggleReadButton.classList.add("btn-toggle-read");
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.addEventListener("click", toggleReadStatus);

    // Append all elements to the card
    card.appendChild(titleElement);
    card.appendChild(authorElement);
    card.appendChild(pagesElement);
    card.appendChild(readElement);
    card.appendChild(removeButton);
    card.appendChild(toggleReadButton);

    // Append the card to the library container
    libraryContainer.appendChild(card);
  });
}

const addBookButton = document.getElementById("add-book-btn");
addBookButton.addEventListener("click", addBookToLibrary);

loadLibraryFromLocalStorage();
displayLibrary();
