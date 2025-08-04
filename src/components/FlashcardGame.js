import React, { useState, useEffect } from 'https://esm.sh/react@18';

export default function FlashcardGame({ words }) {
  const SESSION_SIZE = 10;

  const [sessionCards, setSessionCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewSession = (cardsToUse = words) => {
    const shuffled = shuffleArray(cardsToUse);
    const newSession = shuffled.slice(0, SESSION_SIZE);
    setSessionCards(newSession);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIncorrectCards([]);
    setIsSessionFinished(false);
    setCorrectCount(0);
  };

  useEffect(() => {
    if (words.length) {
      startNewSession(words);
    }
  }, [words]);

  const handleCardResult = (isCorrect) => {
    if (!isFlipped) {
      setIsFlipped(true);
      return;
    }

    if (!isCorrect) {
      setIncorrectCards((prev) => [...prev, sessionCards[currentCardIndex]]);
    } else {
      setCorrectCount((prev) => prev + 1);
    }

    if (currentCardIndex + 1 < SESSION_SIZE) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      if (incorrectCards.length > 0) {
        startNewSession(incorrectCards);
        setIncorrectCards([]);
      } else {
        setIsSessionFinished(true);
      }
    }
  };

  if (!sessionCards.length) {
    return <p className="text-center">Lädt...</p>;
  }

  if (isSessionFinished) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">Du hast alle Karten richtig beantwortet!</p>
        <button
          onClick={() => startNewSession(words)}
          className="py-2 px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Neu starten
        </button>
      </div>
    );
  }

  const currentWord = sessionCards[currentCardIndex];

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flashcard ${isFlipped ? 'flipped' : ''} w-72 sm:w-96 cursor-pointer mb-6`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flashcard-inner flex" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <div className="flashcard-front bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center w-full h-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-300">{currentWord.german}</h2>
          </div>
          <div className="flashcard-back bg-indigo-600 text-white rounded-lg shadow-md flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col items-start w-full text-left px-4">
              <h3 className="text-xl sm:text-2xl font-semibold mb-1">Englisch:</h3>
              <p className="text-lg italic mb-2">"{currentWord.english}"</p>
              <h3 className="text-xl sm:text-2xl font-semibold mb-1">Portugiesisch:</h3>
              <p className="text-lg italic mb-4">"{currentWord.portuguese}"</p>
              <hr className="w-full border-t border-indigo-300 my-2" />
              <h4 className="text-sm font-semibold uppercase text-indigo-200 mt-2">Beispiel auf Deutsch:</h4>
              <p className="text-base italic mb-1">"{currentWord.germanExample}"</p>
              <h4 className="text-sm font-semibold uppercase text-indigo-200 mt-2">Beispiel auf Englisch:</h4>
              <p className="text-base italic mb-1">"{currentWord.englishExample}"</p>
              <h4 className="text-sm font-semibold uppercase text-indigo-200 mt-2">Beispiel auf Portugiesisch:</h4>
              <p className="text-base italic">"{currentWord.portugueseExample}"</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 w-full max-w-md mt-4">
        <button
          onClick={() => handleCardResult(false)}
          disabled={!isFlipped}
          className={`py-3 px-6 rounded-full font-bold shadow-md transition-colors duration-200 ${
            isFlipped ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Falsch
        </button>
        <button
          onClick={() => handleCardResult(true)}
          disabled={!isFlipped}
          className={`py-3 px-6 rounded-full font-bold shadow-md transition-colors duration-200 ${
            isFlipped ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Richtig
        </button>
      </div>
      <div className="mt-8">
        <button
          onClick={() => startNewSession(words)}
          className="py-2 px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Neu mischen
        </button>
      </div>
      <div className="mt-4 text-gray-700 dark:text-gray-300">
        {correctCount}/{SESSION_SIZE} richtig
      </div>
    </div>
  );
}
