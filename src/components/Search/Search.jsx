import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../utilities/baby-products-api'

export default function Search()  {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await searchProducts(query);
        setResults(response); // Assuming your API response has a 'data' property
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only trigger the API call if there's a query (non-empty string)
    if (query.trim() !== '') {
      fetchSearchResults();
    } else {
      // Clear the results if the query is empty
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {results.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && !loading && <p>No results found.</p>}
    </div>
  );
};

