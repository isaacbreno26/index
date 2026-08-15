/* =========================
   VARIÁVEIS
========================= */

let selectedPlace = "";

let selectedDate = "";

let selectedMessage = "";


/* =========================
   INÍCIO
========================= */

document.addEventListener("DOMContentLoaded", () => {

    typeIntro();

    createFloatingHearts();

    setMinimumDate();

});


/* =========================
   TEXTO DIGITANDO
========================= */

function typeIntro() {

    const text =
        "Olá, me desculpa, pela demora kk  Eu tive um trabalhinho pra fazer isso aqui... Mas como você é bem gatinha te acho engraçada tambem , eu achei que valia a pena o esforço. ❤️";

    const element =
        document.getElementById("introText");

    let index = 0;


    function type() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            setTimeout(type, 35);

        }

    }


    type();

}


/* =========================
   TROCAR DE PÁGINA
========================= */

function nextPage(pageNumber) {

    const currentPage =
        document.querySelector(".page.active");

    const nextPage =
        document.getElementById(
            `page${pageNumber}`
        );


    if (!nextPage) {
        return;
    }


    currentPage.classList.remove("active");

    setTimeout(() => {

        nextPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 100);

}


/* =========================
   ESCOLHER LOCAL
========================= */

function selectPlace(button, place) {

    const options =
        document.querySelectorAll(".option");


    options.forEach(option => {

        option.classList.remove("selected");

    });


    button.classList.add("selected");


    selectedPlace = place;


    const continueButton =
        document.getElementById(
            "placeButton"
        );


    continueButton.classList.remove(
        "disabled"
    );


    continueButton.textContent =
        "Continuar ❤️";

}


/* =========================
   DEFINIR DATA MÍNIMA
========================= */

function setMinimumDate() {

    const dateInput =
        document.getElementById("date");


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayFormatted =
        `${year}-${month}-${day}`;


    dateInput.min =
        todayFormatted;

}


/* =========================
   VERIFICAR DATA
========================= */

function checkDate() {

    const dateInput =
        document.getElementById("date");


    selectedDate =
        dateInput.value;


    const button =
        document.getElementById(
            "dateButton"
        );


    if (selectedDate !== "") {

        button.classList.remove(
            "disabled"
        );

        button.textContent =
            "Continuar ❤️";

    } else {

        button.classList.add(
            "disabled"
        );

        button.textContent =
            "Escolha uma data";

    }

}


/* =========================
   FINALIZAR CONVITE
========================= */

function finishInvitation() {

    const messageInput =
        document.getElementById(
            "message"
        );


    selectedMessage =
        messageInput.value.trim();


    if (!selectedPlace) {

        alert(
            "Escolha um lugar primeiro ❤️"
        );

        nextPage(3);

        return;
    }


    if (!selectedDate) {

        alert(
            "Escolha uma data primeiro ❤️"
        );

        nextPage(4);

        return;
    }


    /*
       Coloca as informações
       na tela final.
    */

    document.getElementById(
        "finalPlace"
    ).textContent =
        selectedPlace;


    document.getElementById(
        "finalDate"
    ).textContent =
        formatDate(selectedDate);


    document.getElementById(
        "finalMessage"
    ).textContent =
        selectedMessage ||
        "Nenhuma observação";


    nextPage(6);

}


/* =========================
   FORMATAR DATA
========================= */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


/* =========================
   CONFIRMAR ENCONTRO
========================= */

function confirmDate() {

    const button = document.querySelector(
        "#page6 .main-button"
    );

    // Evita clicar várias vezes
    button.disabled = true;

    button.textContent = "Enviando... ❤️";


    // Dados que serão enviados para o EmailJS
    const templateParams = {

        local: selectedPlace,

        data: formatDate(selectedDate),

        observacao:
            selectedMessage ||
            "Nenhuma observação"

    };


    console.log("Enviando dados:", templateParams);


    emailjs.send(
        "service_mqsl3bg",
        "template_2omonny",
        templateParams
    )

    .then(function(response) {

        console.log(
            "E-mail enviado com sucesso!",
            response.status,
            response.text
        );


        // Só mostra a tela final
        // depois que o EmailJS aceitar o envio
        nextPage(7);

    })

    .catch(function(error) {

        console.error(
            "Erro ao enviar e-mail:",
            error
        );


        alert(
            "Ops! Não consegui enviar a confirmação. 😢\n\n" +
            "Verifique sua conexão e tente novamente."
        );


        button.disabled = false;

        button.textContent =
            "CONFIRMAR ENCONTRO ❤️";

    });

}


/* =========================
   CORAÇÕES FLUTUANTES
========================= */

function createFloatingHearts() {

    const container =
        document.querySelector(
            ".hearts-container"
        );


    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘"
    ];


    setInterval(() => {

        const heart =
            document.createElement(
                "div"
            );


        heart.classList.add(
            "floating-heart"
        );


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.fontSize =
            (15 + Math.random() * 20)
            + "px";


        heart.style.animationDuration =
            (5 + Math.random() * 5)
            + "s";


        container.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 10000);


    }, 700);

}
