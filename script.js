const theLibrary = []

const dialog = document.querySelector('#dialog')
const showButton = document.querySelector('.btn-add')
const submitButton = document.querySelector('#submit-btn')


submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBooktoLibrary(document.querySelector('#title').value,
    document.querySelector('#author').value,
    document.querySelector('#pages').value,
    document.querySelector('#status').value
  )
  document.querySelector('form').reset()
  dialog.close()

})



showButton.addEventListener('click', () => {
  dialog.showModal();
})



function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status


}


const book1 = new Book("Harry Potter", "JK Rowling", 355, "Read")
const book2 = new Book("The Potter", "JK Rowling", 334, "Not Read")

theLibrary.push(book1)
theLibrary.push(book2)

function createCard(book,attribute) {

  const library = document.querySelector('.library')
  const bookdiv = document.createElement("div")
  bookdiv.className = "book"
  bookdiv.setAttribute("data-index", attribute)
  library.appendChild(bookdiv)

  const title = document.createElement("h1")
  const author = document.createElement("p")
  const pages = document.createElement("p")

  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = book.pages

  bookdiv.appendChild(title)
  bookdiv.appendChild(author)
  bookdiv.appendChild(pages)
  bookdiv.appendChild(statusToggle(book.status))
  bookdiv.appendChild(deleteButton())



}



function deleteButton() {
  const deleteButton = document.createElement('button')
  deleteButton.textContent = "X"
  deleteButton.className = "btn-dlt"
  deleteButton.addEventListener("click",(e) => {
    removeBook(e.target.parentNode.getAttribute("data-index"));
  })
  return deleteButton
}


function statusToggle(status) {
  const statusToggle = document.createElement('button')
  statusToggle.className = 'btn-toggle'
  if (status == "Not Read") {
    statusToggle.classList.add('not')
  }
  statusToggle.textContent = status

  statusToggle.addEventListener('click', () => {
    if(statusToggle.textContent == "Read") {
      statusToggle.textContent = "Not Read"
      statusToggle.classList.add('not')
    }
    else {
      statusToggle.textContent = "Read"
      statusToggle.classList.remove('not')
    }
  })

  return statusToggle
}



function addBooktoLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status)
  createCard(book)
  theLibrary.push(book)

}

function displayLibrary(library) {
  library.forEach((book, i) => {
    createCard(book, i)
  });
}

window.addEventListener("load", () => {
  displayLibrary(theLibrary)
});


function removeBook(index) {
  theLibrary.splice(index)
  document.querySelector(`.book[data-index="${index}"]`).remove()
}

