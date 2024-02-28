/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose= document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click',() =>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header')
                        : header.classList.remove('blur-header') 
}
window.addEventListener('scroll',blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scrollup')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        :scrollUp.classList.remove('show-scroll')
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 2500,
    delay: 300,
})

sr.reveal('.home__data, .about__img, .about__data, .visit__data')

sr.reveal('.home__image, .footer__img-1, .footer__img-2', {rotate:{z:-15}})
sr.reveal('.home__bread, .about__bread', {rotate: {z:15}})
sr.reveal('.home__footer',{scale:1, origin:'bottom'})

sr.reveal('.new__card:nth-child(1) img', {rotate: {z: -30}, distance: 0})
sr.reveal('.new__card:nth-child(2) img', {rotate: {z: 15}, distance: 0, delay: 600})
sr.reveal('.new__card:nth-child(3) img', {rotate: {z: -30}, distance: 0,delay: 900})

sr.reveal('.favorite__card img', {interval:100, rotate: {z: 15}, distance: 0})

sr.reveal('.footer__container', {scale: 1})


/*=============== CHATBOT ===============*/
import { GoogleGenerativeAI } from "@google/generative-ai";
  
// Fetch your API_KEY
const API_KEY = "AIzaSyDdRK8RSbGU1i5dW6166W32Xyco0Hr0J2k";



const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;


const createChatLi = (message, className) => {
    //create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?`<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}



// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = userMessage

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  chatbox.appendChild(createChatLi(text, "incoming"));
  chatbox.scrollTo(0,chatbox.scrollHeight);
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;


    //Append the users message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    //display thinking message while waiting for the response
    run();
    chatInput.value = "";
    chatbox.scrollTo(0,chatbox.scrollHeight);
}


chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleChat();
    }
  });
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click",() => document.body.classList.toggle("show-chatbot"));