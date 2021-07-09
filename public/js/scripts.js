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
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    console.log(index);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  }

}