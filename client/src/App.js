// import logo from './logo.svg';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:8080').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}


function App() {
  const [query, setQuery] = useState('');
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const searchDocuments = async (event) => {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
      setError('Please enter a search term.');
      setDocuments([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'http://localhost:8080/api/documents',
        {
          params: {
            q: searchTerm,
          },
        }
      );

      setDocuments(response.data.documents || []);
      setTotal(response.data.total?.value || 0);
    } catch (err) {
      console.error('Document search failed:', err);

      setError(
        err.response?.data?.message ||
          'Unable to search documents. Please try again.'
      );

      setDocuments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
      </header> */}
      <main className="search-container">
        <h1>React-Node/Express/Opensearch</h1>

        <p className="subtitle">
          Search documents stored in OpenSearch.
        </p>

        <form className="search-form" onSubmit={searchDocuments}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for documents..."
            aria-label="Search documents"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {!loading && !error && query.trim() && (
          <div className="result-summary">
            {total} result{total === 1 ? '' : 's'} found
          </div>
        )}

        {!loading && !error && query.trim() && documents.length === 0 && (
          <div className="empty-message">
            No documents found for "{query}".
          </div>
        )}

        <section className="results">
          {documents.map((document) => (
            <article className="document-card" key={document.id}>
              <h2>
                {document.title ||
                  document.name ||
                  'Untitled document'}
              </h2>

              {document.content && (
                <p>{document.content}</p>
              )}

              {document.description && (
                <p>{document.description}</p>
              )}

              <div className="document-id">
                Document ID: {document.id}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;