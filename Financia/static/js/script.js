console.log("STATIC OK");


const ctx = document.getElementById('evolucaoMensal');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Receitas',
                data: [5800, 6000, 5000, 7500, 6400, 6500],
                backgroundColor: '#0FAF68',
                borderRadius: 8,
                barPercentage: 0.5
            },
            {
                label: 'Despesas',
                data: [4000, 4800, 3700, 5100, 4300, 4200],
                backgroundColor: '#E63946',
                borderRadius: 8,
                barPercentage: 0.5
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value / 1000 + 'k'
                },
                grid: { color: '#dcdcdc' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});


// =======================
// GRÁFICO - DESPESAS POR CATEGORIA
// =======================

const ctx2 = document.getElementById("graficoCategorias");

new Chart(ctx2, {
    type: "pie",
    data: {
        labels: ["Moradia", "Alimentação", "Compras", "Educação", "Contas"],
        datasets: [{
            data: [1800, 607.55, 320, 297, 180.45],
            backgroundColor: [
                "#0C1E66",  // Moradia
                "#FF4B3E",  // Alimentação
                "#DA13B8",  // Compras
                "#1BA7F0",  // Educação
                "#FFDD33"   // Contas (amarelo igual a imagem)
            ],
            borderWidth: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false // tira legenda do Chart.js (pois você já tem lista do lado)
            }
        }
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const btnReceita = document.getElementById("btnReceita");
    const btnDespesa = document.getElementById("btnDespesa");
    const btnSubmit = document.getElementById("btnSubmit");

    btnReceita.addEventListener("click", function () {
        btnReceita.classList.add("btn-receita-active");
        btnDespesa.classList.remove("btn-despesa-active");

        btnSubmit.classList.add("btn-receita-active");
        btnSubmit.classList.remove("btn-despesa-active");

        btnSubmit.textContent = "Adicionar nova receita";
    });

    btnDespesa.addEventListener("click", function () {
        btnDespesa.classList.add("btn-despesa-active");
        btnReceita.classList.remove("btn-receita-active");

        btnSubmit.classList.add("btn-despesa-active");
        btnSubmit.classList.remove("btn-receita-active");

        btnSubmit.textContent = "Adicionar nova despesa";
    });
});





document.addEventListener("DOMContentLoaded", function () {

    const btnNovaCategoria = document.getElementById("btnNovaCategoria");

    btnNovaCategoria.addEventListener("click", function () {
        const modal = new bootstrap.Modal(document.getElementById("modalCategoria"));
        modal.show();
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














