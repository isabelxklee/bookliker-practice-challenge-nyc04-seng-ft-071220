document.addEventListener("DOMContentLoaded", function() {})
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myUser = {"id": 1, "username": "pouros"}

fetch(booksURL)
.then(response => response.json())
.then((booksArr) => {
  booksArr.forEach((book) => {
    turnBookIntoLi(book)
  })
})

let checkExistingUser = (book) => {
  let existingUser = false

  if (book.users.length > 0) {
    book.users.forEach((user) => {
      if (user.username == myUser.username) {
        existingUser = true
      }
    })
  } else {
    existingUser = false
  }

  return existingUser
}

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

    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"

    let likersList = document.createElement("ul")
    likersList.id = "users-list"

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
        likeUser.id = user.username

        likersList.append(likeUser)
      })
    }
    
    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList, likeButton)

    let findUser = (user) => {
      return user.username !== myUser.username
    }

    likeButton.addEventListener("click", (event) => {
      if (!checkExistingUser(book)) {
        book.users.push(myUser)
      } else {
        book.users = book.users.filter(findUser)
      }

      fetch(`${booksURL}/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          users: book.users
        })
      })
      .then(response => response.json())
      .then((newBook) => {
        book.users = newBook.users
        updateLikersList(book.users)
      })
    })
  })
}

let updateLikersList = (users) => {
  let likersList = document.querySelector("ul#users-list")
  likersList.innerHTML = ""

  users.forEach((user) => {
    let likeUser = document.createElement("li")
    likeUser.innerText = user.username
    likeUser.id = user.username
    
    likersList.append(likeUser)
  })
}