import Header from '../components/Header';
import Bookshelf from '../containers/Bookshelf';
import Footer from '../components/Footer';

function Home(props) {
  return (
    <main className="main isViewing">
      <Header />
      <Bookshelf
        books={props.books} removeBook={props.removeBook} clearBooks={props.clearBooks}
        isEditing={false} />
      <Footer />
    </main>
  );
}

export default Home;