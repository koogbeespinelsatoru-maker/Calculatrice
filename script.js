// VERSION 39fb04 - PRODUCTION READY (Vercel)

const display = document.getElementById("display");
const historyDiv = document.getElementById("history");

// Charger historique
let history = JSON.parse(localStorage.getItem("history")) || [];

/* =========================
   INPUT / DISPLAY
========================= */

function appendValue(value) {
    if (display.value === "Erreur") display.value = "";
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/* =========================
   CALCUL SÉCURISÉ
========================= */

// Remplace eval par Function (plus propre)
function safeEval(expression) {
    try {
        return Function('"use strict";return (' + expression + ')')();
    } catch {
        return "Erreur";
    }
}

function calculate() {
    let expression = display.value;

    let result = safeEval(expression);

    if (result !== "Erreur") {
        saveHistory(expression, result);
        display.value = result;
    } else {
        display.value = "Erreur";
    }
}

/* =========================
   HISTORIQUE
========================= */

function saveHistory(exp, result) {
    history.push(`${exp} = ${result}`);
    if (history.length > 50) history.shift();

    localStorage.setItem("history", JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    historyDiv.innerHTML = history.slice(-5).reverse().join("<br>");
}

updateHistory();

/* =========================
   MODE SCIENTIFIQUE
========================= */

function toggleScientific() {
    document.getElementById("scientific").classList.toggle("hidden");
}

/* =========================
   THÈME SOMBRE / CLAIR
========================= */

function toggleTheme() {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light"));
}

// Charger thème
if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("light");
}

/* =========================
   SUPPORT CLAVIER
========================= */

document.addEventListener("keydown", (e) => {

    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        appendValue(e.key);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    }

    if (e.key === "Backspace") {
        deleteLast();
    }

    if (e.key === "Escape") {
        clearDisplay();
    }
});

/* =========================
   PROTECTION SIMPLE
========================= */

// Empêche certains caractères dangereux
display.addEventListener("input", () => {
    display.value = display.value.replace(/[^0-9+\-*/().]/g, "");
});
