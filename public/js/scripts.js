/* SHOW MENU */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/* REMOVE MENU MOBILE */

const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  /* ACTIVATING LINK */
  navLink.forEach((n) => {
    n.classList.remove("active");
  });

  this.classList.add("active");

  /* REMOVING MENU MOBILE */
  const navMenu = document.querySelector(".nav_menu");
  navMenu.classList.remove("show");
}

navLink.forEach((n) => {
  n.addEventListener("click", linkAction);
});

/* MASK PRICE VALUES */
const Mask = {
  apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value); //Mask[func] === Mask.func
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "");

    return (value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value / 100)));
  },
};


const PhotosUpload = {
  input: "",
  limit: 4,
  preview: document.querySelector('#photo-preview'),
  files: [],
  handleFilesUpload(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach(file => {
      const reader = new FileReader();

      PhotosUpload.files.push(file);

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.createContainer(image);

        PhotosUpload.preview.appendChild(div);

      }

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();

  },
  hasLimit(event) {
    const { files: fileList } = event.target;

    if (fileList.length > PhotosUpload.limit) {
      alert(`Only ${PhotosUpload.limit} files allowed!`);

      event.preventDefaut();

      return true;
    }

    return false;
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  createContainer(image) {
    const div = document.createElement('div');
    div.classList.add('photo');

    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image);

    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },
  getRemoveButton() {
    const closeButton = document.createElement('i');
    closeButton.classList.add('material-icons');
    closeButton.innerHTML = 'delete_forever';

    return closeButton;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;


    photoDiv.remove();
  }

}