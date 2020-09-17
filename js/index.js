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
    showPanel.innerHTML = ""

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

    let likersList = document.createElement("ul")

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
  
        likersList.append(likeUser)
      })
    }
    
    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList)
  })
}