//  ---- VISTA INICIAL ----- //

// Definición de las props que recibe el componente StartScreen
interface StartScreenProps {
    onStart: () => void;       // Función callback para iniciar el quiz
    loading: boolean;          // Indica si las preguntas se están cargando (muestra "Loading..." en el botón)
    error: string | null;      // Mensaje de error si la API falla
}

// Creación de componente que renderiza un SGV con cordenadas relativas para garantizar que sea responsivo
export const GeometricPattern = () => (
    <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {/* Lineas basadas en coordenadas para crear el patron */}
        {/* Lineas desde el eje izquierdo */}
        <line x1="0" y1="45%" x2="40%" y2="0" stroke="white" strokeWidth="1" />
        <line x1="0" y1="80%" x2="47.5%" y2="75%" stroke="white" strokeWidth="1" />
        <line x1="0" y1="60%" x2="90%" y2="20%" stroke="white" strokeWidth="1" />

        {/* Linea perpendicular */}
        <line x1="10%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="1" />

        {/* Lineas que forman el vertice */}
        <line x1="60%" y1="0%" x2="90%" y2="20%" stroke="white" strokeWidth="1" />
        <line x1="21%" y1="21.5%" x2="90%" y2="20%" stroke="white" strokeWidth="1" />
        <line x1="90%" y1="20%" x2="83%" y2="100%" stroke="white" strokeWidth="1" />
    </svg>
);
//Creación de componente que renderiza el logo de Forge, basado en lineas SVG
const ForgeLogo = () => (
    <svg 
        className="w-9 h-9" viewBox="0 0 36 36" fill="none" >
            <line x1="18" y1="4" x2="4" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="4" x2="32" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4"  y1="28" x2="32" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="4" x2="22" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <line x1="4"  y1="28" x2="22" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <line x1="32" y1="28" x2="22" y2="20" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

export default function StartScreen({ onStart, loading, error }: StartScreenProps) {
    return (
        // Contenedor principal: fondo azul del Figma, centrado
        <div className="relative min-h-screen bg-[#2431ca] flex flex-col items-end justify-center overflow-hidden">

            {/* Patron de lineas */}
            <GeometricPattern />

            {/* Se establece el z-10 para que el contenido esté por encima del patrón */}
            <div className="relative z-10 text-right text-white pr-12 md:pr-24 lg:pr-32">

                {/* Título principal */}
                <h1
                    className="font-black uppercase leading-none mb-3"
                    style={{
                        fontFamily: "'italic', Impact, sans-serif",
                        fontSize: "clamp(5rem, 12vw, 10rem)",
                        letterSpacing: "-0.03em",
                    }}>
                    QUIZZLER
                </h1>

                {/* logo de Forge/ debajo del título, centrado */}
                <div className="flex items-center justify-end gap-2 -mt-2 md:-mt-5 lg:-mt-8">
                    <span className="text-white/60 text-xs font-semibold tracking-widest">BY:</span>
                    <ForgeLogo />
                    <span className="text-white font-bold" style={{ fontFamily: "'Arial', sans-serif", fontSize: "1.1rem" }}>
                        Forge/
                    </span>
                </div>

                {/* Mensaje de error si la API falla */}
                {error && (
                <p className="text-red-300 text-sm mb-4 bg-red-500/20 px-4 py-2 rounded">
                    {error}
                </p>
                )}

                {/* Botón de inicio del quiz, estado loading mientras ingresa y carga las preguntas */}
                <button
                onClick={onStart}
                disabled={loading}
                className="text-lg font-medium text-white hover:underline underline-offset-4
                transition-all duration-200 tracking-wide disabled:opacity-100 disabled:cursor-not-allowed"
                >
                {loading ? "Loading questions..." : "Let's start the quiz ->"}
                </button>
            </div>
        </div>
    );
}