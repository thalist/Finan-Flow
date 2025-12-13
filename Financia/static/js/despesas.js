document.addEventListener("DOMContentLoaded", function () {

    // GRÁFICO LINHA - DESPESAS
    new Chart(document.getElementById("graficoDespesasLinha"), {
        type: 'line',
        data: {
            labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Despesas',
                data: [100, 200, 400, 222, 180, 250],
                borderColor: '#E63946',
                backgroundColor: 'rgba(230,57,70,0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        }
    });

    // GRÁFICO PIZZA - DESPESAS POR CATEGORIA
    new Chart(document.getElementById("graficoDespesasCategoria"), {
        type: "pie",
        data: {
            labels: ["Moradia", "Alimentação", "Compras"],
            datasets: [{
                data: [1800, 607.55, 320],
                backgroundColor: ["#0C1E66", "#FF4B3E", "#DA13B8"],
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
