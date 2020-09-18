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
const dogsUrl = `http://localhost:3000/dogs`
const dogsList = document.querySelector("ol#dogs-list")
```

#### 2. Create a fetch statement using the API URL.

Example:
```javascript
fetch(dogsUrl)
.then(response => response.json())
.then((dogsArray) => {
  dogsArray.forEach((dog) => {
    // do something to each dog instance
  })
})
```

#### 3. Write a helper method that turns each book instance into an `<li>` element.

Example:
```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)
}
```

#### 4. Invoke this helper method inside the second `.then` statement.

Example:
```javascript
fetch(dogsUrl)
.then(response => response.json())
.then((dogsArray) => {
  dogsArray.forEach((dog) => {
    // do something to each dog instance
    turnDogIntoLi(dog)
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
const dogProfile = document.querySelector("div#show-dog")
```

#### 2. Create a click event listener for each `<li>` element. Make sure this code is in the same function as the part where you created the `<li>` elements for each book.

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    // create the new HTML elements in here
  })
}
```

#### 3. Create HTML elements for the selected book's image, description, and users. Append the new HTML elements to the `<div>`.

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    let dogName = document.createElement("h1")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("p")
    dogBreed.innerText = dog.breed

    let dogImage = document.createElement("img")
    dogImage.src = dog.img_url

    dogProfile.append(dogName, dogBreed, dogImage)
  })
}
```

#### 4. If you want to show only one book at a time, clear the `<div>` of all content each time you click on a book in the `<ul>`.

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    // this line will set the <div> to be empty before you create the new HTML elements
    dogProfile.innerHTML = ""

    let dogName = document.createElement("h1")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("p")
    dogBreed.innerText = dog.breed

    let dogImage = document.createElement("img")
    dogImage.src = dog.img_url

    dogProfile.append(dogName, dogBreed, dogImage)
  })
}
```

If you want to write less lines of code, you can use `innerHTML` (but it's less secure):

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    dogProfile.innerHTML = `
      <h1>${dog.name}</h1>
      <p>${dog.breed}</p>
      <img src=${dog.img_url}>
    `
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
const dogsUrl = `http://localhost:3000/dogs`
const dogsList = document.querySelector("ol#dogs-list")
// this is our new user variable
const myUser = {"id":1, "username":"pouros"}
```

#### 2. Inside the helper method where we turn each book instance into an `<li>` element, create a like button. Then add a click event listener to it.

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    dogProfile.innerHTML = ""

    let dogName = document.createElement("h1")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("p")
    dogBreed.innerText = dog.breed

    let dogImage = document.createElement("img")
    dogImage.src = dog.img_url

    // here's where we create the like button 
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"

    // don't forget to append it to the parent element!
    dogProfile.append(dogName, dogBreed, dogImage, likeButton)

    likeButton.addEventListener("click", (event) => {
      // do something here
    })
  })
}
```

#### 3. Write a fetch statement and two `.then` statements inside the like button's event listener.

```javascript
let turnDogIntoLi = (dog) => {
  let dogLi = document.createElement("li")
  dogLi.innerText = dog.name
  dogsList.append(dogLi)

  dogLi.addEventListener("click", (event) => {
    dogProfile.innerHTML = ""

    let dogName = document.createElement("h1")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("p")
    dogBreed.innerText = dog.breed

    let dogImage = document.createElement("img")
    dogImage.src = dog.img_url

    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"

    dogProfile.append(dogName, dogBreed, dogImage, likeButton)

    likeButton.addEventListener("click", (event) => {
      // here's the skeleton for the fetch statement and the two then statements that follow it
      fetch()
      .then()
      .then()
    })
  })
}
```

#### 4. Since we don't want to mutate the existing user's array for each book, let's use the spread operator to create a new array with user 1 added in at the end. Make sure this method is inside the book `<li>`'s event listener, but before the click event listener for the like button.

```javascript
dogLi.addEventListener("click", (event) => {
  
  ...

  let usersArray = [...dog.users, myUser]

  likeButton.addEventListener("click", (event) => {
    fetch()
    .then()
    .then()
  })
})
```

#### 5. Add the API URL, method, headers, and body to the fetch request.

```javascript
likeButton.addEventListener("click", (event) => {
  fetch(`${dogsUrl}/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      // remember that usersArray already contains user 1 from the previous step
      users: usersArray
    })
  })
  .then()
  .then()
})
```

#### 6. Fill out the first `.then` statement. Turn the response into a JSON object.

```javascript
likeButton.addEventListener("click", (event) => {
  fetch(`${dogsUrl}/${dog.id}`, {
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

#### 7. Fill out the second `.then` statement. Push user 1 into the object in memory (`book.users`), then create a new `<li>` element for user 1 and append it to the list of users who've liked the book.

Remember that we have to update 3 things: the object in memory (the JSON object), the backend (the data stored in our `db.json` file), and the DOM (what you see in the browser).

```javascript
likeButton.addEventListener("click", (event) => {
  fetch(`${dogsUrl}/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      users: usersArray
    })
  })
  .then(response => response.json())
  .then((newUsersArray) => {
    dog.users.push(myUser)
    let newUserLi = document.createElement("li")
    newUserLi.innerText = myUser.username
    likersList.append(newUserLi)
  })
})
```

<a name="challenge-4"/>

## BONUS: Challenge 4
**Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?**