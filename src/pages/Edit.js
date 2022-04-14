import Header from "../components/Header";
import BookSearch from "../containers/BookSearch";
import Bookshelf from "../containers/Bookshelf";
import Footer from "../components/Footer";

function Edit(props) {
  console.log(props.books);
  return (
    <main className="main isEditing">
      <Header />
      <BookSearch
          books={props.books} addBook={props.addBook} />
      <Bookshelf
        books={props.books} removeBook={props.removeBook} clearBooks={props.clearBooks}
        isEditing={true} />
      <Footer />
    </main>
  );
}

export default Edit;