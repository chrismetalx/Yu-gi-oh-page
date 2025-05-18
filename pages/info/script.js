const paramId = new URLSearchParams(window.location.search).get("id");

const divInfo = document.querySelector('.info-cards');

const spinner = document.getElementById('spinner');

async function getInfoCard() {
  try {
    spinner.style.display = "block";
    let getApi = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${paramId}`);
    let saveApi = await getApi.json();
    showCardDetails(saveApi.data[0]);
    showImgZoom(saveApi.data[0]);
  } catch (error) {
    console.error();
  } finally {
    spinner.style.display = "none";
  }

}

getInfoCard();


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
  input.value = "";
}

const body = document.querySelector('body');
const containerImg = document.querySelector('.show-card-searched');

function showImgZoom(card) {
  let img = document.createElement('img');
  img.src = `${card.card_images[0].image_url}`;
  img.classList.add('img-modal-card');
  img.addEventListener('click', imgClick);
  containerImg.appendChild(img);
}

function imgClick(e) {
  let imgSize = e.target;
  imgSize.classList.toggle('img-modal-card-click');
}

// get array id.
let arryId = JSON.parse(localStorage.getItem('savedYugiohCards'));

function saveToLocalStorage() {
  localStorage.setItem('savedYugiohCards', JSON.stringify(arryId));
}
const countText = document.querySelector('.position-absolute');


async function showCardDetails(yugi) {
  try {
    //containers
    let divCard = document.createElement('div');
    divCard.classList.add('row');
    let divImg = document.createElement('div');
    divImg.classList.add('col-12', 'col-md-12', 'col-lg-4', 'div-img');
    let divDesc = document.createElement('div');
    divDesc.classList.add('col-12', 'col-md-12', 'col-lg-8', 'div-desc');
    let divPdescInfo = document.createElement('div');
    divPdescInfo.classList.add('div-container-desc');
    let divContainerInfo = document.createElement('div');
    divContainerInfo.classList.add('div-container-info');
    let ul = document.createElement('ul');
    ul.classList.add('ul-container');
    //description card
    //img icons
    //
    let buttonAdd = document.createElement('button');
    buttonAdd.innerText = "Add to Deck";
    buttonAdd.classList.add('btn', 'button-card-page-card');
    buttonAdd.id = "liveToastBtn";
    buttonAdd.dataset.id = `${yugi.id}`;
    let idButtonAdd = buttonAdd.dataset.id;
    let pName = document.createElement('h5');
    pName.classList.add('mt-5');
    pName.innerText = yugi.name;
    let pType = document.createElement('li');
    pType.classList.add('p-container');
    pType.innerHTML = `<span class="margin-edit">Type</span><span><img src="../../image/book.png" class="icon-details">  ${yugi.type}</span>`;
    let pId = document.createElement('li');
    pId.classList.add('p-container');
    pId.innerHTML = `<span class="margin-edit">Typing</span><span>  ${yugi.race}</span>`;
    let titleDesc = document.createElement('h6');
    titleDesc.textContent = "Description";
    let pDesc = document.createElement('p');
    pDesc.innerText = yugi.desc;
    let img = document.createElement('img');
    img.src = yugi.card_images[0]['image_url'];
    img.classList.add('img-scale');
    img.onclick = () => openModal();
    divDesc.appendChild(pName);
    divImg.appendChild(img);
    divImg.appendChild(buttonAdd);
    ul.appendChild(pType);
    ul.appendChild(pId);
    divContainerInfo.appendChild(ul);
    divPdescInfo.append(titleDesc, pDesc);
    divDesc.appendChild(divContainerInfo);
    divDesc.appendChild(divPdescInfo);

    if (yugi.type !== "Spell Card" && yugi.type !== "Trap Card" && yugi.type !== "Skill Card" && yugi.type !== "Token") {
      let pAttribute = document.createElement('li');
      pAttribute.classList.add('p-container');
      pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      if (yugi.attribute === "EARTH") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/EARTH.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "LIGHT") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/LIGHT.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "DARK") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/DARK.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "WATER") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/WATER.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "FIRE") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/FIRE.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "WIND") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/WIND.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      } else if (yugi.attribute === "DIVINE") {
        pAttribute.innerHTML = `<span class="margin-edit">Attribute</span><span><img src="../../image/DIVINE.Jpg" class="icon-details icon-size">   ${yugi.attribute}</span>`;
      }

      let pAtk = document.createElement('li');
      pAtk.classList.add('p-container');
      pAtk.innerHTML = `<span class="margin-edit">ATK</span><span><img src="../../image/swords.png" class="icon-details">   ${yugi.atk}</span>`;
      let pDef = document.createElement('li');
      pDef.classList.add('p-container');
      pDef.innerHTML = `<span class="margin-edit">DEF</span><span><img src="../../image/defence.png" class="icon-details">   ${yugi.def}</span>`;
      let pLvl = document.createElement('li');
      pLvl.classList.add('p-container');
      pLvl.innerHTML = `<span class="margin-edit">Lvl/Rank</span><span><img src="../../image/level.webp" class="icon-details">  ${yugi.level}</span>`;
      if (yugi.atk < 0) {
        pAtk.innerHTML = `<span class="margin-edit">Atk</span><span><img src="../../image/swords.png" class="icon-details"> ?</span>`;
      }
      if (yugi.def < 0) {
        pDef.innerHTML = `<span class="margin-edit">Def</span><span><img src="../../image/defence.png" class="icon-details"> ?</span>`;
      }
      if (yugi.type === "Link Monster" && yugi.archetype !== undefined) {
        pDef.innerHTML = `<span class="margin-edit">Link</span><span><img src="../../image/defence.png" class="icon-details"> ${yugi.linkval}</span>`;
        pLvl.innerHTML = `<span class="margin-edit">Archetype</span><span><img src="../../image/elixir.png" class="icon-details">  ${yugi.archetype}</span>`;
      } else if (yugi.archetype === undefined && yugi.type === "Link Monster") {
        pDef.innerHTML = `<span class="margin-edit">Link</span><span><img src="../../image/defence.png" class="icon-details"> ${yugi.linkval}</span>`;
        pLvl.innerHTML = `<span class="margin-edit">Archetype</span><span><img src="../../image/elixir.png" class="icon-details">  ${yugi.frameType}</span>`;
      }
      if (yugi.type === "Link Monster") {
        pDesc.classList.add('p-description');
      }
      if (yugi.type === "Pendulum Effect Monster" || yugi.type === "Pendulum Tuner Effect Monster" || yugi.type === "Pendulum Effect Fusion Monster" || yugi.type === "Pendulum Effect Ritual Monster" || yugi.type === "Synchro Pendulum Effect Monster" || yugi.type === "Pendulum Normal Monster" || yugi.type === "XYZ Pendulum Effect Monster") {
        divInfo.classList.remove('div-flex');
        divInfo.classList.add('div-pendulum-monster');
        divPdescInfo.classList.remove('div-container-desc');
        divPdescInfo.classList.add('div-container-pendulum');
        pDesc.classList.add('p-description');
      }
      ul.append(pType, pAttribute, pAtk, pDef, pLvl);

    }
    if (yugi.race === "Beast") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Beast.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Normal") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Normal.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Continuous") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Continuous.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Quick-Play") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Quick-Play.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Field") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Field.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Fairy") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Fairy.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Fiend") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Fiend.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Counter") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Counter.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Cyberse") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Cyberse.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Dragon") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Dragon.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Machine") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Machine.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Plant") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Plant.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Spellcaster") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Spellcaster.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Warrior") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Warrior.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Wyrm") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Wyrm.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Rock") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Rock.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Zombie") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Zombie.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Winged Beast") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Winged Beast.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Fish") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Fish.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Dinosaur") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Dinosaur.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.type === "Skill Card") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Weevil.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Aqua") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Aqua.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Beast-Warrior") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Beast-Warrior.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Divine-Beast") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Divine-Beast.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Insect") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Insect.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Equip") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Equip.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Pyro") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Pyro.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Psychic") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Psychic.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Reptile") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Reptile.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Ritual") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Ritual.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Sea Serpent") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Sea Serpent.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Thunder") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Thunder.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Sea Serpent") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Sea Serpent.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    } else if (yugi.race === "Sea Serpent") {
      pId.innerHTML = `<span class="margin-edit">Typing</span><span><img src="../../image/Sea Serpent.png" class="icon-details icon-size">   ${yugi.race}</span>`;
    }

    divCard.appendChild(divImg);
    divCard.appendChild(divDesc);
    divCard.classList.add('div-flex-1');
    divInfo.appendChild(divCard);

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
      countText.innerHTML = `${arryId.length}`;
    });
    // button remove card
   
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
      countText.innerHTML = `${arryId.length}`;
      if (arryId.length === 0) {
        countText.classList.add('d-none');
      }
    });
  } catch (error) {

  }
}

// add card id
function addCardId(id) {
  if (!arryId.includes(id)) {
    arryId.push(id);
    saveToLocalStorage();
    let newArr = arryId.join();
    testApi(newArr);
  } else {
    console.log("¡Esta carta ya está guardada!");
  }
}

// remove card id
function removeCardId(cardId) {
  arryId = arryId.filter(id => id !== cardId);
  saveToLocalStorage();
}


// ------------------------------
// test
async function testApi(card) {
  const getApi = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${card}`);
  const results = await getApi.json();
  const data = await results;
}

testApi();

// -----------

function verifiedCard(id, button, buttonRemove, pAlert) {
  if (arryId.includes(id)) {
    button.classList.add('d-none');
    buttonRemove.classList.remove('d-none');
    pAlert.classList.remove('d-none');
  }
}

verifiedCard();

countText.innerHTML = `${arryId.length}`;
// modal and navbar

// input
const input = document.querySelector('.input');
// button search
const bSearch = document.querySelector('.button-search');
//
const divModal = document.querySelector('.show-card-searched');

// close click out modal
const modal = document.querySelector('.modal');
modal.addEventListener('click', function (event) {
  const divModal = !event.target.closest('.modal__container');
  if (divModal) {
    body.classList.remove('scroll-hide');
    closeModal();
    divModal.innerHTML = "";
    input.value = "";
  }
});


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

