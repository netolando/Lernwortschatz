import React, { useState, useEffect } from 'https://esm.sh/react@18';
import ListSection from './components/ListSection.js';
import FlashcardGame from './components/FlashcardGame.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch('./data/lernwortschatz/section-1.json')
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((err) => console.error('Error loading words', err));
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 font-sans antialiased flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto my-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-800 dark:text-indigo-400 mb-6 drop-shadow-md">
          Deutscher Wortschatz
        </h1>

        <div className="flex justify-center mb-10 space-x-4">
          <button
            onClick={() => setCurrentPage('list')}
            className={`py-2 px-6 rounded-full font-bold transition-all duration-200 ${
              currentPage === 'list'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Wortschatzliste
          </button>
          <button
            onClick={() => setCurrentPage('flashcards')}
            className={`py-2 px-6 rounded-full font-bold transition-all duration-200 ${
              currentPage === 'flashcards'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Lernkarten
          </button>
        </div>

        {currentPage === 'list' ? (
          <ListSection
            words={words}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            toggleRow={toggleRow}
            expandedRow={expandedRow}
          />
        ) : (
          <FlashcardGame words={words} />
        )}
      </div>
    </div>
  );
}
