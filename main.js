// Gerekli HTML Elementlerini Seçme
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

// Düzenleme Seçenekleri
let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editID = ""; // Düzenleme yapılan öğenin verdiğimiz idli kimliği

//! Olay İzleyicileri
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// Fonksiyonlar
function displayAlert(text, action) {
  console.log(text, action);
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  // Eğer değer boş değilse ve düzenleme modunda değilse
  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr); // oluşturduğumuz id'yi elemente ekledik
    element.classList.add("grocery-item"); // oluşturduğumuz elemente class ekledik
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
    <button type="button" class="edit-btn">
        <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash"></i>
    </button>
    </div>`;

    const deleteBtn = element.querySelector(".delete-btn"); //!bu btnleri burada seçmemizin nedeni elementi yeni oluşturmuş olmamız ve ekleme yapmadan önce seçmemiz gerekiyordu
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // kapsayıcıya ekleme yapma
    list.appendChild(element);
    displayAlert("Başarıyla Eklendi", "success");
    container.classList.add("show-container"); //eklediklerimizin görünür olması için
    grocery.value = ""; // içerik kısmını sıfırlama
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Değer Değiştirildi", "success");
    editFlag = false;
    grocery.value = "";
    submitBtn.textContent = "Ekle"; //gönder butonunun metnini sıfırlar
  } else {
    displayAlert("Lütfen Bir Değer Giriniz", "danger");
    grocery.focus();
  }
}

// silme fonksiyonu
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  displayAlert("Başarıyla Silindi", "danger");
}

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  console.log(items);
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }
  container.classList.remove("show-container"); // konteynarı gizle
  displayAlert("Liste Temizlendi", "danger");
}

// düzenleme fonksiyonu
function editItem(e) {
  grocery.focus();
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;

  editFlag=true
  editID=element.dataset.id
  submitBtn.textContent="Düzenle"
  
}
