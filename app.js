 // Referencias
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close");

  // Escuchar todos los clics sobre las imágenes
  document.querySelectorAll(".card-image").forEach(img => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  // Cerrar modal al hacer clic en "X"
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    modalImg.src = "";
  });

  // También cerrar si se hace clic fuera de la imagen
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
    }
  });
  const carruseles = [
    { id: 'carrusel', storageKey: 'galeriaMultimedia1' },
    { id: 'carrusel2', storageKey: 'galeriaMultimedia2' },
    { id: 'carrusel3', storageKey: 'galeriaMultimedia3' },
    { id: 'carrusel4', storageKey: 'galeriaMultimedia4' },
    { id: 'carrusel5', storageKey: 'galeriaMultimedia5' },
    // Puedes agregar más aquí...
  ];

  const swipers = {};

  document.addEventListener("DOMContentLoaded", () => {
    carruseles.forEach((config, index) => {
      const swiper = new Swiper(`#${config.id}`, {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        navigation: {
          nextEl: `#${config.id} .swiper-button-next`,
          prevEl: `#${config.id} .swiper-button-prev`
        }
      });
      swipers[config.id] = swiper;

      const datosGuardados = JSON.parse(localStorage.getItem(config.storageKey)) || [];
      datosGuardados.forEach((item, idx) => {
        agregarSlide(swiper, config.id, item.dataUrl, item.tipo, idx);
      });

document.querySelector(`#${config.id} .hidden-file-input`)
      .addEventListener('change', function (event) {
          const files = event.target.files;
          let datos = JSON.parse(localStorage.getItem(config.storageKey)) || [];

          for (let file of files) {
            const reader = new FileReader();
            reader.onload = function (e) {
              const nuevoIndex = datos.length;
              const tipo = file.type.startsWith('image') ? 'imagen' : 'video';

              datos.push({ dataUrl: e.target.result, tipo });
              localStorage.setItem(config.storageKey, JSON.stringify(datos));

              agregarSlide(swiper, config.id, e.target.result, tipo, nuevoIndex);
            };
            reader.readAsDataURL(file);
          }
        });
    });
  });

  function agregarSlide(swiperInstance, containerId, dataUrl, tipo, index) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'card-item');
    slide.dataset.index = index;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-button';
    deleteBtn.onclick = () => eliminarSlide(containerId, index);

    let media;
    if (tipo === 'imagen') {
      media = document.createElement('img');
      media.src = dataUrl;
      media.classList.add('card-image');
    } else {
      media = document.createElement('video');
      media.src = dataUrl;
      media.controls = true;
      media.style.width = '100%';
      media.style.borderRadius = '10px';
    }

    slide.appendChild(deleteBtn);
    slide.appendChild(media);
    swiperInstance.appendSlide(slide);
  }

  function eliminarSlide(containerId, index) {
    const config = carruseles.find(c => c.id === containerId);
    if (!config) return;

    let datos = JSON.parse(localStorage.getItem(config.storageKey)) || [];
    datos.splice(index, 1);
    localStorage.setItem(config.storageKey, JSON.stringify(datos));

    location.reload(); // Puedes optimizar esto sin recargar
  }