// ------ VISTA QUIZ ------ //

import { useState, useEffect } from "react";
import { Question } from "../typer";

// Definición de las props que recibe el componente QuizScreen
interface QuizScreenProps {
  questions: Question[];             // todas las preguntas que trajo la API
  onFinish: (score: number) => void; // cuando se acaban las preguntas, le paso el puntaje a App.tsx
}

// Opciones de respuesta etiquetadas como A, B, C, D
const LABELS = ["A", "B", "C", "D"] as const;

// Se almacenn los datos visuales de alternacia entre los dos temas en un array de objetos para facilitar su uso y mantenimiento
const THEMES = [
    {
        // tema claro: Tonos azules sobre fondo gris
        bg:           "bg-[#d5dce8]",
        title:        "text-[#3444fb]",
        question:     "text-[#3444fb]",
        optionBg:     "bg-transparent",
        optionBorder: "border-[#3444fb]/40",
        optionText:   "text-[#3444fb]",
        labelBg:      "bg-[#3444fb]",
        labelText:    "text-white",
        nextBg:       "bg-[#c8d0de]",
        nextText:     "text-[#3444fb]/40",
        forgeColor:   "text-[#3444fb]/50",
    },
    {
        // tema oscuro: Tonos en blancos sobre un fondo oscuro
        bg:           "bg-[#2c2c2c]",
        title:        "text-white",
        question:     "text-white",
        optionBg:     "bg-[#3a3a3a]",
        optionBorder: "border-transparent",
        optionText:   "text-white",
        labelBg:      "bg-[#555555]",
        labelText:    "text-white",
        nextBg:       "bg-[#3a3a3a]",
        nextText:     "text-white/30",
        forgeColor:   "text-white/40",
    },
];

// Otra forma de creacion del patron lineal del fondo de la vista
// Recibe una prop "dark" para ajustar el comportamiento de las lineas
const GeometricPatternQuiz = ({ dark }: { dark: boolean }) => (
    <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
    >
        {/* Coordenadas del patrón lineal */}
        {[
        ["0%","18%","30%","0%"],
        ["0%","55%","30%","0%"],
        ["0%","85%","30%","0%"],
        ["30%","0%","100%","45%"],
        ["30%","0%","83%","100%"],
        ["0%","55%","83%","100%"],
        ["0%","85%","83%","100%"],
        ["83%","100%","100%","45%"],
        ].map(([x1,y1,x2,y2], i) => (
        <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            //Cambia entre el blanco y el azul dependiendo del tema de la vista
            stroke={dark ? "white" : "#3444fb"}
            strokeWidth="0.6"
            strokeOpacity="0.15"
        />
        ))}
    </svg>
);

// Logo Forge recibe un prop colorClass para ajustar su color según el tema de la vista, se utiliza las mismas coordenadas del
// SVG que en el StartScreen para mantener la consistencia visual
const ForgeLogo = ({ colorClass }: { colorClass: string }) => (
    <div className={`flex items-center gap-2 ${colorClass}`}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <line x1="18" y1="4" x2="4" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="4" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4"  y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="4" x2="22" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="4"  y1="28" x2="22" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="32" y1="28" x2="22" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <span className="font-bold text-sm" style={{ fontFamily: "'Arial', sans-serif" }}>
        Forge/
        </span>
    </div>
);

// Componente principal del quiz, recibe las preguntas y la función onFinish desde App.tsx

export default function QuizScreen({ questions, onFinish }: QuizScreenProps) {

    // Estados locales para manejar la lógica del quiz:

    // currentIndex: índice de la pregunta actual
    const [currentIndex, setCurrentIndex] = useState(0);
    // selected: respuesta seleccionada por el usuario
    const [selected, setSelected] = useState<string | null>(null);
    // score: puntaje acumulado
    const [score, setScore] = useState(0);
    // shuffledAnswers: opciones de respuesta mezcladas para mostrar en orden aleatorio
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    
    // Obtengo la pregunta actual basada en el índice
    const currentQuestion = questions[currentIndex];

    // Alterna entre tema claro y oscuro, par = tema claro, impar = tema oscuro
    const theme = THEMES[currentIndex % 2];
    const isDark = currentIndex % 2 === 1;

    // useEffect para mezclar las respuestas cada vez que cambia la pregunta actual.
    useEffect(() => {
        if (!currentQuestion) return;
        // Combina la respuesta correcta con las incorrectas y mezcla el orden aleatoriamente usando el algoritmo de Fisher-Yates
        const answers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];

        // Fisher-Yates para mezclar aleatoriamente
        for (let i = answers.length - 1; i > 0; i--) {
        // Genera un índice aleatorio entre 0 e i y luego intercambia las respuestas en esas posiciones
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambio de respuestas en las posiciones i y j
        [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        // Se guardan las respuestas mezcladas en el estado para mostrarlas en la interfaz y se resetea la selección del usuario
        setShuffledAnswers(answers);
        // Resetea la respuesta seleccionada al cambiar de pregunta
        setSelected(null);
    }, [currentIndex, currentQuestion]);

    // Función que se ejecuta al seleccionar una respuesta, recibe la respuesta seleccionada
    const handleSelect = (answer: string) => {
        if (selected) return;  // Si ya se seleccionó una respuesta, no hacer nada para evitar cambios posteriores
        setSelected(answer);  // Guarda la respuesta seleccionada en el estado
        if (answer === currentQuestion.correct_answer) {  // Si la respuesta es correcta, incrementa el puntaje en 1
        setScore((prev) => prev + 1);
        }
    };

    // Función que se ejecuta al hacer click en el botón Next
    const handleNext = () => {
        if (!selected) return; // Si no se ha seleccionado una respuesta, no hacer nada para evitar avanzar sin responder
        if (currentIndex + 1 >= questions.length) { // Si no hay más preguntas, se llama a onFinish pasando el puntaje final para mostrar la pantalla de resultados
        onFinish(score);
        } else { // Si hay más preguntas, se incrementa el índice para mostrar la siguiente pregunta
        setCurrentIndex((prev) => prev + 1);
        }
    };

    // Funcio para determinar el estilo de cada opción de respuesta según si está seleccionada, si es correcta o incorrecta, y el tema actual
    const getOptionStyle = (answer: string) => {
        if (!selected) {
        // sin selección: estilo neutro con hover
        return `${theme.optionBg} border ${theme.optionBorder} hover:border-[#3444fb] cursor-pointer`;
        }
        // Respuesta correcta: fondo verde claro y borde verde
        if (answer === currentQuestion.correct_answer) {
        return "bg-green-500/20 border border-green-500 cursor-default";
        }
        // Respuesta seleccionada incorrecta: fondo rojo claro y borde rojo
        if (answer === selected) {
        return "bg-red-500/20 border border-red-500 cursor-default";
        }
        // Otras opciones no seleccionadas: estilo atenuado sin hover
        return `${theme.optionBg} border ${theme.optionBorder} opacity-40 cursor-default`;
    };

    // color del texto de cada opción tras seleccionar
    const getOptionTextStyle = (answer: string) => {
        if (!selected) return theme.optionText;
        if (answer === currentQuestion.correct_answer) return "text-green-400";
        if (answer === selected) return "text-red-400";
        return theme.optionText;
    };

    // color del círculo con la letra de la opción
    const getLabelStyle = (answer: string) => {
        if (!selected) return `${theme.labelBg} ${theme.labelText}`;
        if (answer === currentQuestion.correct_answer) return "bg-green-500 text-white";
        if (answer === selected) return "bg-red-500 text-white";
        return `${theme.labelBg} ${theme.labelText} opacity-40`;
    };

    // Si por algun motivo no se carga la pregunta actual no renderizar nada
    if (!currentQuestion) return null;

    return (
        // Contenedor principal con fondo dinámico según el tema
        <div className={`relative min-h-screen ${theme.bg} flex flex-col overflow-hidden transition-colors duration-500`}>

        {/* patrón de líneas de fondo */}
        <GeometricPatternQuiz dark={isDark} />

        {/* Logo Forge */}
        <div className="relative z-10 flex justify-end p-5">
            <ForgeLogo colorClass={theme.forgeColor} />
        </div>

        {/* Contenedor cental */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-16">

            {/* Titulo la cantidad de preguntas que lleva respondidas */}
            <h2
            className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 ${theme.title}`}
            style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
            Question {currentIndex + 1}/{questions.length}
            </h2>

            {/* Texto de la pregunta, se usa dangerouslySetInnerHTML ya que la API devuelve entidades HTML */}
            <p
            className={`text-center text-base md:text-lg mb-10 max-w-xl leading-relaxed ${theme.question}`}
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />

            {/* Opciones de respuesta */}
            <div className="w-full max-w-md space-y-3 mb-10">
            {shuffledAnswers.map((answer, idx) => (
                <button
                key={answer}
                onClick={() => handleSelect(answer)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm text-left text-sm transition-all duration-200 ${getOptionStyle(answer)}`}
                >
                {/* Circulo que rodea la letra de la opción */}
                <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors duration-200 ${getLabelStyle(answer)}`}
                >
                    {LABELS[idx]}
                </span>

                {/* Texto de respuesta, se usa dangerouslySetInnerHTML ya que la API devuelve entidades HTML */}
                <span
                    className={`font-medium transition-colors duration-200 ${getOptionTextStyle(answer)}`}
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
                </button>
            ))}
            </div>

            {/* Boton netx con dos estados gris cuando el usuario no ha seleccionado una opción o azul cuando ya selecciono una respuesta */}
            <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-10 py-2 rounded-sm text-sm font-semibold transition-all duration-200
                ${selected
                ? "bg-[#3444fb] text-white hover:bg-[#2233e0] cursor-pointer"
                : `${theme.nextBg} ${theme.nextText} cursor-not-allowed`
                }`}
            >
            Next
            </button>
        </div>
        </div>
    );
}