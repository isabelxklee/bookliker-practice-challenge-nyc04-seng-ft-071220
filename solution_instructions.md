# Solution Instructions
## Table of contents
* [Getting started](#getting-started)
* [Challenge 1](#challenge-1)
* [Challenge 2](#challenge-2)
* [Challenge 3](#challenge-3)
* [BONUS: Challenge 4](#challenge-4)

<a name="getting-started"/>

## Getting started
* Copy the repo URL and run `git clone` in your terminal. `cd` into the new directory and run these commands.

```
npm install -g json-server
json-server db.json
```

* Open `http://localhost:3000/books` to see all the book instances.
* Open `http://localhost:3000/users` to see all the user instances.
* Run `open index.html` to see your app in the browser.
* Don't forget to refresh the browser every time you make a change in your code.
* Make a copy of `db.json` and save it as `original_db.json`. This is so that you can always refer back to the original database in case you mess up the database with incorrect PATCH requests.

<a name="challenge-1"/>

## Challenge 1
**Get a list of books (`http://localhost:3000/books`) and render them on to the page.**

If you take a look at the `index.html` file, you'll see that there are already some stable HTML elements in the `<body>` element. Since there is a `<ul>` element with `id="list"`, this is where we should render each of the book titles as an `<li>`. 

```html
<body>
  <div id="list-panel">
    <ul id="list">
    <!-- book list should go here! -->
    </ul>
  </div>
  <div id="show-panel"></div>
  <script type="text/javascript" src="./js/index.js"></script>
</body>
```

## Steps
#### 1. Inside `index.js`, create local variables that store the API URL and `<ul>`.

Example:
```javascript
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
```

#### 2. Create a fetch statement using the API URL.

Example:
```javascript
fetch(booksURL)
.then(response => response.json())
.then((booksArr) => {
  booksArr.forEach((book) => {
    // do something to each book instance here
  })
})
```

#### 3. Write a helper method that turns each book instance into an `<li>` element.

Example:
```javascript
let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)
}
```

#### 4. Invoke this helper method inside the second `.then` statement of the fetch request that you just wrote.

Example:
```javascript
fetch(booksURL)
.then(response => response.json())
.then((booksArr) => {
  booksArr.forEach((book) => {
    // here's our new helper method!
    turnBookIntoLi(book)
  })
})
```

<a name="challenge-2"/>

## Challenge 2
**Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.**

Let's look at the `index.html` file again. You'll see that there's already a `<div>` element with `id="show-panel"`. This is where we should render the selected book's information. 

```html
<body>
  <div id="list-panel">
    <ul id="list">
    <!-- book list should go here! -->
    </ul>
  </div>
  <div id="show-panel"><!-- show the book's information here! --></div>
  <script type="text/javascript" src="./js/index.js"></script>
</body>
```

## Steps
#### 1. Create a local variable to store the `<div id="show-panel">`.

```javascript
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
```

#### 2. Create a click event listener for each `<li>` element. Make sure this code is in the same function as the part where you created the `<li>` elements for each book.

```javascript
let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)

  // here's our event listener
  bookLi.addEventListener("click", (event) => {
    // create the new HTML elements in here
  })
}
```

#### 3. Create HTML elements for the selected book's information, such as its image, title, author, subtitle, and description. For the list of users who've liked this book, create a new `<ul>` element and add each user as a `<li>` element. Append all the new HTML elements to the `<div id="show-panel">`.

```javascript
let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)

  bookLi.addEventListener("click", (event) => {
    // here's where we creating all of our fancy new HTML elements!
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
    likersList.id = "users-list"

    // this if statement checks if there are any existing users who already like the book. if there aren't any users, it doesn't create any <li> elements
    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
        likeUser.id = user.username

        // don't forget to append the new <li> elements to the list of users!
        likersList.append(likeUser)
      })
    }

    // this adds all of our new HTML elements to the book's show panel
    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList)
  })
}
```

#### 4. If you want to show only one book at a time, clear the `<div>` of all content each time you click on a book in the `<ul>`. Make sure this is the first line inside the bookLi event listener, so that the new HTML elements can be created on a blank canvas.

```javascript
let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)

  bookLi.addEventListener("click", (event) => {
    // this clears the show panel of any existing HTML elements
    showPanel.innerHTML = ""

    let bookTitle = document.createElement("h1")
    bookTitle.innerText = book.title

    ...

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
        likeUser.id = user.username

        likersList.append(likeUser)
      })
    }

    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList)
  })
}
```

<a name="challenge-3"/>

## Challenge 3
**You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book.** 

This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"maverick"}]`, you should send as the body of your PATCH request:

```javascript
{
  "users": [
    {"id":2, "username":"auer"},
    {"id":8, "username":"maverick"},
    {"id":1, "username":"pouros"}
  ]
}
```

## Steps
#### 1. Since we already have the information for user 1, let's store it as a local variable with the other stable variables at the top of `index.js`.

```javascript
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")

// this is our new user variable
const myUser = {"id": 1, "username": "pouros"}
```

#### 2. Inside the helper method where we turn each book instance into an `<li>` element, create a like button. Then add a click event listener to it.

```javascript
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
    likersList.id = "users-list"

    // here's where the new like button is being created
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
        likeUser.id = user.username

        likersList.append(likeUser)
      })
    }

    // don't forget to append the new like button to the show panel!
    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList, likeButton)

    // here's the event listener for the like button
    likeButton.addEventListener("click", (event) => {
      // do something here
    })
  })
}
```

#### 3. Write a fetch statement and two `.then` statements inside the like button's event listener.

```javascript
likeButton.addEventListener("click", (event) => {
  // here's the skeleton for the fetch statement and the two then statements that follow it
  fetch()
  .then()
  .then()
})
```

#### 4. Push the myUser instance into the book's users array before the fetch statement.

```javascript
likeButton.addEventListener("click", (event) => {
  // here's where we're pushing our user instance into the book's users array
  book.users.push(myUser)

  fetch()
  .then()
  .then()
})
```

#### 5. Add the API URL with the book's id interpolated into the URL, the method, headers, and body to the fetch request.

```javascript
likeButton.addEventListener("click", (event) => {
  book.users.push(myUser)

  fetch(`${booksURL}/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      // remember that we've already added our user to the book's users array from the previous step
      users: book.users
    })
  })
  .then()
  .then()
})
```

#### 6. Fill out the first `.then` statement. Turn the response into a JSON object.

```javascript
likeButton.addEventListener("click", (event) => {
  let usersArray = book.users.push(myUser)

  fetch(`${booksURL}/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      users: usersArray
    })
  })
  .then(response => response.json())
  .then()
})
```

#### 7. Fill out the second `.then` statement. Reassign `book.users` to have the same value as the updated book's users array. Create a new `<li>` element for myUser and append it to the list of users who've liked the book.

Remember that we have to update 3 things: the backend (the data stored in our `db.json` file), the object in memory (the JSON object), and the DOM (what you see in the browser).

**To summarize:** the PATCH request is updating the backend, `book.users = updatedBook.users` inside the second `.then` statement is updating the object in memory, and `let newUserLi = document.createElement("li")` is updating the DOM.

```javascript
likeButton.addEventListener("click", (event) => {    
  book.users.push(myUser)

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
  .then((updatedBook) => {
    book.users = updatedBook.users
    let newUserLi = document.createElement("li")
    newUserLi.innerText = myUser.username
    likersList.append(newUserLi)
  })
})
```

Et voilà! That is how you solve all the core deliverables for this lab. 🌟 You can keep reading if you're interested in tackling the bonus challenge.

<a name="challenge-4"/>

## BONUS: Challenge 4
**Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?**

Since we are going to be doing some major refactoring for this bonus challenge, please refer to `bonus_index.js` for the solution code.

## Steps
#### 1. Inside `index.js`, create local variables that store the API URL and `<ul>`.