# Solution Instructions
## Getting started
* Copy the repo URL and run `git clone` in your terminal. `cd` into the new directory and run these commands.

```
npm install -g json-server
json-server db.json
```

* Open `http://localhost:3000/books` to see all the book instances.
* Open `http://localhost:3000/users` to see all the user instances.
* Run `open index.html` to see your app in the browser.

### Deliverables
## Challenge 1
Get a list of books (`http://localhost:3000/books`) and render them on to the page.

If you take a look at the `index.html` file, you'll see that there are already some stable HTML elements in the `<body>` tag. Since there is a `<ul>` tag with `id="list"`, this is where we should render each of the book titles as an `<li>`. 

```html
<body>
	<div id="list-panel">
		<ul id="list">

		</ul>
	</div>
	<div id="show-panel"></div>
	<script type="text/javascript" src="./js/index.js"></script>
</body>
```

## Challenge 2
- Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.

## Chalenge 3
- You can like a book by clicking on a button. You are user 1 `{"id":1, "username":"pouros"}`, so to like a book send a `PATCH` request to `http://localhost:3000/books/:id` with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. For example, if the previous array was `"[{"id":2, "username":"auer"}, {"id":8, "username":"maverick"}]`, you should send as the body of your PATCH request:

```javascript
{
  "users": [
    {"id":2, "username":"auer"},
    {"id":8, "username":"maverick"},
    {"id":1, "username":"pouros"}
  ]
}
```

- This route will respond with the updated book json including the list of users who have liked the book.

## BONUS: Challenge 4
- BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?