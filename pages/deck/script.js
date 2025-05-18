let arrId;

if (localStorage.getItem('savedYugiohCards') === null) {
  // The variable 'yourVariableName' does not exist in localStorage
  arrId = [];
} else {
  // The variable 'yourVariableName' exists in localStorage
  // You can access the variable's value using localStorage.getItem('yourVariableName')
  let getArrId = localStorage.getItem('savedYugiohCards');
  arrId = JSON.parse(getArrId);
  verifiedCard();
}


const spinner = document.getElementById('spinner');
const divDeck = document.querySelector('.cards-grid');
const deckContainer = document.querySelector('.deck-container');
const title = document.querySelector('.title-deck');

const divMainYugi = document.querySelector('.div-cards-main');
const divInfoCards = document.querySelector('.info-cards');
// input
const input = document.querySelector('.input');
// button search
const bSearch = document.querySelector('.button-search');

// search
const divModal = document.querySelector('.show-card-searched');

// modal container
const divModalContainer = document.querySelector('.modal__container');

//buttons filter
const bFilter = document.querySelector('.filter-trap');
const body = document.querySelector('body');

const selectType = document.getElementById('select');

// modal -----------
let deleteDiv;
let deleteDivKaiba;

const divContainerKaiba = document.querySelector('.div-container-kaiba');
//search
bSearch.addEventListener('click', async function searchCard(e) {
  try {
    spinner.style.display = "block";
    spinner.classList.add('spinner-z-index');
    divTimeWizard.classList.remove('d-none');
    e.preventDefault();
    if (input.value === "") {
      divModal.innerHTML = "";
      deleteDiv.innerHTML = "";
      divContainerKaiba.innerHTML = `<div class="div-logo">
      <img src="../../image/kaiba.png" class="img-error" alt="kaiba"> 
      <h4 class="h4-logo">In order for Kaiba Corporation to find your card, you naive duelist must enter its name into the search engine.</h4> 
      </div`
    } else {
      divModal.classList.remove('div-modal-log');
      divModal.innerHTML = "";
      deleteDiv.innerHTML = "";
      divContainerKaiba.innerHTML = "";
      await searchApi(input.value);
    }
  } catch (error) {

  } finally {
    divTimeWizard.classList.add('d-none');
    spinner.style.display = "none";
    spinner.classList.remove('spinner-z-index');
  }
})
let cardVerified = true;
let cardGridChange = true;
let inputVerified;

async function searchApi(name) {
  try {
    spinner.style.display = "block";
    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`;
    if (selectType.value) {
      url += `&type=${selectType.value}`;
    }
    const results = await fetch(url);
    const data = await results.json();
    cardVerified = data.data.length === 0;
    cardGridChange = data.data.length === 1;
    iteringCardSearch(data.data);
  } catch (error) {
    if (input.value != "" && cardVerified) {
      divModal.classList.add('div-modal-log');
      let div = document.createElement('div');
      div.classList.add('div-logo');
      let img = document.createElement('img');
      let h4 = document.createElement('h4');
      h4.classList.add('h4-logo');
      h4.innerText = "It seems your card has gone to the realm of duelist shadows.";
      img.src = '../../image/pegasus.png'
      img.classList.add('img-error');
      div.appendChild(img)
      div.appendChild(h4);
      divModal.appendChild(div);
      input.value = "";
    }
  } finally {
    spinner.style.display = "none";
    spinner.classList.remove('spinner-z-index');
  }
}

searchApi();

async function iteringCardSearch(cards) {
  try {
    cards.forEach(card => {
      showYugiModal(card);
    });
  } catch (error) {
    divModal.innerHTML = "error";
  } finally {

  }
}


// cerrar haciendo click afuera
const modal = document.querySelector('.modal');
modal.addEventListener('click', function (event) {
  const divModal = !event.target.closest('.modal__container');
  if (divModal) {
    body.classList.remove('scroll-hide');
    // divModal.classList.remove('div-modal-log');
    closeModal();
  }
})
// 

//show img time wizard
const divTimeWizard = document.querySelector('.time-wizard');
function showWizardPng() {
  let divMain = document.createElement('div');
  let div = document.createElement('div');
  div.classList.add('div-logo');
  let imgYugi = document.createElement('img');
  let h4 = document.createElement('h4');
  h4.classList.add('h4-logo');
  h4.innerText = "Your card is coming, wait a bit duelist";
  imgYugi.src = '../../image/timewizardog.png'
  imgYugi.classList.add('img-error');
  div.appendChild(imgYugi)
  div.appendChild(h4);
  divTimeWizard.appendChild(div);
}

showWizardPng();

//show img yugi
function showYugiPng() {
  const divYgui = document.querySelector('.div-yugi');
  let divMain = document.createElement('div');
  let div = document.createElement('div');
  div.classList.add('div-logo');
  let imgYugi = document.createElement('img');
  let h4 = document.createElement('h4');
  h4.classList.add('h4-logo');
  h4.innerText = "Come on duelist try to find a card, trust the heart of the cards.";
  imgYugi.src = '../../image/yugi.png'
  imgYugi.classList.add('img-error');
  div.appendChild(imgYugi)
  div.appendChild(h4);
  divYgui.appendChild(div);
  deleteDiv = divYgui;
}

showYugiPng();



function setIdModal() {
  localStorage.setItem('savedYugiohCards', JSON.stringify(arrId));
};

async function showYugiModal(yugi) {
  try {
    if (cardGridChange) {
      divModal.classList.add('div-modal-log');
    } else {
      divModal.classList.remove('div-modal-log');
    }
    // hover effect modal
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-container-overlay');
    cardElement.innerHTML = `
                      <img src="${yugi.card_images[0]['image_url_small']}" alt="${yugi.name}" class="card-enlarged">
                      
                  `;
    let divContainerDetails = document.createElement('div');
    divContainerDetails.classList.add('div-details-border');
    let titleCard = document.createElement('h3');
    titleCard.classList.add('card-title');
    titleCard.innerText = `${yugi.name}`;
    let cardType = document.createElement('p');
    cardType.classList.add('card-type');
    cardType.innerText = `${yugi.type}`;
    divContainerDetails.append(titleCard, cardType);
    if (yugi.type === "Trap Card" || yugi.type === "Spell Card") {
      cardType.innerHTML += `  / ${yugi.race}`;
    }
    if (yugi.type !== "Spell Card" && yugi.type !== "Trap Card" && yugi.type !== "Skill Card") {
      cardType.innerHTML += `  / ${yugi.race}`;
      let divAtrLvl = document.createElement('div');
      divAtrLvl.classList.add('div-atr-lvl');
      let pAtr = document.createElement('p');
      pAtr.innerHTML = `${yugi.attribute}`;
      pAtr.classList.add('card-type');
      if (yugi.attribute === "EARTH") {
        pAtr.innerHTML = `<img src="../../image/EARTH.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "LIGHT") {
        pAtr.innerHTML = `<img src="../../image/LIGHT.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "DARK") {
        pAtr.innerHTML = `<img src="../../image/DARK.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "WATER") {
        pAtr.innerHTML = `<img src="../../image/WATER.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "FIRE") {
        pAtr.innerHTML = `<img src="../../image/FIRE.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "WIND") {
        pAtr.innerHTML = `<img src="../../image/WIND.Jpg" class="icon-size">   ${yugi.attribute}`;
      } else if (yugi.attribute === "DIVINE") {
        pAtr.innerHTML = `<img src="../../image/DIVINE.Jpg" class="icon-size">   ${yugi.attribute}`;
      }
      let pLvl = document.createElement('p');
      pLvl.innerHTML = `<img src="../../image/level.webp" class="icon-size icon-details">${yugi.level}`;
      pLvl.classList.add('card-type');
      let divAtkDef = document.createElement('div');
      divAtkDef.classList.add('div-atk-def');
      let pAtk = document.createElement('p');
      pAtk.classList.add('card-type', 'p-atk');
      pAtk.innerText = `ATK/ ${yugi.atk} `;
      let pDef = document.createElement('p');
      pDef.classList.add('card-type');
      pDef.innerText = `  DEF/ ${yugi.def}`;
      if (yugi.atk < 0) {
        pAtk.innerText = `ATK/ ?`;
      }
      if (yugi.def < 0) {
        pDef.innerText = `DEF/ ?`;
      }
      divAtkDef.append(pAtk, pDef);
      divAtrLvl.append(pAtr, pLvl);
      divContainerDetails.appendChild(divAtrLvl);
      divContainerDetails.appendChild(divAtkDef);
    }
    cardElement.appendChild(divContainerDetails);
    //div
    let divCard = document.createElement('div');
    let spanImg = document.createElement('span');
    let divDetails = document.createElement('div');
    
    //
    let ancor = document.createElement('div');
    let divContainerImg = document.createElement('div');
    ancor.href = `info.html?id=${yugi.id}`;
    ancor.target = '_blank';
    let img = document.createElement('img');
    img.src = yugi.card_images[0]['image_url_small'];
    let iconCard = document.createElement('img');
    iconCard.classList.add('icon-details');
    let buttonAdd = document.createElement('button');
    buttonAdd.innerText = "Add to Deck";
    buttonAdd.dataset.id = `${yugi.id}`;
    let idButtonAdd = buttonAdd.dataset.id;
    buttonAdd.id = "liveToastBtn";
    buttonAdd.classList.add('btn', 'button-card', 'btn-hover');

    //add class
    divCard.classList.add('card');
    divDetails.classList.add('card-body');
    img.classList.add('card-img-top', 'img-size');
    //
    //add class
    ancor.classList.add('a-effect');
    ancor.classList.add('span-margin-size');
    divContainerImg.classList.add('img-cont');
    // append
    divContainerImg.appendChild(img);
    divContainerImg.appendChild(cardElement);
    ancor.appendChild(divContainerImg);
    ancor.appendChild(buttonAdd);
    spanImg.appendChild(ancor);

    divModal.appendChild(spanImg);

    // open toasts
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    let pAlert = document.createElement('p');
    let buttonRemoveCard = document.createElement('button');
    buttonRemoveCard.dataset.id = `${yugi.id}`
    buttonRemoveCard.classList.add('removeId', 'btn', 'button-remove-card', 'd-none', 'btn-hover');
    buttonRemoveCard.innerText = "Remove Card";
    pAlert.classList.add('p-alert-card', 'd-none');
    pAlert.innerText = "This card is already in your deck";
    let divToastsDesc = document.querySelector('.toast-body');
    //span addEvent
    img.addEventListener('click', () => {
      buttonAdd.style.pointerEvents = "fill";
      buttonRemoveCard.style.pointerEvents = "fill";
    });
    
    ancor.appendChild(buttonRemoveCard);

    verifiedCard(idButtonAdd, buttonAdd, buttonRemoveCard);

    buttonAdd.addEventListener('click', function addId() {
      changeDivState.classList.add('d-none');
      buttonAdd.classList.add('d-none');
      buttonRemoveCard.classList.remove('d-none');

      toastLiveExample.classList.replace('text-bg-danger', 'text-bg-success');
      divToastsDesc.innerHTML = "The card has been successfully added to your deck."
      if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show();
      }
      verifiedId(buttonAdd.dataset.id);
      addCardToDeck(yugi);
      verifiedCardLength();
    });

    buttonRemoveCard.addEventListener('click', () => {
      // -----------------------------------------------
      buttonAdd.classList.remove('d-none');
      buttonRemoveCard.classList.add('d-none');
      toastLiveExample.classList.replace('text-bg-success', 'text-bg-danger');
      divToastsDesc.innerHTML = "The card has been successfully removed to your deck."
      if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show();
      }
      const idToRemove = buttonRemoveCard.dataset.id;
      removeCardId(idToRemove);
      verifiedCardLength();
      verifiedArrayLength();
    })
  } catch (error) {
  }

}

function verifiedId(idFromButton) {
  const getArrId = localStorage.getItem('savedYugiohCards');
  if (getArrId !== null) {
    arrId = JSON.parse(getArrId);
  }
  if (!arrId.includes(idFromButton)) {
    arrId.push(idFromButton);
    setIdModal();
  } else {
    console.log('this card id exist');
  }
}

function removeCardId(cardId) {
  arrId = arrId.filter(id => id !== cardId);
  setIdModal();
  let arrayChildren = Array.from(divDeck.children);
  let childToRemove = arrayChildren.find(child => child.id == cardId);
  divDeck.removeChild(childToRemove);
}


function verifiedCard(id, button, buttonRemove) {
  const arrLength = localStorage.getItem('savedYugiohCards');
  let arrVerified = JSON.parse(arrLength);
  if (arrVerified.includes(id)) {
    button.classList.add('d-none');
    buttonRemove.classList.remove('d-none');
  }
}


function openModal() {
  body.classList.add('scroll-hide');
  const modal = document.querySelector('.modal');
  modal.classList.add('modal--show');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  const buttonCloseModal = document.querySelector('.modal__close');
  modal.classList.remove('modal--show');
  body.classList.remove('scroll-hide');
  divContainerKaiba.innerHTML = "";
  divModal.innerHTML = "";
  deleteDivYugi();
  showYugiPng();
}


function deleteDivYugi() {
  while (deleteDiv.firstChild) {
    deleteDiv.removeChild(deleteDiv.firstChild);
  }
}

arrId.join(", ");



// test
async function testApi() {
  try {
    spinner.style.display = "block";
    const results = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?sort=atk&sort=level&sortorder=desc&id=${arrId.join(", ")}`);
    const data = await results.json();
    return data.data;
  } catch (error) {

  } finally {

    spinner.style.display = "none";
  }
}

testApi();

async function loadCards() {
  try {
    spinner.style.display = "block";
    divDeck.innerHTML = "";
    const cards = await testApi();
    title.innerHTML = `Main Deck (${cards.length} Card Deck)`;
    showDeck(cards);
  } catch (error) {

  } finally {
    spinner.style.display = "none";
  }

}


loadCards();

function verifiedCardLength() {
  const arrLength = localStorage.getItem('savedYugiohCards');
  let arrVerified = JSON.parse(arrLength);
  title.innerHTML = "";
  title.innerHTML = `Main Deck (${arrVerified.length} Card Deck)`;
}


// pegasus error
let changeDivState;
function verifiedArrayLength() {
  let divPegasus = document.createElement('div');
  const arrLength = localStorage.getItem('savedYugiohCards');
  let arrVerified = JSON.parse(arrLength);
  changeDivState = divPegasus;
  if (arrVerified.length === 0) {
    title.innerHTML = `Main Deck (${arrVerified.length} Card Deck)`;
    divPegasus.classList.add('div-verified-arr-length');
    let img = document.createElement('img');
    let h4 = document.createElement('h4');
    h4.classList.add('h4-pegasus');
    h4.innerText = 'It seems your card has gone to the realm of duelist shadows, click on the button "Add Card +" for add your favourite card';
    img.src = '../../image/pegasus.png'
    img.classList.add('img-pegasus');
    divPegasus.appendChild(img)
    divPegasus.appendChild(h4);
    deckContainer.appendChild(divPegasus);
  } else {
    divPegasus.classList.add('d-none');
  }
}

verifiedArrayLength();

// menu hamburguer

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navMenu = document.querySelector('.nav-menu');

  // open menu
  menuToggle.addEventListener('click', function () {
    navMenu.classList.add('active');
    menuToggle.classList.add('d-none');
    menuClose.classList.add('d-block');
    navMenu.classList.remove('d-none');
  });

  // close menu
  menuClose.addEventListener('click', function () {
    navMenu.classList.remove('active');
    menuClose.classList.remove('d-block');
    menuToggle.classList.remove('d-none');
    navMenu.classList.add('d-none');
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 991) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Close menu by clicking outside it
  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 991 && navMenu.classList.contains('active')) {
      if (!navMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        !menuClose.contains(event.target)) {
        navMenu.classList.remove('active');
        navMenu.classList.add('d-none');
        menuClose.classList.remove('d-block');
        menuToggle.classList.remove('d-none');
      }
    }
  });
});

// panel information
const cardInfoPanel = document.getElementById('cardInfoPanel');
const closePanelBtn = document.getElementById('closePanelBtn');
const cardFlipper = document.getElementById('cardFlipper');
const cardDetailImage = document.getElementById('cardDetailImage');
const cardDetailName = document.getElementById('cardDetailName');
const cardDetailAttribute = document.getElementById('cardDetailAttribute');
const cardDetailLevel = document.getElementById('cardDetailLevel');
const cardDetailDescription = document.getElementById('cardDetailDescription');
const cardDetailATK = document.getElementById('cardDetailATK');
const cardDetailDEF = document.getElementById('cardDetailDEF');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const cardDetails = document.querySelector('.card-details');

function addCardToDeck(card) {
  let a = document.createElement('a');
  a.id = `${card.id}`;
  a.classList.add('a-container-img', 'a-main-deck', 'span-margin-main-deck');
  let img = document.createElement('img');
  img.src = card.card_images[0]['image_url_small'];
  img.classList.add('img-deck-size', 'img-main-deck');
  a.appendChild(img);
  a.addEventListener('mouseenter', () => showCardDetails(card));
  divDeck.appendChild(a);
  // open toasts
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');
  let buttonRemoveCard = document.createElement('button');
  buttonRemoveCard.id = "liveToastBtn";
  buttonRemoveCard.dataset.id = `${card.id}`
  buttonRemoveCard.classList.add('removeId', 'btn', 'button-remove-card-deck', 'btn-remove-card');
  buttonRemoveCard.innerText = "Remove Card";
  let divToastsDesc = document.querySelector('.toast-body');
  a.appendChild(buttonRemoveCard);
  img.addEventListener('click', () => {
    buttonRemoveCard.style.pointerEvents = "auto";
  })
  buttonRemoveCard.addEventListener('click', () => {
    // -----------------------------------------------
    // cardFront.innerHTML = "";
    // cardDetails.innerHTML = "";
    cardDetailName.innerText= "";
    cardDetailAttribute.innerText= "";
    cardDetailLevel.innerText= "";
    // cardDetailDescription.innerText= "";
    cardDetailDescription.classList.add('d-none');
    cardDetailATK.innerText= "";
    cardDetailDEF.innerText= "";
    cardDetailImage.classList.add('d-none');
    cardBack.style.backfaceVisibility = "visible";
    cardBack.style.transform = "rotateY(180deg)";
    toastLiveExample.classList.replace('text-bg-success', 'text-bg-danger');
    divToastsDesc.innerHTML = "The card has been successfully removed to your deck."
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show();
    }
    const idToRemove = buttonRemoveCard.dataset.id;
    removeCardId(idToRemove);
    verifiedCardLength();
    verifiedArrayLength();
  });
}

// img zoom modal
function openModalPanel() {
  bodyPanel.classList.add('scroll-hide-panel');
  const modal = document.querySelector('.modal-panel');
  modal.classList.add('modal--show-panel');
}

function closeModalPanel() {
  const modal = document.querySelector('.modal-panel');
  const buttonCloseModal = document.querySelector('.modal__close-panel');
  modal.classList.remove('modal--show-panel');
  bodyPanel.classList.remove('scroll-hide-panel');
}

const bodyPanel = document.querySelector('body');
const containerImg = document.querySelector('.show-card-img-zoom');

function showImgZoom(card) {
  let img = document.querySelector('.img-modal-zoom');
  img.src = `${card.card_images[0].image_url}`;
  img.classList.add('img-modal-card');
  img.addEventListener('click', imgClick);
}

function imgClick(e) {
  let imgSize = e.target;
  imgSize.classList.toggle('img-modal-card-click');
}

// cerrar haciendo click afuera
const modalPanel = document.querySelector('.modal-panel');
modalPanel.addEventListener('click', function (event) {
  const divModal = !event.target.closest('.modal__container-panel');
  if (divModal) {
    body.classList.remove('scroll-hide-panel');
    closeModalPanel();
  }
});


// Show card details with flip effect
function showCardDetails(card) {
 
  // reset flip card state
  cardFlipper.classList.remove('flipped');

  // show panel
  cardInfoPanel.classList.add('active');

  // Flip card after a short delay
  setTimeout(() => {
    cardBack.style.backfaceVisibility = "hidden";
    cardBack.style.transform = "rotateY(0deg)";
    cardDetailImage.classList.remove('d-none');
    showImgZoom(card);
    // container description
    cardDetailDescription.classList.remove('d-none');

    cardFlipper.classList.add('flipped');
    // update cards details
    cardDetailImage.src = card.card_images[0]['image_url'];
    cardDetailImage.onclick = () => openModalPanel();
    cardDetailName.textContent = card.name;
    cardDetailDescription.textContent = card.desc;
    if (card.type === "Trap Card" || card.type === "Spell Card" || card.type === "Skill Card") {
      cardDetailATK.textContent = "";
      cardDetailDEF.textContent = "";
      cardDetailAttribute.textContent = `Type: ${card.type}`;
      cardDetailLevel.innerHTML = `Race: ${card.race}`;
    }

    if (card.type !== "Trap Card" && card.type !== "Spell Card" && card.type !== "Skill Card") {
      cardDetailAttribute.textContent = `${card.attribute}`;
      cardDetailLevel.innerHTML = `<img src="../../image/level.webp" class="icon-size icon-details">${card.level}`;
      cardDetailATK.textContent = 'ATK/ ' + card.atk;
      cardDetailDEF.textContent = 'DEF/ ' + card.def;
      if (card.type === "Link Monster") {
        cardDetailLevel.innerHTML = `Type: ${card.frameType}`;
        cardDetailDEF.textContent = 'Link/ ' + card.linkval;
      }
      if (card.attribute === "EARTH") {
        cardDetailAttribute.innerHTML = `<img src="../../image/EARTH.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "LIGHT") {
        cardDetailAttribute.innerHTML = `<img src="../../image/LIGHT.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "DARK") {
        cardDetailAttribute.innerHTML = `<img src="../../image/DARK.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "WATER") {
        cardDetailAttribute.innerHTML = `<img src="../../image/WATER.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "FIRE") {
        cardDetailAttribute.innerHTML = `<img src="../../image/FIRE.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "WIND") {
        cardDetailAttribute.innerHTML = `<img src="../../image/WIND.Jpg" class="icon-size">   ${card.attribute}`;
      } else if (card.attribute === "DIVINE") {
        cardDetailAttribute.innerHTML = `<img src="../../image/DIVINE.Jpg" class="icon-size">   ${card.attribute}`;
      }
    }
    if (card.atk < 0) {
      cardDetailATK.innerText = `ATK/ ?`;
    }
    if (card.def < 0) {
      cardDetailDEF.innerText = `DEF/ ?`;
    }

  }, 500);
}


async function showDeck(cards) {
  try {
    divDeck.innerHTML = "";
    spinner.style.display = "block";
    cards.forEach(card => {
      addCardToDeck(card);
    });
  } catch (error) {

  } finally {
    spinner.style.display = "none";
  }
}

showDeck();

loadCards();
