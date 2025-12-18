document.addEventListener("DOMContentLoaded", function () {

    // =======================
    // FUNÇÃO AUXILIAR: gerar cores aleatórias
    // =======================
    function gerarCores(n) {
        const cores = [];
        for (let i = 0; i < n; i++) {
            const hue = Math.floor(Math.random() * 360);
            cores.push(`hsl(${hue}, 70%, 50%)`);
        }
        return cores;
    }

    // =======================
    // GRÁFICO DE BARRAS - EVOLUÇÃO MENSAL
    // =======================
    const ctx = document.getElementById('evolucaoMensal');
    if (ctx) {
        const meses = JSON.parse(ctx.dataset.meses || '[]');
        const receitasMensal = JSON.parse(ctx.dataset.receitas || '[]');
        const despesasMensal = JSON.parse(ctx.dataset.despesas || '[]');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [
                    {
                        label: 'Receitas',
                        data: receitasMensal,
                        backgroundColor: '#0FAF68',
                        borderRadius: 8,
                        barPercentage: 0.5
                    },
                    {
                        label: 'Despesas',
                        data: despesasMensal,
                        backgroundColor: '#E63946',
                        borderRadius: 8,
                        barPercentage: 0.5
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        },
                        grid: { color: '#dcdcdc' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // =======================
    // GRÁFICO DE PIZZA - DESPESAS POR CATEGORIA
    // =======================
    const ctx2 = document.getElementById("graficoCategorias");
    if (ctx2) {
        const categorias = JSON.parse(ctx2.dataset.categorias || '[]');
        const valores = JSON.parse(ctx2.dataset.valores || '[]');

        // Cores: fixas se houverem poucas, senão gera dinamicamente
        let cores = ["#0C1E66", "#FF4B3E", "#DA13B8", "#1BA7F0", "#FFDD33"];
        if (categorias.length > cores.length) {
            cores = cores.concat(gerarCores(categorias.length - cores.length));
        }

        new Chart(ctx2, {
            type: "pie",
            data: {
                labels: categorias,
                datasets: [{
                    data: valores,
                    backgroundColor: cores.slice(0, categorias.length),
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // =======================
    // Tema escuro / claro
    // =======================
    const toggleBtn = document.getElementById("toggle-theme");
    function aplicarTema() {
        const isDark = document.body.classList.contains("dark-mode");
        Chart.defaults.color = isDark ? "#fff" : "#000";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            aplicarTema();
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    }

    // Aplica tema salvo
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
    aplicarTema();

});
