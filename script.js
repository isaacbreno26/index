//=========================================
// ELEMENTOS
//=========================================

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const content = document.getElementById("content");

const giftBox = document.getElementById("giftBox");

const letter = document.getElementById("letter");
const typedText = document.getElementById("typedText");

const placeCard = document.getElementById("placeCard");
const dateCard = document.getElementById("dateCard");
const messageCard = document.getElementById("messageCard");

const meetingDate = document.getElementById("meetingDate");
const message = document.getElementById("message");

const question = document.getElementById("question");

const yes = document.getElementById("yes");
const no = document.getElementById("no");

const success = document.getElementById("success");

const chooseButtons =
document.querySelectorAll(".choosePlace");

//=========================================
// VARIÁVEIS
//=========================================

let selectedPlace = "";

let index = 0;

//=========================================
// TEXTO DA CARTA
//=========================================

const text = `

Oi ❤️

Primeiramente...

Quero pedir desculpas pela demora kkkkk.

Deu um trabalhinho fazer tudo isso.

mas vc e bem gatinha vale a pena arriscar.



E eu queria muito criar algo diferente.


Escolha um lugar onde eu possa te levar.

`;

//=========================================
// ABRIR SITE
//=========================================

startBtn.addEventListener("click",()=>{

welcome.style.display="none";

content.classList.remove("hidden");

content.classList.add("fadeIn");

});

//=========================================
// ABRIR PRESENTE
//=========================================

giftBox.addEventListener("click",()=>{

giftBox.classList.add("open");

setTimeout(()=>{

giftBox.style.display="none";

letter.classList.remove("hidden");

typeWriter();

},700);

});

//=========================================
// EFEITO MÁQUINA DE ESCREVER
//=========================================

function typeWriter(){

if(index<text.length){

typedText.innerHTML+=text.charAt(index);

index++;

setTimeout(typeWriter,35);

}

else{

showNextSection();

}

}

//=========================================
// MOSTRAR PRÓXIMAS ETAPAS
//=========================================

function showNextSection(){

setTimeout(()=>{

placeCard.classList.remove("hidden");

placeCard.classList.add("fadeUp");

},500);

setTimeout(()=>{

dateCard.classList.remove("hidden");

dateCard.classList.add("fadeUp");

},1200);

setTimeout(()=>{

messageCard.classList.remove("hidden");

messageCard.classList.add("fadeUp");

},1800);

setTimeout(()=>{

question.classList.remove("hidden");

question.classList.add("fadeUp");

},2400);

}

//=========================================
// ESCOLHER LOCAL
//=========================================

chooseButtons.forEach(button=>{

button.addEventListener("click",()=>{

selectedPlace = button.dataset.place;

chooseButtons.forEach(btn=>{

btn.innerHTML="Escolher ❤️";

btn.style.background="#ff4d7e";

});

button.innerHTML="✔ Escolhido";

button.style.background="#38b000";

});

});
//=========================================
// CORAÇÕES NO CURSOR
//=========================================

document.addEventListener("mousemove",(e)=>{

    const heart=document.createElement("div");

    heart.className="cursor-heart";

    heart.innerHTML="❤️";

    heart.style.left=e.clientX+"px";

    heart.style.top=e.clientY+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },800);

});

//=========================================
// CORAÇÕES CAINDO
//=========================================

function createHeart(){

    const heart=document.createElement("div");

    heart.className="floating-heart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*window.innerWidth+"px";

    heart.style.animationDuration=
    (Math.random()*4+6)+"s";

    heart.style.fontSize=
    (Math.random()*15+15)+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,600);

//=========================================
// PÉTALAS
//=========================================

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.innerHTML="🌹";

    petal.style.left=Math.random()*window.innerWidth+"px";

    petal.style.animationDuration=
    (Math.random()*4+7)+"s";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },11000);

}

setInterval(createPetal,1200);

//=========================================
// BOTÃO NÃO
//=========================================

function moveButton(){

    const maxX=window.innerWidth-no.offsetWidth-20;

    const maxY=window.innerHeight-no.offsetHeight-20;

    no.style.position="fixed";

    no.style.left=Math.random()*maxX+"px";

    no.style.top=Math.random()*maxY+"px";

}

no.addEventListener("mouseenter",moveButton);

no.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    moveButton();

});

//=========================================
// EMAILJS
//=========================================

function sendEmail(){

    emailjs.send(

        "service_mqsl3bg",

        "template_2omonny",

        {

            lugar: selectedPlace,

            data: meetingDate.value,

            mensagem: message.value,

            horario: new Date().toLocaleString("pt-BR")

        }

    )

    .then(function(){

        console.log("Email enviado com sucesso!");

    })

    .catch(function(error){

        console.error("Erro:", error);

    });

}

//=========================================
// CONFETES
//=========================================

function confetti(){

    for(let i=0;i<180;i++){

        const conf=document.createElement("div");

        conf.style.position="fixed";

        conf.style.left=Math.random()*window.innerWidth+"px";

        conf.style.top="-20px";

        conf.style.width="8px";

        conf.style.height="16px";

        conf.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        conf.style.pointerEvents="none";

        conf.style.zIndex="99999";

        document.body.appendChild(conf);

        const x=Math.random()*300-150;

        const y=window.innerHeight+200;

        conf.animate(

        [

        {

        transform:"translateY(0)",

        opacity:1

        },

        {

        transform:`translate(${x}px,${y}px)`,

        opacity:0

        }

        ],

        {

        duration:3000+Math.random()*2000,

        easing:"linear"

        }

        );

        setTimeout(()=>{

            conf.remove();

        },5000);

    }

}

//=========================================
// EXPLOSÃO DE CORAÇÕES
//=========================================

function explosion(){

    for(let i=0;i<80;i++){

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="fixed";

        heart.style.left=window.innerWidth/2+"px";

        heart.style.top=window.innerHeight/2+"px";

        heart.style.fontSize="25px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="99999";

        document.body.appendChild(heart);

        const angle=Math.random()*Math.PI*2;

        const distance=Math.random()*450;

        const x=Math.cos(angle)*distance;

        const y=Math.sin(angle)*distance;

        heart.animate(

        [

        {

        transform:"translate(0,0)",

        opacity:1

        },

        {

        transform:`translate(${x}px,${y}px)`,

        opacity:0

        }

        ],

        {

        duration:1800,

        easing:"ease-out"

        });

        setTimeout(()=>{

            heart.remove();

        },1800);

    }

}

//=========================================
// BOTÃO SIM
//=========================================

yes.addEventListener("click",()=>{

    if(selectedPlace===""){

        alert("Escolha um lugar primeiro ❤️");

        return;

    }

    if(meetingDate.value===""){

        alert("Escolha uma data ❤️");

        return;

    }

    sendEmail();

    confetti();

    explosion();

    question.style.display="none";

    placeCard.style.display="none";

    dateCard.style.display="none";

    messageCard.style.display="none";

    letter.style.display="none";

    success.classList.remove("hidden");

    success.classList.add("fadeIn");

    document.body.style.background=
    "linear-gradient(180deg,#ff4d6d,#ff758f,#ff9dbd)";

});

//=========================================
// FINAL
//=========================================

console.log("❤️ Projeto carregado com sucesso!");
