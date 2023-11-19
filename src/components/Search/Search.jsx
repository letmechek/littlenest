import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../../utilities/baby-products-api'
import { Link } from 'react-router-dom';
import BabyProductItems from '../BabyProductItems/BabyProductItems';
import Loader from '../Loader/Loader';
import{ MagnifyingGlassIcon} from '@heroicons/react/24/outline'

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const searchRef = useRef(null);

  
    const closeSearch = () => {
        setResults([]);
        setQuery('');
        setHasInteracted(false);
      };
    
      useEffect(() => {
        const handleDocumentClick = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setHasInteracted(false);
          }
        };
    
        document.addEventListener('click', handleDocumentClick);
    
        return () => {
          document.removeEventListener('click', handleDocumentClick);
        };
      }, []);
    
      useEffect(() => {
        const fetchSearchResults = async () => {
          try {
            setLoading(true);
            const response = await searchProducts(query);
            setResults(response.slice(0, 3));
            setHasInteracted(true);
          } catch (error) {
            console.error('Error searching products:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (query.trim() !== '') {
          fetchSearchResults();
        } else {
          setResults([]);
        }
      }, [query]);
    
      return (
        <div className="relative" ref={searchRef}>
         <div className="relative flex items-center">
        <div className="absolute left-3 ">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search Our Store"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 pt-4 pb-4"
        />
      </div>
    
          {loading && <p className="mt-2 text-gray-600"><Loader/></p>}
    
          {hasInteracted && results.length === 0 && !loading && <p className="mt-2 text-gray-600">No results found.</p>}
    
          {results.length > 0 && (
            <div className="left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg flex">
              {results.map((product) => (
                <div key={product._id} className="flex-1 max-w-1/3 aspect-w-1 aspect-h-1">
                  <Link to={`/${product.name}/${product._id}`} className="block p-4" onClick={closeSearch}>
                    <BabyProductItems babyProductItem={product} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }