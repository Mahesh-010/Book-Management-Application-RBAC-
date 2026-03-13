import { useAuth } from "../context/AuthContext";

function BookList({ books, onDelete, onEdit }) {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  return (
    <div>
      {isAdmin && (
        <button onClick={() => onEdit(null)}>+ Add Book</button>
      )}

      {books.map(book => (
        <div key={book._id} style={{ marginBottom: "12px" }}>
          <strong>{book.title}</strong> — {book.author}

          {isAdmin && (
            <>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookList;