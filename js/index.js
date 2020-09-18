document.addEventListener("DOMContentLoaded", function() {})
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myUser = {"id": 1, "username": "pouros"}
let existingUser = false

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

    let usersArray = []

    let checkUsername = (user) => {
      user.username !== myUser.username
    }

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        if (user.username == myUser.username) {
          existingUser = true
          usersArray = book.users.filter(checkUsername)
        } else {
          existingUser = false
          usersArray = [...book.users, myUser]
        }
      })
    } else {
      usersArray = [myUser]
    }

    likeButton.addEventListener("click", (event) => {

      if (existingUser == false) {
        fetch(`${booksURL}/${book.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            users: usersArray
          })
        })
        .then(r => r.json())
        .then(() => {
          book.users = usersArray
          addUser()
        })
      } else {
        fetch(`${booksURL}/${book.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            users: usersArray
          })
        })
        .then(r => r.json())
        .then(() => {
          book.users = usersArray
          removeUser()
        })
      }
    })
  })
}

let removeUser = () => {
  let likersList = document.querySelector("ul#users-list")
  let removedUser = document.querySelector(`li#${myUser.username}`)
  likersList.removeChild(removedUser)
}

let addUser = () => {
  let likersList = document.querySelector("ul#users-list")
  let newUserLi = document.createElement("li")
  newUserLi.innerText = myUser.username
  likersList.append(newUserLi)
}