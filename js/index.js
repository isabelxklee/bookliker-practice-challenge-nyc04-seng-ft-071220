document.addEventListener("DOMContentLoaded", function() {})
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")

fetch(booksURL)
.then(r => r.json())
.then((booksArr) => {
  booksArr.forEach((book) => {
    turnBookIntoLi(book)
  })
})

let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)
}

