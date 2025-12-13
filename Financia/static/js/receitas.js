document.addEventListener("DOMContentLoaded", function () {

    // GRÁFICO LINHA - RECEITAS
    new Chart(document.getElementById("graficoReceitasLinha"), {
        type: 'line',
        data: {
            labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Receitas',
                data: [500, 465, 470, 522, 500, 550],
                borderColor: '#10B780',
                backgroundColor: '#279e768f',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        }
    });

    // GRÁFICO PIZZA - RECEITAS POR CATEGORIA
    new Chart(document.getElementById("graficoReceitasCategoria"), {
        type: "pie",
        data: {
            labels: ["Salário", "Freenlance"],
            datasets: [{
                data: [1800, 1200],
                backgroundColor: ["#0C1E66", "#FF4B3E"],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            }
        }
    });

});







const toggleBtn = document.getElementById("toggle-theme");

toggleBtn.addEventListener("click", function () {

    // Alternar classe
    document.body.classList.toggle("dark-mode");

    // Salvar preferência
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
