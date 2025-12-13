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
