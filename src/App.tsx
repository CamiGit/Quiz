import "./App.css";
import { useState } from "react";
import { GameStatus, Question } from "./typer";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

const TOTAL_QUESTIONS = 10;

interface ApiResponse {
  response_code: number;
  results: Question[];
}


async function fetchQuestions(amount: number): Promise<Question[]> {
  //Función para obtener preguntas de la API recibe la cantidad de preguntas a obtener devuelve un array de preguntas
  const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  const response = await fetch(url);

  if (!response.ok) {
    // Si la respuesta no es exitosa se lanza un error con el código de estado
    throw new Error(`Failed to fetch questions: ${response.status}`);
  }
  // Verifica que la respuesta de la API tenga un código de respuesta exitoso (0) si no lanza un error con el código de respuesta
  const data: ApiResponse = await response.json();

  if (data.response_code !== 0) {
    // Si el código de respuesta no es 0, se lanza un error con el código de respuesta
    throw new Error(`API returned an error response code: ${data.response_code}`);
  }

  return data.results;
}


function App() {
  // Estado de juego, donde se determina que vista se muestra
  const [status, setStatus] = useState<GameStatus>("START");
  // Puntaje acumulado durante el quiz
  const [score, setScore] = useState(0);
  // Lista de preguntas obtenidas de la API, se llena al iniciar el quiz
  const [questions, setQuestions] = useState<Question[]>([]);
  // Estado de carga
  const [loading, setLoading] = useState(false);
  //M<ensaje de error en caso de que falle la obtención de preguntas
  const [error, setError] = useState<string | null>(null);

  //Llamado a la API para obtener preguntas, se ejecuta al iniciar el quiz
  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions(TOTAL_QUESTIONS);
      setQuestions(data);
      setStatus("PLAYING");
    } catch (err) {
      setError("The questions could not be loaded. Please try again");
    } finally {
      setLoading(false);
    }
  };

  //Recibe el puntaje final del quiz, se ejecuta al terminar el quiz
  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setStatus("FINISHED");
  };

  // Reinicia el estado del juego para volver a jugar
  const handleRestart = () => {
    setScore(0);
    setQuestions([]);
    setError(null);
    setStatus("START");
  };

  // Mapa de vistas
  const views: Record<GameStatus, React.ReactNode> = {

    START: (
      <StartScreen
        onStart={handleStart}
        loading={loading}
        error={error}
      />
    ),
    PLAYING: (
      <QuizScreen
        questions={questions}
        onFinish={handleFinish}
      />
    ),
    FINISHED: (
      <ResultScreen
        score={score}
        total={questions.length}
        onRestart={handleRestart}
      />
    ),
  };

  return views[status];
}

export default App;