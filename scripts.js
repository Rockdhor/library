function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? "read" : "not read yet"}.`
    }
}
console.log(localStorage.getItem("collection"))
let localCollection = localStorage.getItem("collection") ?  JSON.parse(localStorage.getItem("collection")) : [];

const updateRead = (e) => {
    console.log(e.target.checked);
    const index = e.target.getAttribute("index");
    localCollection[index]["hasRead"] = e.target.checked;
    localStorage.collection = JSON.stringify(localCollection);
}

const deleteBook = (e) => {
    localCollection.splice(e.target.getAttribute("index"));
    updateCollection();
    localStorage.collection = JSON.stringify(localCollection);
}

const updateCollection = () => {
    let bookshelf = document.getElementById("bookshelf");
    bookshelf.innerHTML = "";
    console.log(localCollection)
    let index = 0;
    localCollection.forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        let title = document.createElement("h2");
        title.textContent = book.title;
        let author = document.createElement("h4");
        author.textContent = book.author;
        let pages = document.createElement("h5");
        pages.textContent = "Pages: " + book.pages;
        let hasRead = document.createElement("input");
        hasRead.type = "checkbox";
        hasRead.checked = book.hasRead;
        let deleter = document.createElement("button");
        deleter.textContent = "X";
        deleter.setAttribute("index", index);
        deleter.addEventListener("click", deleteBook);
        let deleterDiv = document.createElement("div");
        deleterDiv.appendChild(deleter);
        deleterDiv.style.position = "relative";
        bookElement.appendChild(deleterDiv);
        bookElement.setAttribute("index", index);
        bookElement.appendChild(title);
        bookElement.appendChild(document.createElement("hr"));
        bookElement.appendChild(author);
        bookElement.appendChild(pages);
        let readLabel = document.createElement("h5");
        readLabel.textContent = "Read: "
        readLabel.style.display = "inline";
        bookElement.appendChild(readLabel);
        hasRead.setAttribute("index", index);
        hasRead.addEventListener('click', updateRead)
        bookElement.appendChild(hasRead);
        bookElement.style.backgroundColor = index%2==0? "#B8BAC8" : "#AA78A6";
        
        index += 1;
        bookshelf.appendChild(bookElement);
    });
}

updateCollection();

const createBook = (title, author, pages, hasRead) => {
    localCollection.push(new Book(title, author, pages, hasRead))
    updateCollection();
    localStorage.collection = JSON.stringify(localCollection);
}



const handleAdder = () => {
    console.log("a")
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const hasRead = document.getElementById("read");
    if (title.value != "" && title.author != "" && parseInt(pages.value)!= NaN) {
        createBook(title.value,author.value,parseInt(pages.value),hasRead.checked);
    }
    title.value = "";
    author.value = "";
    pages.value = "";
    hasRead.checked = false;
    modal.style.display = "none";
}
let modal = document.getElementById("newBook");
const openModal = () => {
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
let submitBook = document.getElementById("submit");
submitBook.addEventListener("click", handleAdder)
let adder = document.getElementById("adder");
adder.addEventListener("click", openModal)