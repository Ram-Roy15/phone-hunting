const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phonContainer = document.getElementById("card-container");
  phonContainer.innerHTML = "";
  const showAll = document.getElementById("show-all-container");

  if (phones.length > 9 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else showAll.classList.add("hidden");
  // console.log("console hoyeche", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList = ` card card-compact bg-gray-200 shadow-xl `;
    cardContainer.innerHTML = `
      <figure><img class="rounded-xl" src="${phone.image}" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Details</button>
        </div>
    </div>
      `;
    phonContainer.appendChild(cardContainer);
  });
  spinner(false);
};

const handleBtn = (isShowAll) => {
  spinner(true);
  const inputField = document.getElementById("search-field");
  const inputValue = inputField.value;
  loadPhones(inputValue, isShowAll);
};

const spinner = (isLoading) => {
  const spinnerContainer = document.getElementById("spinner");
  if (isLoading) {
    spinnerContainer.classList.remove("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
  }
};

const showAll = () => {
  handleBtn(true);
};

const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  phone = data.data;
  showModal(phone);
  // console.log(phone);
};

const showModal = (phone) => {
  // console.log(phone);
  // const phoneImage = document.getElementById("phone-img");

  const phonContainer = document.getElementById("phone-container");
  phonContainer.innerHTML = `
<img src="${phone.image}" alt="">
<h3 id="show-details-phone-name" class="font-bold text-lg">Brand: ${phone.brand}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Name: ${phone.name}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Chipset: ${phone?.mainFeatures?.chipSet}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Display: ${phone?.mainFeatures?.displaySize}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Memory: ${phone?.mainFeatures?.memory}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Storage: ${phone?.mainFeatures?.storage}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[0]}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[1]}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[2]}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[3]}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[4]}</h3>
<h3 id="show-details-phone-name" class="font-bold text-lg">Sensors: ${phone?.mainFeatures?.sensors[5]}</h3>
  `;
  my_modal_show.showModal();
};

loadPhones();
