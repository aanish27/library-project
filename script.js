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



class Book{

  att = 0;

  constructor(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.createCard()
    this.att++;
  }

  createCard() {
    const bookdiv = document.createElement("div")
    bookdiv.className = "book"
    bookdiv.setAttribute("data-index", this.att)
    const title = document.createElement("h1")
    const author = document.createElement("p")
    const pages = document.createElement("p")

    title.textContent = this.title
    author.textContent = this.author
    pages.textContent = this.pages

    bookdiv.appendChild(title)
    bookdiv.appendChild(author)
    bookdiv.appendChild(pages)
    bookdiv.appendChild(this.#statusToggle(this.status))
    bookdiv.appendChild(this.#deleteButton())

    return bookdiv

  }


  #deleteButton() {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "X"
    deleteButton.className = "btn-dlt"
    deleteButton.addEventListener("click",(e) => {
      removeBook(e.target.parentNode.getAttribute("data-index"));
    })
    return deleteButton
  }

  #statusToggle(status) {
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

}



function addBooktoLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status)
  theLibrary.push(book)
  const library = document.querySelector('.library')
  library.appendChild(book.createCard())

}


window.addEventListener("load", () => {
  addBooktoLibrary("Harry Potter", "JK Rowling", 355, "Read")
  addBooktoLibrary("The Potter", "JK Rowling", 334, "Not Read")
  theLibrary.push(book1)
  theLibrary.push(book2)

});


function removeBook(index) {
  theLibrary.splice(index)
  document.querySelector(`.book[data-index="${index}"]`).remove()
}

