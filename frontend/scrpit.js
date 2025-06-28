// Fetch and display books from API
async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:5000/api/books");
    const books = await response.json();
    displayBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Display books as cards
function displayBooks(books) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  if (!books.length) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Year:</strong> ${book.publishedYear}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
    `;
    container.appendChild(card);
  });
}

// Add book from form
document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const publishedYear = document.getElementById("year").value.trim();
  const genre = document.getElementById("genre").value.trim();

  if (!title || !author || !publishedYear || !genre) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, publishedYear, genre }),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    document.getElementById("bookForm").reset();
    fetchBooks();
  } catch (error) {
    console.error("Error adding book:", error);
  }
});

// Live search filter
document.getElementById("searchInput").addEventListener("input", async (e) => {
  const keyword = e.target.value.toLowerCase();

  try {
    const response = await fetch("http://localhost:5000/api/books");
    const books = await response.json();

    const filtered = books.filter((book) =>
      `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(keyword)
    );

    displayBooks(filtered);
  } catch (error) {
    console.error("Search failed:", error);
  }
});

// Initial load
fetchBooks();
