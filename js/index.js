document.addEventListener("DOMContentLoaded", function() {})
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")

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

  bookLi.addEventListener("click", (event) => {
    console.log(event.target)

    let bookTitle = document.createElement("h1")
    bookTitle.innerText = book.title

    let bookSubtitle = document.createElement("h2")
    bookSubtitle.innerText = book.subtitle

    let bookDescription = document.createElement("p")
    bookDescription.innerText = book.description

    let bookAuthor = document.createElement("p")
    bookAuthor.innerText = book.author

    let bookImage = document.createElement("img")
    bookImage.src = book.img_url
    
    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription)
  })
}