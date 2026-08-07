```javascript
/* =========================================================
   DISTRIBUPRO
   SCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPAIS
    ====================================================== */

    const menuItems = document.querySelectorAll(".menu-item");
    const pages = document.querySelectorAll(".page");

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const sidebar = document.getElementById("sidebar");

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");


    /* =====================================================
       NAVEGAÇÃO ENTRE PÁGINAS
    ====================================================== */

    function navigateToPage(pageName) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        menuItems.forEach(item => {
            item.classList.remove("active");
        });

        const selectedPage = document.getElementById(`page-${pageName}`);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        const selectedMenu = document.querySelector(
            `.menu-item[data-page="${pageName}"]`
        );

        if (selectedMenu) {
            selectedMenu.classList.add("active");
        }

        /* Fecha o menu no celular */

        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }

        /* Volta para o topo */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       CLIQUE NOS ITENS DO MENU
    ====================================================== */

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            navigateToPage(page);

        });

    });


    /* =====================================================
       BOTÕES DATA-PAGE
    ====================================================== */

    document.querySelectorAll("[data-page]").forEach(button => {

        if (button.classList.contains("menu-item")) {
            return;
        }

        button.addEventListener("click", () => {

            const page = button.dataset.page;

            if (page) {
                navigateToPage(page);
            }

        });

    });


    /* =====================================================
       MENU MOBILE
    ====================================================== */

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* Fecha sidebar ao clicar fora */

    document.addEventListener("click", event => {

        if (window.innerWidth > 900) {
            return;
        }

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    });


    /* =====================================================
       SISTEMA DE MODAIS
    ====================================================== */

    function openModal(modalId) {

        const modal = document.getElementById(modalId);

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    function closeModal(modalId) {

        const modal = document.getElementById(modalId);

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    /* =====================================================
       BOTÕES DE FECHAR MODAL
    ====================================================== */

    document.querySelectorAll("[data-close-modal]").forEach(button => {

        button.addEventListener("click", () => {

            const modalId = button.dataset.closeModal;

            closeModal(modalId);

        });

    });


    /* =====================================================
       FECHAR MODAL CLICANDO FORA
    ====================================================== */

    document.querySelectorAll(".modal-overlay").forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {

                overlay.classList.remove("active");

                document.body.classList.remove("modal-open");

            }

        });

    });


    /* =====================================================
       FECHAR MODAL COM ESC
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        document.querySelectorAll(".modal-overlay.active")
            .forEach(modal => {

                modal.classList.remove("active");

            });

        document.body.classList.remove("modal-open");

    });


    /* =====================================================
       NOVO CLIENTE
    ====================================================== */

    const newClientButton =
        document.getElementById("newClientButton");

    if (newClientButton) {

        newClientButton.addEventListener("click", () => {

            openModal("clientModal");

        });

    }


    /* =====================================================
       NOVO PRODUTO
    ====================================================== */

    const newProductButton =
        document.getElementById("newProductButton");

    if (newProductButton) {

        newProductButton.addEventListener("click", () => {

            openModal("productModal");

        });

    }


    /* =====================================================
       NOVO PEDIDO
    ====================================================== */

    const newOrderButton =
        document.getElementById("newOrderButton");

    if (newOrderButton) {

        newOrderButton.addEventListener("click", () => {

            openModal("orderModal");

        });

    }


    /* =====================================================
       BOTÕES "NOVO PEDIDO" EM OUTRAS PÁGINAS
    ====================================================== */

    document.querySelectorAll(".btn").forEach(button => {

        const text = button.textContent.trim().toLowerCase();

        if (
            text.includes("novo pedido") &&
            button.id !== "newOrderButton"
        ) {

            button.addEventListener("click", () => {

                openModal("orderModal");

            });

        }

    });


    /* =====================================================
       FORMULÁRIO DE CLIENTE
    ====================================================== */

    const clientForm =
        document.getElementById("clientForm");

    if (clientForm) {

        clientForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("clientName").value.trim();

            if (!name) {

                showToast(
                    "Atenção",
                    "Informe o nome do cliente."
                );

                return;

            }

            const tableBody =
                document.getElementById("clientsTableBody");

            if (tableBody) {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>
                        <strong>${escapeHTML(name)}</strong>
                    </td>

                    <td>
                        —
                    </td>

                    <td>
                        —
                    </td>

                    <td>
                        R$ 0,00
                    </td>

                    <td>
                        R$ 0,00
                    </td>

                    <td>
                        <span class="status green">
                            Ativo
                        </span>
                    </td>

                `;

                tableBody.prepend(row);

            }

            clientForm.reset();

            closeModal("clientModal");

            showToast(
                "Cliente cadastrado",
                `${name} foi adicionado com sucesso.`
            );

        });

    }


    /* =====================================================
       FORMULÁRIO DE PRODUTO
    ====================================================== */

    const productForm =
        document.getElementById("productForm");

    if (productForm) {

        productForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                document.getElementById("productName").value.trim();

            if (!name) {

                showToast(
                    "Atenção",
                    "Informe o nome do produto."
                );

                return;

            }

            const tableBody =
                document.getElementById("productsTableBody");

            if (tableBody) {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>
                        <strong>${escapeHTML(name)}</strong>
                    </td>

                    <td>
                        —
                    </td>

                    <td>
                        Outros
                    </td>

                    <td>
                        R$ 0,00
                    </td>

                    <td>
                        R$ 0,00
                    </td>

                    <td>
                        0%
                    </td>

                    <td>
                        0
                    </td>

                `;

                tableBody.prepend(row);

            }

            productForm.reset();

            closeModal("productModal");

            showToast(
                "Produto cadastrado",
                `${name} foi adicionado ao catálogo.`
            );

        });

    }


    /* =====================================================
       FORMULÁRIO DE PEDIDO
    ====================================================== */

    const orderForm =
        document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", event => {

            event.preventDefault();

            const client =
                orderForm.querySelector("select").value;

            if (!client) {

                showToast(
                    "Atenção",
                    "Selecione um cliente."
                );

                return;

            }

            orderForm.reset();

            updateOrderTotal();

            closeModal("orderModal");

            showToast(
                "Pedido criado",
                `Pedido de ${client} criado com sucesso.`
            );

        });

    }


    /* =====================================================
       TOTAL DO PEDIDO
    ====================================================== */

    const orderModal =
        document.getElementById("orderModal");

    if (orderModal) {

        const productSelect =
            orderModal.querySelectorAll("select")[1];

        const quantityInput =
            orderModal.querySelector('input[type="number"]');

        if (productSelect) {

            productSelect.addEventListener(
                "change",
                updateOrderTotal
            );

        }

        if (quantityInput) {

            quantityInput.addEventListener(
                "input",
                updateOrderTotal
            );

        }

    }


    function updateOrderTotal() {

        const modal =
            document.getElementById("orderModal");

        if (!modal) {
            return;
        }

        const productSelect =
            modal.querySelectorAll("select")[1];

        const quantityInput =
            modal.querySelector('input[type="number"]');

        const totalElement =
            modal.querySelector(".order-total strong");

        if (
            !productSelect ||
            !quantityInput ||
            !totalElement
        ) {
            return;
        }

        const prices = {

            "Refrigerante 2L": 8.50,

            "Suco Natural 1L": 6.90,

            "Biscoito Tradicional": 4.50,

            "Detergente 500ml": 3.80

        };

        const product =
            productSelect.value;

        const quantity =
            Number(quantityInput.value) || 0;

        const price =
            prices[product] || 0;

        const total =
            price * quantity;

        totalElement.textContent =
            formatCurrency(total);

    }


    /* =====================================================
       PESQUISA GLOBAL
    ====================================================== */

    const globalSearch =
        document.getElementById("globalSearch");

    if (globalSearch) {

        globalSearch.addEventListener("keydown", event => {

            if (event.key !== "Enter") {
                return;
            }

            const search =
                globalSearch.value.trim().toLowerCase();

            if (!search) {
                return;
            }

            performGlobalSearch(search);

        });

    }


    function performGlobalSearch(search) {

        const searchablePages = [

            {
                name: "clientes",
                terms: [
                    "cliente",
                    "clientes",
                    "joão",
                    "mercado"
                ]
            },

            {
                name: "produtos",
                terms: [
                    "produto",
                    "produtos",
                    "estoque",
                    "refrigerante",
                    "suco",
                    "biscoito"
                ]
            },

            {
                name: "pedidos",
                terms: [
                    "pedido",
                    "pedidos",
                    "venda",
                    "vendas"
                ]
            },

            {
                name: "financeiro",
                terms: [
                    "financeiro",
                    "contas",
                    "dinheiro",
                    "pagamento"
                ]
            },

            {
                name: "entregas",
                terms: [
                    "entrega",
                    "entregas",
                    "rota",
                    "motorista"
                ]
            },

            {
                name: "relatorios",
                terms: [
                    "relatório",
                    "relatorios",
                    "indicadores",
                    "resultado"
                ]

            }

        ];


        let foundPage = null;


        searchablePages.forEach(page => {

            page.terms.forEach(term => {

                if (
                    term.includes(search) ||
                    search.includes(term)
                ) {

                    foundPage = page.name;

                }

            });

        });


        if (foundPage) {

            navigateToPage(foundPage);

            showToast(
                "Pesquisa",
                `Abrindo ${getPageLabel(foundPage)}.`
            );

        } else {

            showToast(
                "Pesquisa",
                "Nenhum resultado encontrado."
            );

        }

    }


    /* =====================================================
       CTRL + K
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (globalSearch) {

                globalSearch.focus();

                globalSearch.select();

            }

        }

    });


    /* =====================================================
       PESQUISA NAS TABELAS
    ====================================================== */

    document.querySelectorAll(".filter-search input")
        .forEach(input => {

            input.addEventListener("input", () => {

                const search =
                    input.value.toLowerCase().trim();

                const panel =
                    input.closest(".panel");

                if (!panel) {
                    return;
                }

                const rows =
                    panel.querySelectorAll("tbody tr");

                rows.forEach(row => {

                    const text =
                        row.textContent.toLowerCase();

                    if (
                        text.includes(search)
                    ) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            });

        });


    /* =====================================================
       FILTRO DE STATUS
    ====================================================== */

    document.querySelectorAll(".filter-select")
        .forEach(select => {

            select.addEventListener("change", () => {

                const value =
                    select.value.toLowerCase();

                const panel =
                    select.closest(".panel");

                if (!panel) {
                    return;
                }

                const rows =
                    panel.querySelectorAll("tbody tr");

                if (
                    value.includes("todos")
                ) {

                    rows.forEach(row => {
                        row.style.display = "";
                    });

                    return;

                }

                rows.forEach(row => {

                    const text =
                        row.textContent.toLowerCase();

                    if (
                        text.includes(value)
                    ) {

                        row.style.display = "";

                    } else {

                        row.style.display = "none";

                    }

                });

            });

        });


    /* =====================================================
       NOTIFICAÇÕES
    ====================================================== */

    const notificationButton =
        document.querySelector(".notification-button");

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showToast(
                    "Notificações",
                    "Você possui 4 notificações pendentes."
                );

            }
        );

    }


    /* =====================================================
       BOTÃO DE AJUDA
    ====================================================== */

    const helpButton =
        document.querySelector(".topbar-button");

    if (helpButton) {

        helpButton.addEventListener("click", () => {

            showToast(
                "Central de ajuda",
                "Em breve você poderá acessar tutoriais e suporte."
            );

        });

    }


    /* =====================================================
       BOTÕES GENÉRICOS
    ====================================================== */

    document.querySelectorAll(".btn").forEach(button => {

        const text =
            button.textContent.trim().toLowerCase();


        if (
            text.includes("nova venda")
        ) {

            button.addEventListener("click", () => {

                openModal("orderModal");

            });

        }


        if (
            text.includes("nova compra")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Compras",
                    "Módulo de nova compra preparado para integração."
                );

            });

        }


        if (
            text.includes("nova rota")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Logística",
                    "Módulo de criação de rotas preparado."
                );

            });

        }


        if (
            text.includes("novo lançamento")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Financeiro",
                    "Módulo de lançamento financeiro preparado."
                );

            });

        }


        if (
            text.includes("movimentação")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Estoque",
                    "Módulo de movimentação de estoque preparado."
                );

            });

        }

    });


    /* =====================================================
       BOTÕES DE RELATÓRIO
    ====================================================== */

    document.querySelectorAll(".panel-action")
        .forEach(button => {

            const text =
                button.textContent.trim().toLowerCase();

            if (
                text.includes("relatório") ||
                text.includes("relatorios")
            ) {

                button.addEventListener("click", () => {

                    navigateToPage("relatorios");

                });

            }

        });


    /* =====================================================
       BOTÕES DE SALVAR
    ====================================================== */

    document.querySelectorAll("button")
        .forEach(button => {

            const text =
                button.textContent.trim().toLowerCase();

            if (
                text.includes("salvar alterações")
            ) {

                button.addEventListener("click", () => {

                    showToast(
                        "Salvo",
                        "As alterações foram salvas com sucesso."
                    );

                });

            }

        });


    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimeout;


    function showToast(title, message) {

        if (!toast) {
            return;
        }

        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;

        toast.classList.add("show");


        clearTimeout(toastTimeout);


        toastTimeout =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3500);

    }


    /* =====================================================
       FORMATAÇÃO DE MOEDA
    ====================================================== */

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        ).format(value);

    }


    /* =====================================================
       SEGURANÇA BÁSICA CONTRA HTML INJETADO
    ====================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text;

        return div.innerHTML;

    }


    /* =====================================================
       NOME DA PÁGINA
    ====================================================== */

    function getPageLabel(page) {

        const labels = {

            dashboard: "Dashboard",

            vendas: "Vendas",

            pedidos: "Pedidos",

            clientes: "Clientes",

            produtos: "Produtos",

            estoque: "Estoque",

            compras: "Compras",

            entregas: "Entregas",

            financeiro: "Financeiro",

            relatorios: "Relatórios",

            configuracoes: "Configurações"

        };

        return labels[page] || page;

    }


    /* =====================================================
       ANIMAÇÃO DOS CARDS
    ====================================================== */

    const cards =
        document.querySelectorAll(".stat-card");


    cards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.05}s`;

    });


    /* =====================================================
       INICIALIZAÇÃO
    ====================================================== */

    updateOrderTotal();


    console.log(
        "DistribuPro iniciado com sucesso."
    );

});
```
