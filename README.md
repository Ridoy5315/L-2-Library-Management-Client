# Book Manager
A full-featured Book Management System built with modern web technologies.

---

## Features
- Add, edit, and delete book
- Categorize by genre, author, or ISBN
- Track available copies
- Borrow and return books due date 
- Displays summary of all borrowed books
- Responsive and user-friendly dashboard

## Tech Stack
**Fronted**
- React.js
- Redux Toolkit
- RTK query
- TypeScript
- Tailwind CSS
- ShadCN UI (Radix UI)

---

## Installation & Setup
### 1. Clone the Repository

<pre><code>
git clone https://github.com/Ridoy5315/L-2-Library-Management-Client.git
</code></pre>


### 2. Install Dependencies
<pre><code>
npm install
</code></pre>

### 3. Run the Application
<pre><code>
npm run dev
</code></pre>

---

## API Endpoints
### Book Routes 
|  Method   |     Endpoint     |
|-----------|------------------|
|   POST    |    /api/books    |
|    GET    | /api/books?page=${page} |
|    GET    |  /api/books/:id  |
|   PATCH   |  /api/books/edit-book/${id}  |
|   DELETE  |  /api/books/delete-book/${id}  |

### Borrow Routes 
|  Method   |     Endpoint     |
|-----------|------------------|
|   POST    |    /api/borrow   |
|    GET    |    /api/borrow-summary   |

---

### Author
**MD MAHBUBUL ISLAM RIDOY**

Software Engineering Student – Donghua University