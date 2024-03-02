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
        <h1>${phone.brand}</h1>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
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

loadPhones();
