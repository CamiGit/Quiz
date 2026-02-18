
export interface Question {
    // Representa la extructura de una pregunta obtenida de la API
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

// ESTADO DEL JUEGO
// START: antes de empezar
// PLAYING: durante el quiz
// FINISHED: después de terminar
export type GameStatus = 'START' | 'PLAYING' | 'FINISHED';
