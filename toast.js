const DEFAULT_OPTIONS = {
  position: "top-right",
  text: "",
  daset: {},
  canClose: true,
  autoClose: 5000,
  onClick: () => { },
  onClose: () => { },
  onSuccess: () => { },
  sucessText: "Consenti",
}

class Toast {
  #toastElem;
  #progressBarInterval;
  #progressAutoCloseTimeout;
  #progressBarStatus = 1;
  #progressBarUpdateFreq = 10;

  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });

    this.update(options);
  }

  #createContainer(position) {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    container.dataset.position = position;
    document.body.appendChild(container);

    return container;
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container = document.querySelector(selector) || this.#createContainer(value);

    container.appendChild(this.#toastElem);

    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(value) {
    const text = document.createTextNode(value);
    this.#toastElem.appendChild(text);
  }

  set canClose(value) {
    if (value) {
      const close = document.createElement("span");
      close.classList.add("toast-close");
      this.#toastElem.appendChild(close);
      this.#toastElem.querySelector(".toast-close").addEventListener("click", () => this.remove());
    } else {
      if (this.#toastElem.querySelector(".toast-close")) {
        this.#toastElem.querySelector(".toast-close").removeEventListener("click", () => this.remove());
        this.#toastElem.querySelector(".toast-close").remove();
      }
    }
  }

  set dataset(value) {
    Object.entries(value).forEach(([key, value]) => {
      this.#toastElem.dataset[key] = value;
    })
  }

  set autoClose(value) {
    this.#toastElem.classList.toggle("progress", value);
    if (value) {
      this.#toastElem.style.setProperty("--progress", 1);

      this.#progressBarInterval = setInterval(() => {
        if (this.#progressBarStatus > 0) {
          this.#progressBarStatus = this.#progressBarStatus - (1 / (value / this.#progressBarUpdateFreq)); // 1 -> 0
          this.#toastElem.style.setProperty("--progress", this.#progressBarStatus);
        } else {
          clearInterval(this.#progressBarInterval);
        }
      }, this.#progressBarUpdateFreq);

      this.#progressAutoCloseTimeout = setTimeout(() => this.remove(), value);
    } else {
      clearInterval(this.#progressBarInterval);
      clearTimeout(this.#progressAutoCloseTimeout);
    }
  }

  #onClickCallback(e, callback) {
    if (e.target.className.indexOf("toast-close") === -1 && e.target.className.indexOf("toast-success-button") === -1) {
      callback(e);
    }
  }

  set onClick(callback) {
    if (callback) {
      this.#toastElem.addEventListener("click", (e) => this.#onClickCallback(e, callback));
    } else {
      this.#toastElem.removeEventListener("click", (e) => this.#onClickCallback(e, callback));
    }
  }

  #onSuccessCallback(e, callback) {
    if (e.target.className.indexOf("toast-success-button") !== -1) {
      const close = (() => this.remove()).bind(this);
      callback(e, close);
    }
  }

  set onSuccess(callback) {
    if (callback) {
      const divSucc = document.createElement("div");
      divSucc.classList.add("toast-success");
      const success = document.createElement("button");
      success.classList.add("toast-success-button")
      success.innerHTML = this.sucessText || "Consenti";
      divSucc.appendChild(success);
      this.#toastElem.appendChild(divSucc);

      this.#toastElem.addEventListener("click", (e) => this.#onSuccessCallback(e, callback));
    } else {
      this.#toastElem.removeEventListener("click", (e) => this.#onSuccessCallback(e, callback));
      this.#toastElem.querySelector(".toast-success").remove();
    }
  }

  update(options) {
    Object.entries({ ...DEFAULT_OPTIONS, ...options }).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.querySelector(".toast-close").removeEventListener("click", () => this.remove());

      this.#toastElem.remove();

      this.onClose();

      if (container.hasChildNodes()) return;
      container.remove();
    });
  }

}

