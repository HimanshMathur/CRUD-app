import React, { useEffect } from "react";
import { bookbaseURL } from "../axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";
const Home = () => {
  // Backend schemas lower camelCase ya matching casing expect karte hain
  const [bookForm, setBookForm] = React.useState({
    bookName: "",
    bookTitle: "",
    author: "",
    sellingPrice: "",
    publishDate: "",
  });
  const [books, setBooks] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      // Price ko backend compatibility ke liye number format mein rakhein
      [name]:
        name === "sellingPrice" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const getBooks = async () => {
    try {
      const response = await bookbaseURL.get("/booklists");
      setBooks(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  const handleDelete = async (id) => {
    try {
      await bookbaseURL.delete(`/deletebook/${id}`);
      getBooks();
    } catch (err) {
      console.log(err);
    }
  };
  const [editId, setEditId] = React.useState(null);

  const handleEdit = (book) => {
    setEditId(book._id);
    setBookForm({
      bookName: book.bookName,
      bookTitle: book.bookTitle,
      author: book.author,
      sellingPrice: book.sellingPrice,
      publishDate: book.publishDate?.split("T")[0],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await bookbaseURL.put(`/updatebook/${editId}`, bookForm);

        setMessage("Book Updated Successfully");
      } else {
        await bookbaseURL.post("/addbook", bookForm);

        setMessage("Book Added Successfully");
      }

      setBookForm({
        bookName: "",
        bookTitle: "",
        author: "",
        sellingPrice: "",
        publishDate: "",
      });

      setEditId(null);

      await getBooks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-5 my-5">
        {/* Book Name */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border border-black-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
            name="bookName"
            value={bookForm.bookName}
            onChange={handleFormChange}
          />
        </div>

        {/* Book Title */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border border-black-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
            name="bookTitle"
            value={bookForm.bookTitle}
            onChange={handleFormChange}
          />
        </div>

        {/* Author */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full border border-black-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
            name="author"
            value={bookForm.author}
            onChange={handleFormChange}
          />
        </div>

        {/* Selling Price */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="">Selling Price</label>
          <input
            placeholder = "Selling Price"
            className="w-full border border-black-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
            name="sellingPrice"
            value={bookForm.sellingPrice}
            onChange={handleFormChange}
          />
        </div>

        {/* Publish Date */}
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="">Publish Date:</label>
          <input
            type="date"
            className="w-full border border-black-100 rounded-sm outline-1 outline-gray-500 h-8 px-2"
            name="publishDate"
            value={bookForm.publishDate}
            onChange={handleFormChange}
          />
        </div>

        {/* Submit Button */}
        <div className="col-start-5 flex justify-end">
          {message && (
            <p className="text-green-600 font-bold mr-5">{message}</p>
          )}

          <button
            className="bg-gray-700 text-white h-9 w-20 rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            {editId ? "Update" : "Submit"}
          </button>
        </div>

        {/* Table Layout */}
        <div className="col-span-5 w-full mt-10">
          <div className="w-full">
            <table className="w-full bg-white divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    BOOK NAME
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    BOOK TITLE
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    AUTHOR
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SELLING PRICE
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    PUBLISH DATE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {book.bookName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {book.bookTitle}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {book.author}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{book.sellingPrice}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {book.publishDate?.split("T")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => handleDelete(book._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Books Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
