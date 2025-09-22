// anim.js - OPTIMIZADO

// Envolvemos todo en este evento para asegurar que el HTML está listo antes de ejecutar el script.
// También protege las variables para que no sean globales.
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const audio = document.querySelector("audio");
    const lyricsElement = document.querySelector("#lyrics");
    const tituloElement = document.querySelector(".titulo");

    // --- DATOS DE LAS LETRAS (sin cambios) ---
    const lyricsData = [
      { text: "At the time", time: 15 },
      { text: "The whisper of birds", time: 18 },
      { text: "Lonely before the sun cried", time: 27 },
      { text: "Fell from the sky", time: 32 },
      { text: "Like water drops", time: 33 },
      { text: "Where I'm now? I don't know why", time: 41 },
      { text: "Nice butterflies in my hands", time: 47 },
      { text: "Too much light for twilight", time: 54 },
      { text: "In the mood for the flowers love", time: 59 },
      { text: "That vision", time: 67 },
      { text: "Really strong, blew my mind", time: 72 },
      { text: "Silence Let me see what it was", time: 78 },
      { text: "I only want to live in clouds", time: 83 },
      { text: "Where I'm now? I don't know why", time: 91 },
      { text: "Nice butterflies in my hands", time: 97 },
      { text: "Too much light for twilight", time: 104 },
      { text: "In the mood for the flowers love", time: 108 },
      { text: "At the time", time: 144 },
      { text: "The whisper of birds", time: 148 },
      { text: "Lonely before the sun cried", time: 153 },
      { text: "Fell from the sky", time: 158 },
      { text: "Like water drops", time: 164 },
      { text: "Where I'm now? I don't know why", time: 169 },
      { text: "Nice butterflies in my hands", time: 176 },
      { text: "Too much light for twilight", time: 183 },
      { text: "In the mood for the flowers", time: 188 },
      { text: "Love.", time: 140 },
    ];

    // --- LÓGICA DE SINCRONIZACIÓN DE LETRAS ---

    let currentLyric = "";

    // MEJORA 1: Usamos el evento 'timeupdate' del audio. Es mucho más preciso y eficiente que setInterval.
    audio.addEventListener('timeupdate', () => {
        const time = Math.floor(audio.currentTime);
        
        // Buscamos la última letra que ya debería haber aparecido.
        const currentLine = lyricsData.slice().reverse().find(line => time >= line.time);

        if (currentLine && currentLyric !== currentLine.text) {
            currentLyric = currentLine.text;
            
            // MEJORA 2: Dejamos que CSS se encargue de la animación.
            // Primero hacemos la línea invisible para cambiar el texto.
            lyricsElement.style.opacity = 0;

            // Esperamos un instante para que la opacidad se aplique antes de cambiar el texto y volver a mostrarlo.
            setTimeout(() => {
                lyricsElement.innerHTML = currentLyric;
                lyricsElement.style.opacity = 1;
            }, 250); // 250ms para un efecto de fade-out y fade-in

        } else if (!currentLine && currentLyric !== "") {
            // Si no hay línea (ej. al principio), la ocultamos.
            lyricsElement.style.opacity = 0;
            currentLyric = "";
        }
    });


    // --- LÓGICA PARA OCULTAR EL TÍTULO ---

    function ocultarTitulo() {
        if (!tituloElement) return; // Salir si no se encuentra el título

        tituloElement.style.animation = "fadeOut 3s ease-in-out forwards";

        // MEJORA 3: Escuchamos el final de la animación para ocultar el elemento.
        // Es más robusto que un setTimeout.
        tituloElement.addEventListener('animationend', () => {
            tituloElement.style.display = "none";
        }, { once: true }); // { once: true } hace que el evento se escuche solo una vez.
    }

    // Llama a la función después de 216 segundos (sin cambios)
    setTimeout(ocultarTitulo, 216000);

});