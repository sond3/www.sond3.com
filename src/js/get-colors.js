// funcion para establecer un color de fondo aleatorio
export function setRandomBackground() {
    // Array de colores flat pastel en formato HSL
    const colors = [
        // "hsl(60, 100%, 70%)", //yellow
        // "hsl(0, 98%, 65%)", // red
        // "hsl(23, 95%, 52%)", // orange
        // "hsl(118, 98%, 65%)", // green
        // "hsl(0, 0%, 5%)", // black
        "hsl(0, 0%, 90%)", // white
    ];

    // Obtener un índice aleatorio para seleccionar un color del array
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    // Obtener el elemento HTML donde se establecerá el color de fondo
    const targetElement = document.querySelector("html"); // Reemplaza "#elemento" con el selector CSS de tu elemento específico

    // Establecer el color de fondo usando una variable CSS personalizada
    targetElement.style.setProperty("--bg-color", randomColor);

    // Calcular el color de primer plano con suficiente contraste (AAA)
    const foregroundColor = getContrastingColor(randomColor);

    // Establecer el color de primer plano usando una variable CSS personalizada
    targetElement.style.setProperty("--fg-color", foregroundColor);
}

// funcion para obtener un color contrastante
export function getContrastingColor(color) {
    // Obtener los componentes HSL del color de fondo
    const [, saturation, lightness] = color.match(/\d+/g);

    // Invertir el valor de luminosidad para el color de primer plano
    const targetLightness = 70 - lightness;

    // Devolver un nuevo color con el mismo matiz y saturación,
    // pero con el valor de luminosidad invertido para un contraste más fuerte
    return `hsl(${
        color.match(/\d+/g)[0]
    }, ${saturation}%, ${targetLightness}%)`;
}