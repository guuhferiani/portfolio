document.addEventListener('DOMContentLoaded', () => {
    const toggleTheme = document.getElementById("toggleTheme");
    const rootHtml = document.documentElement;
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    const menuLinks = document.querySelectorAll(".menu-link");
    const menuHamburger = document.getElementById('menuHamburger');
    const menuMobile = document.getElementById('menuMobile');
    const icon = menuHamburger?.querySelector('i');

    // Alternar tema (claro/escuro)
    function changeTheme() {
        const currentTheme = rootHtml.getAttribute("data-theme");
        const isDark = currentTheme === "dark";
        rootHtml.setAttribute("data-theme", isDark ? "light" : "dark");
        toggleTheme.classList.toggle("bi-sun", !isDark);
        toggleTheme.classList.toggle("bi-moon-stars", isDark);
    }

    if (toggleTheme) {
        toggleTheme.addEventListener("click", changeTheme);
    }

    // Acordeões
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle("active");
        });
    });

    // Ativar link clicado no menu
    menuLinks.forEach(item => {
        item.addEventListener("click", () => {
            menuLinks.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // Fecha o menu mobile ao clicar no link
            if (menuMobile?.classList.contains('active')) {
                menuMobile.classList.remove('active');
                if (icon) {
                    icon.classList.remove('bi-x-lg');
                    icon.classList.add('bi-list');
                }
            }
        });
    });

    // Alternar menu mobile e ícone
    function toggleMenu() {
        const isOpen = menuMobile.classList.toggle('active');
        if (icon) {
            icon.classList.toggle('bi-list', !isOpen);
            icon.classList.toggle('bi-x-lg', isOpen);
        }
    }

    if (menuHamburger) {
        menuHamburger.addEventListener('click', toggleMenu);
    }

    // Máscara do telefone
    const telefoneInput = document.getElementById("telefone");

    if (telefoneInput) {
        telefoneInput.addEventListener("input", (e) => {
            let input = e.target.value.replace(/\D/g, "");
            if (input.length > 11) input = input.slice(0, 11);

            let formatted = "";
            if (input.length > 0) formatted += "(" + input.slice(0, 2);
            if (input.length >= 3) formatted += ") " + input.slice(2, 7);
            if (input.length >= 8) formatted += "-" + input.slice(7, 11);

            e.target.value = formatted;
        });
    }

    // Validação e envio do formulário com limpeza
    const form = document.querySelector(".form-contato");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Impede a atualização da página

            const telefoneValor = telefoneInput?.value.replace(/\D/g, "");
            if (!telefoneValor || telefoneValor.length !== 11) {
                alert("Por favor, insira um telefone válido com 11 dígitos.");
                telefoneInput?.focus();
                return;
            }

            const formData = new FormData(form);
            const action = form.getAttribute("action");

            try {
                const response = await fetch(action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    alert("Mensagem enviada com sucesso!");
                    form.reset();
                } else {
                    alert("Erro ao enviar a mensagem. Tente novamente.");
                }

            } catch (error) {
                alert("Erro de conexão. Verifique sua internet.");
            }
        });
    }
});