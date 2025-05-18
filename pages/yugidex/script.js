const divMainYugi = document.querySelector('.div-cards-main');
const divInfoCards = document.querySelector('.info-cards');
// input
const input = document.querySelector('.input');
// button search
const bSearch = document.querySelector('.button-search');


//buttons filter
const buttonReset = document.querySelector('.b-reset');
// spinner

const spinner = document.getElementById('spinner');

// counter card Deck
const countText = document.querySelector('.position-absolute');

// button color remove

document.querySelector('.button-notification').addEventListener('contextmenu', function () {
  this.classList.add('no-active-effect');
});

//test new pagination with filters
const selectType = document.getElementById('select');
const selectAttribute = document.getElementById('select2');
const selectLevel = document.getElementById('select3');
const selectRace = document.getElementById('select4');
const buttonFilter = document.querySelector('.button-filter');
const inputFilter = document.querySelector('.input-filter');
let limit = parseInt(document.getElementById('limit').value);
let offset = 0;
// count pages and total cards
let countNum = 0;
let pCount = document.querySelector('.p-count');
let totalPages;
let hasCards = true;
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

//-----------------------------------------

async function getApiyugi() {
  try {
    limit = parseInt(document.getElementById('limit').value);
    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${limit}&offset=${offset}`;
    if (inputFilter.value) {
      url += `&fname=${inputFilter.value}`;
    }
    if (selectType.value) {
      url += `&type=${selectType.value}`;
    }
    if (selectAttribute.value) {
      url += `&attribute=${selectAttribute.value}`;
    }
    if (selectLevel.value) {
      url += `&level=${selectLevel.value}`;
    }
    if (selectRace.value) {
      url += `&race=${selectRace.value}`;
    }

    const results = await fetch(url);
    const data = await results.json();
    hasCards = data.data.length === limit;
    totalPages = data.meta.total_pages;

    return data.data;
  } catch (error) {

  }
}
getApiyugi();

async function loadCards() {
  try {
    const cards = await getApiyugi();
    spinner.style.display = "block";
    showYugi(cards);
  } catch (error) {

  } finally {
    spinner.style.display = "none";
  }
}

loadCards();


let array;


if (localStorage.getItem('savedYugiohCards') === null) {
  // The variable 'yourVariableName' does not exist in localStorage
  array = [];
  countText.innerHTML = `0`;
} else {
  // You can access the variable's value using localStorage.getItem('yourVariableName')
  let getArrId = localStorage.getItem('savedYugiohCards');
  array = JSON.parse(getArrId);
  countText.innerHTML = `${array.length}`;
}

// Guardar IDs en localStorage
function saveToLocalStorage() {
  localStorage.setItem('savedYugiohCards', JSON.stringify(array));
}


//create cards
function showYugi(yugi) {
  try {
    divMainYugi.innerHTML = "";
    yugi.forEach(yugi => {
      //div
      let divCard = document.createElement('div');
      let divImg = document.createElement('div');
      let divDetails = document.createElement('div');
      let divRow = document.createElement('div');
      let divDescCard = document.createElement('div');
      let ulInfo = document.createElement('ul');
      let li1 = document.createElement('li');
      let li2 = document.createElement('li');
      //
      let span = document.createElement('span');
      span.innerHTML = `Type <br>`;
      let spanId = document.createElement('span');
      spanId.innerHTML = `ID <br>`;
      let imgId = document.createElement('img');
      imgId.src = `../../image/yugioh.ico`;
      imgId.classList.add('icon-card-id-page-card');
      let ancor = document.createElement('a');
      ancor.href = `../info/index.html?id=${yugi.id}`;
      let img = document.createElement('img');
      img.src = yugi.card_images[0]['image_url_small'];
      let pText = document.createElement('h5');
      pText.innerHTML = `${yugi.name}`
      let iconCard = document.createElement('img');
      iconCard.classList.add('icon-details');
      li1.innerText = yugi.type;
      li2.append(spanId, imgId, `${yugi.id}`)
      let buttonAdd = document.createElement('button');
      buttonAdd.innerText = "Add to Deck";
      divDescCard.innerHTML = `<hr><p class="text-left p-desc-edit"><strong>Description</strong></p><p class="text-left p-desc-edit">${yugi.desc}</p>`;

      //add class
      divDescCard.classList.add('div-desc')
      buttonAdd.classList.add('btn', 'button-card-page-card');
      buttonAdd.id = "liveToastBtn";
      buttonAdd.dataset.id = `${yugi.id}`;
      let idButtonAdd = buttonAdd.dataset.id;
      ulInfo.classList.add('ul-info-grid-page-card');
      li1.classList.add('li-1-page-card');
      li2.classList.add('li-2-page-card');
      divCard.classList.add('card');
      divDetails.classList.add('card-body-page-card');
      img.classList.add('card-img-top', 'img-size');
      pText.classList.add('card-title-page-card')
      divRow.classList.add('row');
      divImg.classList.add('img-card-yugi', 'col-sm-12', 'col-md-12', 'col-lg-4');
      divDetails.classList.add('col-sm-12', 'col-md-12', 'col-lg-8');
      //
      ulInfo.append(li1, li2);
      ancor.appendChild(img);
      divImg.appendChild(ancor);
      divImg.appendChild(buttonAdd);
      divRow.appendChild(divImg);
      divDetails.appendChild(pText);
      divDetails.appendChild(ulInfo);
      //--------------------------------
      if (yugi.type === "Spell Card") {
        li1.innerText = "";
        iconCard.src = '../../image/Spell Card.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Trap Card") {
        li1.innerText = "";
        iconCard.src = '../../image/Trap Card.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Effect Monster" || yugi.type === "Flip Effect Monster" || yugi.type === "Spirit Monster" || yugi.type === "Toon Monster" || yugi.type === "Tuner Monster" || yugi.type === "Union Effect Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Effect Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Fusion Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Fusion Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Link Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Link Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Normal Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Normal Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Pendulum Effect Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Pendulum Effect Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Ritual Effect Monster" || yugi.type === "Ritual Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Ritual Effect Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Synchro Tuner Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Synchro Tuner Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Tuner Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Tuner Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "XYZ Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/XYZ Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Pendulum Effect Fusion Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Pendulum Effect Fusion Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Pendulum Effect Monster" || yugi.type === "Pendulum Flip Effect Monster" || yugi.type === "Pendulum Tuner Effect Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Pendulum Effect Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Pendulum Effect Ritual Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Pendulum Effect Ritual Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Pendulum Normal Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/Pendulum Normal Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "Synchro Monster" || yugi.type === "Synchro Tuner Monster" || yugi.type === "Token") {
        li1.innerText = "";
        iconCard.src = '../../image/Synchro Tuner Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      } else if (yugi.type === "XYZ Pendulum Effect Monster") {
        li1.innerText = "";
        iconCard.src = '../../image/XYZ Pendulum Effect Monster.jpg';
        li1.append(span, iconCard, ` ${yugi.type}`)
      }
      pCount.classList.add('p-count-edit', 'badge');
      pCount.innerHTML = `Page ${countNum}/ ${totalPages} `;
      divDetails.appendChild(ulInfo);
      divDetails.appendChild(divDescCard);
      divRow.appendChild(divDetails);
      divCard.appendChild(divRow);
      divMainYugi.appendChild(divCard);

      // open toasts
      const toastTrigger = document.getElementById('liveToastBtn');
      const toastLiveExample = document.getElementById('liveToast');
      let pAlert = document.createElement('p');
      let buttonRemoveCard = document.createElement('button');
      buttonRemoveCard.dataset.id = `${yugi.id}`
      buttonRemoveCard.classList.add('removeId', 'btn', 'btn-danger', 'button-remove-card', 'd-none');
      buttonRemoveCard.innerText = "Remove Card";
      pAlert.classList.add('p-alert-card', 'd-none');
      pAlert.innerText = "This card is already in your deck";
      let divToastsDesc = document.querySelector('.toast-body');
      verifiedCard(idButtonAdd, buttonAdd, buttonRemoveCard, pAlert);


      divImg.append(pAlert, buttonRemoveCard);
      buttonAdd.addEventListener('click', function changeName() {
        countText.classList.remove('d-none');

        //----------------------------------------------------
        countText.classList.remove('d-none');
        buttonAdd.classList.add('d-none');
        buttonRemoveCard.classList.remove('d-none');
        pAlert.classList.remove('d-none');
        toastLiveExample.classList.replace('text-bg-danger', 'text-bg-success');
        divToastsDesc.innerHTML = "The card has been successfully added to your deck."
        if (toastTrigger) {
          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
          toastBootstrap.show();
        }
        addCardId(buttonAdd.dataset.id);
        countText.innerHTML = `${array.length}`;
      });
      buttonRemoveCard.addEventListener('click', () => {
        // -----------------------------------------------
        buttonAdd.classList.remove('d-none');
        buttonRemoveCard.classList.add('d-none');
        pAlert.classList.add('d-none');
        toastLiveExample.classList.replace('text-bg-success', 'text-bg-danger');
        divToastsDesc.innerHTML = "The card has been successfully removed to your deck."
        if (toastTrigger) {
          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
          toastBootstrap.show();
        }
        const idToRemove = buttonRemoveCard.dataset.id;
        removeCardId(idToRemove);
        countText.innerHTML = `${array.length}`;
      })
    });
  } catch (error) {
    spinner.style.display = "none";
    divMainYugi.innerHTML = `<h1 class="text-center mt-4">Results not Found</h1>`;
  }
};
// add card id
function addCardId(id) {
  const getArrId = localStorage.getItem('savedYugiohCards');
  if (getArrId !== null) {
    // The variable 'yourVariableName' does not exist in localStorage
    array = JSON.parse(getArrId);

  }
  if (!array.includes(id)) {
    array.push(id);
    saveToLocalStorage();
  } else {
    console.log("¡Esta carta ya está guardada!");
  }
}

// remove id card
function removeCardId(cardId) {
  array = array.filter(id => id !== cardId);
  saveToLocalStorage();
}
// ------------------------------

//button and input search card
buttonFilter.addEventListener('click', async function buttonForm(e) {
  e.preventDefault();
  previous.classList.remove('previous-hidden');
  next.classList.remove('next-hidden');
  selectLimit.classList.remove('next-hidden');
  try {
    if (inputFilter.value === "") {
      divMainYugi.innerHTML = "";
      let div = document.createElement('div');
      div.classList.add('div-logo');
      let img = document.createElement('img');
      let h4 = document.createElement('h4');
      h4.classList.add('h4-logo');
      h4.innerText = "In order for Kaiba Corporation to find your card, you naive duelist must enter its name into the search engine.";
      img.src = '../../image/kaiba.png'
      img.classList.add('img-error');
      div.appendChild(img)
      div.appendChild(h4);
      divMainYugi.appendChild(div);
      inputFilter.value = "";
    } else {
      spinner.style.display = "block";
      const cards = await getApiyugi();
      showYugi(cards);
    }
  } catch (error) {
    console.log(error);
  } finally {
    spinner.style.display = "none";
  }
})


//-----------------------------------------------
const hr = document.querySelector('#hr-hidden');
const selectLimit = document.getElementById('limit');
//button reset
buttonReset.addEventListener('click', function () {
  divMainYugi.classList.add('div-grid');
  divMainYugi.classList.remove('random-card');
  previous.classList.remove('previous-hidden');
  next.classList.remove('next-hidden');
  selectLimit.classList.remove('next-hidden');
  const select = document.querySelectorAll('.select-accordion');
  select.forEach(option => {
    option.value = "";
  })
  removeChild();
  inputFilter.value = "";
  loadCards();
})


//random card
const randomButton = document.querySelector('.random-button');

randomButton.addEventListener('click', async function random() {
  try {
    spinner.style.display = "block";
    divMainYugi.classList.remove('div-grid');
    divMainYugi.classList.add('random-card');
    previous.classList.add('previous-hidden');
    next.classList.add('next-hidden');
    selectLimit.classList.add('next-hidden');
    divMainYugi.innerHTML = "";
    let getApi = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=0&sort=random&cachebust`);
    let saveApi = await getApi.json();
    let card = await saveApi.data;
    showYugi(card)
  } catch (error) {

  }
  finally {
    spinner.style.display = "none";
  }
})


function disabledButton() {
  if (limit === limit) {
    previous.classList.add('disabled');
  }
}

disabledButton();

function verifiedCard(id, button, buttonRemove, pAlert) {
  if (array.includes(id)) {
    button.classList.add('d-none');
    buttonRemove.classList.remove('d-none');
    pAlert.classList.remove('d-none');
  }
}

previous.addEventListener('click', () => {
  next.classList.remove('disabled');
  verifiedCard();
  if (offset === limit) {
    previous.classList.add('disabled');
  }
  if (offset > 0) {
    pCount.innerHTML = `${--countNum}`;
    offset -= limit;
    removeChild()
    loadCards();
    spinner.style.display = "block";
  }
})

next.addEventListener('click', () => {
  previous.classList.remove('disabled');
  verifiedCard();
  if (hasCards) {
    pCount.innerHTML = `${++countNum}`;
    offset += limit;
    removeChild();
    loadCards();
    spinner.style.display = "block";
  }
});

loadCards();


// go top button

window.onscroll = function () {
  if (document.documentElement.scrollTop > 1000) {
    document.querySelector('.go-top-container').classList.add('show');

  }
  else {
    document.querySelector('.go-top-container').classList.remove('show');
  }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

function removeChild() {
  while (divMainYugi.firstChild) {
    divMainYugi.removeChild(divMainYugi.firstChild);
  }
}


function deleteChild() {
  if (divCards.firstChild) {
    divCards.removeChild(divCards.firstChild);
  }
}

const body = document.querySelector('body');
function openModal() {
  divModal.classList.add('div-modal-log');
  body.classList.add('scroll-hide');
  const modal = document.querySelector('.modal');
  modal.classList.add('modal--show');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  const buttonCloseModal = document.querySelector('.modal__close');
  divModal.classList.remove('div-modal-log');
  modal.classList.remove('modal--show');
  body.classList.remove('scroll-hide');
  divModal.innerHTML = "";
  showYugiPng();
  input.value = "";
};


// menu hamburguer

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navMenu = document.querySelector('.nav-menu');
  const showNumber = document.querySelector('.show-number');

  // open menu
  menuToggle.addEventListener('click', function () {
    navMenu.classList.add('active');
    menuToggle.classList.add('d-none');
    menuClose.classList.add('d-block');
    navMenu.classList.remove('d-none');
    let getArrId = localStorage.getItem('savedYugiohCards');
    array = JSON.parse(getArrId);
    showNumber.innerHTML = `${array.length}`;
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
