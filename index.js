Array.from(document.querySelectorAll(".add")).forEach(el => {
  el.addEventListener("click", (e) => {
    const position = e.target.dataset.position;
    const text = document.getElementById("text").value;
    const autoClose = document.getElementById("timer").value;

    const toast = new Toast({
      position,
      text,
      dataset: {
        id: 1
      },
      autoClose, // ms
      onClose() {
        console.log('CLOSED');
      },
      onClick(el) {
        console.log(el.target, `CLICKED ID: ${el.target.dataset.id}`);
      },
      onSuccess(el, close) {
        console.log(el.target, "CONSENTI")
        close();
      }
    });
  });
})

