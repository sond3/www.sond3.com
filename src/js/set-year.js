// funcion para insertar el año actual en la etiqueta con id year

export function setYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}