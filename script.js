/* =========================================================
   MÃE DINHA — SCRIPT.JS
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

// COLOQUE AQUI O NÚMERO DO WHATSAPP
// Formato: código do país + DDD + número
// Exemplo: 5561982584656

const WHATSAPP_NUMBER = "5561982584656";


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initMobileMenu();

    initHeader();

    initScrollReveal();

    initBackToTop();

    initEntityModal();

    initWhatsApp();

    initContactForm();

    initParticles();

});


/* =========================================================
   PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("loaded");

        }, 700);

    });

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.getElementById("navigation");


    if (!menuToggle || !navigation) return;


    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });


    const links =
        navigation.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

            menuToggle.classList.remove("active");

        });

    });

}


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

function initHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;


    function checkScroll() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        checkScroll,
        { passive: true }
    );


    checkScroll();

}


/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
   ========================================================= */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".about-visual, " +
        ".entity-card, " +
        ".consultation-card, " +
        ".testimonial-card, " +
        ".contact-info, " +
        ".contact-form-wrapper"
    );


    if (!elements.length) return;


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   MODAL DAS ENTIDADES
   ========================================================= */

function initEntityModal() {

    const modal =
        document.getElementById("entityModal");

    const overlay =
        document.getElementById("modalOverlay");

    const closeButton =
        document.getElementById("modalClose");

    const title =
        document.getElementById("modalTitle");

    const label =
        document.getElementById("modalLabel");

    const description =
        document.getElementById(
            "modalDescription"
        );

    const symbol =
        document.getElementById("modalSymbol");

    const colors =
        document.getElementById("modalColors");


    if (!modal) return;


    /*
     * Informações das entidades
     *
     * Você poderá alterar os textos
     * posteriormente.
     */

    const entities = {

        "ze-pilintra": {

            label: "ENTIDADE",

            title: "Zé Pilintra",

            symbol: "🎩",

            description:
                "Espaço dedicado à apresentação da entidade, sua simbologia e à forma como são realizados os atendimentos com Mãe Dinha.",

            colors: [
                "#050505",
                "#a91e32",
                "#f5f5f5"
            ]

        },


        "cigana-safira": {

            label: "ENTIDADE",

            title: "Cigana Safira",

            symbol: "🌻",

            description:
                "Uma área especial dedicada à Cigana Safira, com uma identidade visual inspirada em flores, luz, dourado e tons amarelos.",

            colors: [
                "#f1c72d",
                "#d6ad54",
                "#e88a19"
            ]

        },


        "maria-padilha": {

            label: "ENTIDADE",

            title:
                "Dona Maria Padilha Sete Encruzas",

            symbol: "🌹",

            description:
                "Uma apresentação dedicada a Dona Maria Padilha Sete Encruzas, com elementos visuais em vermelho, preto e dourado.",

            colors: [
                "#050505",
                "#a91e32",
                "#d6ad54"
            ]

        },


        "sete-saias": {

            label: "ENTIDADE",

            title:
                "Pomba Gira Sete Saias da Calunga",

            symbol: "🌹",

            description:
                "Uma área dedicada à Pomba Gira Sete Saias da Calunga, utilizando uma identidade visual em tons de preto, vermelho e roxo.",

            colors: [
                "#050505",
                "#a91e32",
                "#743d8f"
            ]

        }

    };


    /*
     * Abrir modal
     */

    const buttons =
        document.querySelectorAll(
            ".entity-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const entityId =
                    button.dataset.entity;

                const entity =
                    entities[entityId];


                if (!entity) return;


                label.textContent =
                    entity.label;


                title.textContent =
                    entity.title;


                description.textContent =
                    entity.description;


                symbol.textContent =
                    entity.symbol;


                colors.innerHTML = "";


                entity.colors.forEach(
                    color => {

                        const span =
                            document.createElement(
                                "span"
                            );

                        span.classList.add(
                            "color"
                        );

                        span.style.background =
                            color;

                        colors.appendChild(
                            span
                        );

                    }
                );


                modal.classList.add(
                    "active"
                );

                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.classList.add(
                    "modal-open"
                );

            }
        );

    });


    /*
     * Fechar modal
     */

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    overlay.addEventListener(
        "click",
        closeModal
    );


    /*
     * Fechar com ESC
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /*
     * Quando clicar em "Agendar consulta"
     * fecha o modal e vai para contato.
     */

    const modalContact =
        document.getElementById(
            "modalContact"
        );


    if (modalContact) {

        modalContact.addEventListener(
            "click",
            () => {

                closeModal();

            }
        );

    }

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function initWhatsApp() {

    const floatingButton =
        document.getElementById(
            "floatingWhatsapp"
        );

    const normalButton =
        document.getElementById(
            "whatsappButton"
        );


    /*
     * Mensagem inicial
     */

    const message =
        encodeURIComponent(
            "Olá, Mãe Dinha! Gostaria de saber mais sobre as consultas e atendimentos."
        );


    /*
     * Link do WhatsApp
     */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    /*
     * Botão flutuante
     */

    if (floatingButton) {

        floatingButton.href =
            whatsappURL;

        floatingButton.target =
            "_blank";

        floatingButton.rel =
            "noopener noreferrer";

    }


    /*
     * Botão da área de contato
     */

    if (normalButton) {

        normalButton.href =
            whatsappURL;

        normalButton.target =
            "_blank";

        normalButton.rel =
            "noopener noreferrer";

    }

}


/* =========================================================
   FORMULÁRIO
   ========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    const messageBox =
        document.getElementById(
            "formMessage"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /*
             * Aqui futuramente vamos
             * conectar o EmailJS.
             */


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const service =
                document.getElementById(
                    "service"
                ).value;


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            /*
             * Validação
             */

            if (
                !name ||
                !phone ||
                !service ||
                !message
            ) {

                showFormMessage(
                    "Preencha todos os campos.",
                    "error"
                );

                return;

            }


            /*
             * Por enquanto apenas
             * mostramos uma mensagem.
             *
             * Depois vamos conectar
             * o EmailJS aqui.
             */

            showFormMessage(
                "Mensagem preenchida com sucesso! Em breve faremos a integração com o WhatsApp/EmailJS.",
                "success"
            );


            /*
             * Limpa o formulário
             */

            form.reset();

        }
    );


    function showFormMessage(
        text,
        type
    ) {

        if (!messageBox) return;


        messageBox.textContent =
            text;


        if (type === "success") {

            messageBox.style.color =
                "#d6ad54";

        } else {

            messageBox.style.color =
                "#e56b7d";

        }


        setTimeout(() => {

            messageBox.textContent =
                "";

        }, 6000);

    }

}


/* =========================================================
   PARTÍCULAS
   ========================================================= */

function initParticles() {

    const particlesContainer =
        document.querySelector(
            ".particles"
        );


    if (!particlesContainer) return;


    /*
     * Quantidade de partículas
     */

    const quantity = 45;


    for (
        let i = 0;
        i < quantity;
        i++
    ) {

        createParticle(
            particlesContainer
        );

    }

}


/* =========================================================
   CRIAR PARTÍCULA
   ========================================================= */

function createParticle(
    container
) {

    const particle =
        document.createElement(
            "span"
        );


    particle.style.position =
        "absolute";


    particle.style.width =
        `${Math.random() * 3 + 1}px`;


    particle.style.height =
        particle.style.width;


    particle.style.borderRadius =
        "50%";


    particle.style.background =
        "rgba(214,173,84,0.7)";


    particle.style.left =
        `${Math.random() * 100}%`;


    particle.style.top =
        `${Math.random() * 100}%`;


    particle.style.opacity =
        `${Math.random() * 0.6 + 0.2}`;


    particle.style.boxShadow =
        "0 0 8px rgba(214,173,84,0.4)";


    const duration =
        Math.random() * 5 + 5;


    const delay =
        Math.random() * 5;


    particle.animate(

        [

            {
                transform:
                    "translateY(0) scale(1)",

                opacity:
                    particle.style.opacity

            },

            {

                transform:
                    `translateY(-${Math.random() * 80 + 30}px) scale(1.5)`,

                opacity: 0.1

            },

            {

                transform:
                    "translateY(0) scale(1)",

                opacity:
                    particle.style.opacity

            }

        ],

        {

            duration:
                duration * 1000,

            delay:
                delay * 1000,

            iterations:
                Infinity,

            easing:
                "ease-in-out"

        }

    );


    container.appendChild(
        particle
    );

}


/* =========================================================
   NAVEGAÇÃO SUAVE
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const header =
                document.getElementById(
                    "header"
                );


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top
                +
                window.scrollY
                -
                headerHeight;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/* =========================================================
   EFEITO DE MOUSE NAS ENTIDADES
   ========================================================= */

document.querySelectorAll(
    ".entity-card"
).forEach(card => {


    card.addEventListener(
        "mousemove",
        event => {

            /*
             * Não aplica no celular.
             */

            if (
                window.innerWidth <= 700
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) /
                35;


            const rotateY =
                (centerX - x) /
                35;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   EFEITO DE CURSOR NO HERO
   ========================================================= */

const hero =
    document.querySelector(
        ".hero"
    );


if (hero) {

    hero.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 700
            ) {

                return;

            }


            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) * 100;


            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) * 100;


            hero.style.backgroundPosition =
                `${x}% ${y}%`;

        }
    );

}


/* =========================================================
   ANIMAÇÃO DO BOTÃO DO MENU
   ========================================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            menuToggle.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   MENSAGEM DE BOAS-VINDAS NO CONSOLE
   ========================================================= */

console.log(
    "%c✦ Mãe Dinha ✦",
    "color:#d6ad54;font-size:20px;font-weight:bold;"
);

console.log(
    "Site carregado com sucesso."
);
