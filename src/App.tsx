import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import popcorn from './assets/popcorn.png'
import Start from './components/Start';
import Questions from './components/Questions';
import MovieOutput from './components/MovieOutput';

type PersonAnswers = { favoriteMovie: string, era: string, vibe: string[] };
type Recommendation = { title: string; description: string };

function App() {
  const [view, setView] = useState<"start" | "questions" | "output">("start");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [timeAvailable, setTimeAvailable] = useState<string>("");
  const [currentPerson, setCurrentPerson] = useState<number>(1);
  const [allAnswers, setAllAnswers] = useState<PersonAnswers[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [excludedTitles, setExcludedTitles] = useState<string[]>([]);

  const buildPersonSentence = (person: PersonAnswers, index: number) => {
    return `Person ${index + 1}: their favorite movie is ${person.favoriteMovie}. They want something ${person.era}. They're in the mood for ${person.vibe.join(" and ")}.`;
  };

  const onStart = (count: number, time: string) => {
    setPeopleCount(count)
    setTimeAvailable(time)
    setView("questions")
  }

  const handlePersonSubmit = (personAnswers: PersonAnswers) => {
  const updated = [...allAnswers, personAnswers]
  setAllAnswers(updated)
  if (currentPerson < peopleCount) {
    setCurrentPerson(prev => prev + 1)
  } else {
    handleSubmit(updated)
  }
}

const handleSubmit = async (answers: PersonAnswers[], excludeTitles: string[] = []) => {
  setStatus('loading')
  const groupInput = answers.map(buildPersonSentence).join("\n\n");
    try {
      const response = await fetch('http://localhost:3000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: groupInput, excludeTitles, timeAvailable })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      setRecommendation({
        title: data.title,
        description: data.description
      })
      setStatus('idle')
      setView('output')
    } catch (error) {
      setStatus('error')
      console.error('Movie recommendation failed:', error)
    }
  }

  const handleNextMovie = () => {
    const updated = [...excludedTitles, recommendation?.title ?? ""].filter(Boolean);
    setExcludedTitles(updated);
    handleSubmit(allAnswers, updated)
  };

  const handleGoAgain = () => {
    setView("start");
    setAllAnswers([]);
    setCurrentPerson(1);
    setRecommendation(null);
    setExcludedTitles([]);
  };

  return (
    <div className="bg-[#000C36] min-h-screen flex flex-col items-center px-6 py-8">
      <div className="flex flex-col items-center mb-8">
        <img src={popcorn} alt="PopChoice Logo" className="w-20 h-20" />
        <h1 className="text-white font-bold text-4xl italic">PopChoice</h1>
      </div>
      {status === 'loading' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}
      <div className="w-full max-w-md">
        {view === "start" && <Start onStart={onStart} />}
        {view === "questions" && (
          <Questions
            key={currentPerson}
            personNumber={currentPerson}
            totalPeople={peopleCount}
            onSubmit={handlePersonSubmit}
          />
        )}
        {view === "output" &&
          <MovieOutput recommendation={recommendation} status={status} onNextMovie={handleNextMovie} onGoAgain={handleGoAgain} />
        }
      </div>
    </div>
  )
}

export default App
