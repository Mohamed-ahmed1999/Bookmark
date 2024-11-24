var siteName = document.getElementById("name");
var siteURL = document.getElementById("url");
var errorBox = document.getElementById("errorBox");
var closeErrorBox = document.getElementById("closeErrorBox");

var allSubmit = [];

if (localStorage.getItem("all") != null) {
  allSubmit = JSON.parse(localStorage.getItem("all"));
  display();
}

function addSubmit() {
  if (!validateInputs()) return; 
  
  var submit = {
    name: siteName.value,
    url: siteURL.value
  };

  allSubmit.push(submit); 
  localStorage.setItem("all", JSON.stringify(allSubmit)); 
  clearInput(); 
  display(); 
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteURL.classList.remove("is-valid", "is-invalid");
}

function display() {
  var cartoona = "";
  for (var i = 0; i < allSubmit.length; i++) {
    cartoona += `
    <tr>
      <td>${i + 1}</td>
      <td>${allSubmit[i].name}</td>
      <td>
        <a href="${allSubmit[i].url}" target="_blank" class="btn btn-success">
          <i class="fa-solid fa-eye pe-1"></i>Visit
        </a>
      </td>
      <td>
        <button onclick="deleteProduct(${i})" 
        class="btn btn-danger">
          <i class="fa-solid fa-trash pe-2"></i>Delete
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartoona;
}

function deleteProduct(index) {
  allSubmit.splice(index, 1);
  localStorage.setItem("all", JSON.stringify(allSubmit));
  display(); 
}

function validateInputs() {
  var nameValid = nameRegex.test(siteName.value);
  var urlValid = urlRegex.test(siteURL.value); 

  if (!nameValid || !urlValid) {
    showErrorBox();
    return false;
  }
  return true;
}

function showErrorBox() {
  errorBox.classList.remove("d-none");
  errorBox.classList.add("d-block");
}

function hideBox() {
  errorBox.classList.remove("d-block");
  errorBox.classList.add("d-none");
}

closeErrorBox.addEventListener("click", hideBox);

var nameRegex = /^[a-zA-Z0-9\s]{3,}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[\w-]+\.\w{2,}(\/.*)?$/; 

siteName.addEventListener("input", function () {
  validateField(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validateField(siteURL, urlRegex);
});

function validateField(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
