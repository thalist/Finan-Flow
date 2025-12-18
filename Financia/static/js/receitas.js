document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------
    // Pegando os dados do template
    // -----------------------------
    const graficoLinha = document.getElementById("graficoReceitasLinha");
    const graficoPizza = document.getElementById("graficoReceitasCategoria");

    // Esses datasets vêm do contexto do Django: 
    // meses, valores, categorias e valores_categorias
    const meses = JSON.parse(graficoLinha.dataset.meses || "[]");
    const valoresReceitas = JSON.parse(graficoLinha.dataset.valores || "[]");

    const categorias = JSON.parse(graficoPizza.dataset.categorias || "[]");
    const valoresCategorias = JSON.parse(graficoPizza.dataset.valores_categorias || "[]");

    // =======================
    // GRÁFICO LINHA - RECEITAS
    // =======================
    new Chart(graficoLinha, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Receitas',
                data: valoresReceitas,
                borderColor: '#10B780',
                backgroundColor: '#279e768f',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // =======================
    // GRÁFICO PIZZA - RECEITAS POR CATEGORIA
    // =======================
    new Chart(graficoPizza, {
        type: "pie",
        data: {
            labels: categorias,
            datasets: [{
                data: valoresCategorias,
                backgroundColor: ["#0C1E66", "#FF4B3E", "#10B780", "#FFC700", "#6A0DAD", "#FF69B4"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 20,
                        padding: 15
                    }
                }
            }
        }
    });
});

// =======================
// TOGGLE THEME
// =======================
const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        Chart.defaults.color = "#fff";
    } else {
        localStorage.setItem("theme", "light");
        Chart.defaults.color = "#000";
    }
});

// Carregar tema
window.onload = function () {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        Chart.defaults.color = "#fff";
    }
};
