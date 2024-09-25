var container = document.getElementById("buttonContainer");
var donationSection = document.getElementById("donation-section");
var historySection = document.getElementById("history-section");
var buttons = container.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var currentActive = container.getElementsByClassName("active");
    if (currentActive.length > 0) {
      currentActive[0].classList.remove("active");
    }

    this.classList.add("active");

    if (this.id === "donation-btn") {
      donationSection.classList.remove("hidden");
      historySection.classList.add("hidden");
    } else if (this.id === "history-btn") {
      donationSection.classList.add("hidden");
      historySection.classList.remove("hidden");
    }
  });
}

const successModal = document.getElementById("success-modal");
const navbarAmountDisplay = document.getElementById("navbar-amount");
const historyContainer = document.getElementById("history-container");
let initialNavbarAmount = 5500;


function updateNavbarAmount(amount) {
  navbarAmountDisplay.textContent = `${amount} BDT`;
}


function addToHistory(amount, cause) {
  const historyItem = document.createElement("div");
  historyItem.classList.add(
    "history-item",
    "border",
    "p-5",
    "rounded-lg",
    "mb-4"
  );

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    timeZoneName: "short",
  });

  historyItem.innerHTML = `
    <p><strong>${amount} BDT</strong> is Donated for <strong>${cause}</strong></p>
    <p class="text-sm text-gray-500">Date: ${formattedDate}</p>
  `;

  historyContainer.appendChild(historyItem);

  
  let storedHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];
  storedHistory.push({ amount, cause, date: formattedDate });
  localStorage.setItem("donationHistory", JSON.stringify(storedHistory));
}


function closeModal() {
  successModal.close();
}


function handleDonation(
  donationInput,
  donationAmountDisplay,
  causeName,
  localStorageKey
) {
  const donationValue = parseFloat(donationInput.value);

  if (!isNaN(donationValue) && donationValue > 0) {
    let currentNavbarAmount =
      parseFloat(localStorage.getItem("navbarAmount")) || initialNavbarAmount;
    let newNavbarAmount = currentNavbarAmount - donationValue;

    updateNavbarAmount(newNavbarAmount);
    localStorage.setItem("navbarAmount", newNavbarAmount);

    let currentDonationAmount =
      parseFloat(localStorage.getItem(localStorageKey)) || 0;
    let newTotalDonationAmount = currentDonationAmount + donationValue;

    donationAmountDisplay.textContent = `${newTotalDonationAmount} BDT`;
    localStorage.setItem(localStorageKey, newTotalDonationAmount);

    addToHistory(donationValue, causeName);

    donationInput.value = "";
    successModal.showModal();
  } else {
    alert("Please enter a valid donation amount.");
  }
}



document.getElementById("donate-btn-noakhali").addEventListener("click", () => {
  const donationInput = document.getElementById("donation-input-noakhali");
  const donationAmountDisplay = document.getElementById(
    "donation-amount-noakhali"
  );
  handleDonation(
    donationInput,
    donationAmountDisplay,
    "Flood at Noakhali, Bangladesh",
    "donationAmountNoakhali"
  );
});



document.getElementById("donate-btn-feni").addEventListener("click", () => {
  const donationInput = document.getElementById("donation-input-feni");
  const donationAmountDisplay = document.getElementById("donation-amount-feni");
  handleDonation(
    donationInput,
    donationAmountDisplay,
    "Flood Relief in Feni, Bangladesh",
    "donationAmountFeni"
  );
});



document.getElementById("donate-btn-quota").addEventListener("click", () => {
  const donationInput = document.getElementById("donation-input-quota");
  const donationAmountDisplay = document.getElementById(
    "donation-amount-quota"
  );
  handleDonation(
    donationInput,
    donationAmountDisplay,
    "Aid for Injured in the Quota Movement",
    "donationAmountQuota"
  );
});


document.addEventListener("DOMContentLoaded", () => {
  
  if (!localStorage.getItem("navbarAmount")) {
    localStorage.setItem("navbarAmount", initialNavbarAmount); 
  }

 
  const storedNavbarAmount =
    parseFloat(localStorage.getItem("navbarAmount")) || initialNavbarAmount;
  updateNavbarAmount(storedNavbarAmount);

  if (!localStorage.getItem("donationAmountFeni")) {
    localStorage.setItem("donationAmountFeni", 600);
  }

  if (!localStorage.getItem("donationAmountQuota")) {
    localStorage.setItem("donationAmountQuota", 2400);
  }

  
  const storedDonationAmountNoakhali =
    parseFloat(localStorage.getItem("donationAmountNoakhali")) || 0;
  document.getElementById(
    "donation-amount-noakhali"
  ).textContent = `${storedDonationAmountNoakhali} BDT`;

  const storedDonationAmountFeni =
    parseFloat(localStorage.getItem("donationAmountFeni")) || 600;
  document.getElementById(
    "donation-amount-feni"
  ).textContent = `${storedDonationAmountFeni} BDT`;

  const storedDonationAmountQuota =
    parseFloat(localStorage.getItem("donationAmountQuota")) || 2400;
  document.getElementById(
    "donation-amount-quota"
  ).textContent = `${storedDonationAmountQuota} BDT`;

 
  const storedHistory =
    JSON.parse(localStorage.getItem("donationHistory")) || [];
  storedHistory.forEach((item) => {
    addToHistory(item.amount, item.cause);
  });
});