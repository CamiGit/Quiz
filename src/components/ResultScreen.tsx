// -----  VISTA DE RESULTADOS ----- //

// Definición de las props que recibe el componente ResultsScreen
interface ResultsScreenProps {
  score: number;       // Puntaje obtenido por el usuario
  total: number;       // Total de preguntas del quiz
  onRestart: () => void; // Callback para volver a jugar
}

// Importación el patron geometrico para usarlo en el fondo de la pantalla de resultados
import { GeometricPattern } from "./StartScreen";


// Creación del componente principal de la pantalla de resultados
export default function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
    return (
        // Pantalla completa dividida en dos mitades
        <div className="min-h-screen flex flex-col md:flex-row">

        {/* ── Mitad izquierda: fondo azul con mensaje y con la opcción de reiniciar*/}
        <div className="relative flex-1 bg-[#3444fb] flex flex-col items-start justify-center px-10 md:px-16 py-20 overflow-hidden">
            <GeometricPattern />

            <div className="relative z-10">
            {/* Título de felicitación */}
            <h1
                className="text-5xl md:text-6xl font-black text-white uppercase leading-none tracking-tight"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
                BRAVO!
            </h1>

            {/* Subtítulo */}
            <p
                className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mt-1 tracking-tight"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
                YOU HAVE<br />SCORED
            </p>

            {/* Botón para volver a jugar */}
            <button
                // Llama a onRestart cuando se hace click para reiniciar el juego
                onClick={onRestart}
                className="mt-10 text-white underline underline-offset-4 text-sm hover:opacity-70 transition-opacity"
            >
                Wanna Play Again?
            </button>
            </div>
        </div>

        {/* ── Mitad derecha: fondo blanco con el puntaje numérico ── */}
        <div className="flex-1 bg-white flex items-center justify-center px-10 py-20">
            <p
            className="text-7xl md:text-9xl font-black text-[#3444fb] tracking-tighter"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
            {score}/{total}
            </p>
        </div>
        </div>
    );
}