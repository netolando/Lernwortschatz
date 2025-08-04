import React, { useState } from 'https://esm.sh/react@18';

export default function ListSection({ words, searchQuery, setSearchQuery, toggleRow, expandedRow }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const getSortedWords = () => {
    let filtered = words.filter(word =>
      word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.portuguese.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortColumn]?.toLowerCase() || '';
        const bValue = b[sortColumn]?.toLowerCase() || '';
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedWords = getSortedWords();

  return (
    <>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-10">
        Eine interaktive Liste deutscher Wörter mit Übersetzungen auf Englisch und Portugiesisch.
      </p>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Suche nach deutschen, englischen oder portugiesischen Wörtern..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-6 gap-4 p-4 text-sm sm:text-base font-semibold uppercase text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
          <div className="col-span-2 cursor-pointer flex items-center" onClick={() => handleSort('german')}>
            Deutsch
            {sortColumn === 'german' && (
              <span className="ml-2 text-indigo-600 dark:text-indigo-400">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
          <div className="col-span-2 cursor-pointer flex items-center" onClick={() => handleSort('english')}>
            Englisch
            {sortColumn === 'english' && (
              <span className="ml-2 text-indigo-600 dark:text-indigo-400">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
          <div className="col-span-2 cursor-pointer flex items-center" onClick={() => handleSort('portuguese')}>
            Portugiesisch
            {sortColumn === 'portuguese' && (
              <span className="ml-2 text-indigo-600 dark:text-indigo-400">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
        </div>
        {sortedWords.map((word, index) => (
          <div key={index} className="border-t border-gray-200 dark:border-gray-700">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 items-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50 dark:bg-gray-700'
              }`}
              onClick={() => toggleRow(index)}
            >
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 font-bold text-lg text-indigo-700 dark:text-indigo-300">
                {word.german}
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-gray-800 dark:text-gray-200">
                <span className="sm:hidden font-semibold text-gray-500 dark:text-gray-400">Englisch: </span>
                {word.english}
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-gray-800 dark:text-gray-200">
                <span className="sm:hidden font-semibold text-gray-500 dark:text-gray-400">Portugiesisch: </span>
                {word.portuguese}
              </div>
              <span className="ml-auto text-xl text-indigo-500 dark:text-indigo-400 transition-transform duration-200">
                {expandedRow === index ? '−' : '+'}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedRow === index ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'
              } ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-slate-100 dark:bg-gray-700/50'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-200 border-l-4 border-indigo-500 pl-4">
                <div>
                  <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Beispiel auf Deutsch</h4>
                  <p className="italic">"{word.germanExample}"</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Beispiel auf Englisch</h4>
                  <p className="italic">"{word.englishExample}"</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Beispiel auf Portugiesisch</h4>
                  <p className="italic">"{word.portugueseExample}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
