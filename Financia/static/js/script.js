console.log("STATIC OK");

// =======================
// MODAL NOVA TRANSAÇÃO
// =======================
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

// =======================
// MODAL NOVA CATEGORIA
// =======================
document.addEventListener("DOMContentLoaded", function () {
    const btnNovaCategoria = document.getElementById("btnNovaCategoria");

    if (btnNovaCategoria) {
        btnNovaCategoria.addEventListener("click", function () {
            const modal = new bootstrap.Modal(document.getElementById("modalCategoria"));
            modal.show();
        });
    }
});

// =======================
// TOGGLE THEME
// =======================
const toggleBtn = document.getElementById("toggle-theme");

if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            // Chart.defaults.color = "#fff";  ← removido
        } else {
            localStorage.setItem("theme", "light");
            // Chart.defaults.color = "#000";  ← removido
        }
    });
}

// Carregar tema
window.onload = function () {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        // Chart.defaults.color = "#fff";  ← removido
    }
};
