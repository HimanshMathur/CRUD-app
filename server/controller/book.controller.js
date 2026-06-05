const { Book } = require('../model/book.model.js');

const handleBookStoreController = async (req, resp) => {
  console.log("BODY RECEIVED:", req.body);
  try {
    const { bookName, bookTitle, author, sellingPrice, publishDate } = req.body;

    if (!bookName || !bookTitle || !author || sellingPrice === undefined || sellingPrice === null) {
      return resp.status(400).json({ message: 'All required fields are required', Success: false });
    }

    const bookAdd = await Book.create({
      bookName,
      bookTitle,
      author,
      sellingPrice,
      publishDate,
    });

    if (bookAdd) {
      return resp.status(200).json({ message: 'Book added successfully', Success: true });
    }

    return resp.status(400).json({ message: 'Book not added', Success: false });
  } catch (err) {
    console.error('Error in book store controller', err);
    return resp.status(500).json({ message: 'Internal server error', Success: false });
  }
};
const handleBookListController = async (req, resp) => {
  try {
    const bookLists = await Book.find({});
    if (bookLists) {
      return resp.status(200).json({ message: 'Book list fetched successfully', Success: true, data: bookLists });
    }
    return resp.status(400).json({ message: 'Book list not fetched', Success: false });
  }
    catch (err) {
      console.error('Error in book list controller', err);
      return resp.status(500).json({ message: 'Internal server error', Success: false });
    }
      
}
const handleDeleteBookController = async(req,resp) =>{
  try{
    const {id} = req.params;
    await Book.findByIdAndDelete(id);
    return resp.status(200).json({
      Success:true,
      message: "Book Deleted Sucessfully"
    });
  } catch(err){
    return resp.status(500).json({
      Success: false,
      message :err.message
    });
  }
};
const handleUpdateBookController = async(req,resp)=>{
  try {
    const {id} = req.params;
    await Book.findByIdAndUpdate(id,req.body);
    return resp.status(200).json({
      Success : true,
      message : "Book updated Successfully"
    });
  } catch(err){
    return resp.status(500).json({
      Success:false,
      message:err.message
    });
  }
}
module.exports = { handleBookStoreController,handleBookListController,handleDeleteBookController,handleUpdateBookController};