const display = document.getElementById("display");
const historyDiv = document.getElementById("history");

let history = JSON.parse(localStorage.getItem("history")) || [];

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);

        history.push(display.value + " = " + result);
        localStorage.setItem("history", JSON.stringify(history));

        updateHistory();

        display.value = result;
    } catch {
        display.value = "Erreur";
    }
}

function updateHistory() {
    historyDiv.innerHTML = history.slice(-5).reverse().join("<br>");
}

updateHistory();

/* MODE SCIENTIFIQUE */
function toggleScientific() {
    document.getElementById("scientific").classList.toggle("hidden");
}

/* MODE SOMBRE / CLAIR */
function toggleTheme() {
    document.body.classList.toggle("light");
}

/* SUPPORT CLAVIER */
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        appendValue(e.key);
    }
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});
