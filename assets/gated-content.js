class GatedContent extends HTMLElement {
  constructor() {
    super();

    this.elements.form?.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );
  }

  validateForm() {
    if (!this.elements.form) {
      return;
    }

    const formData = new FormData(this.elements.form);
    const isValidPassword = formData.get("password") === this.password;

    return isValidPassword;
  }

  /** @param {SubmitEvent} event */
  handleFormSubmit(event) {
    event.preventDefault();

    const isValid = this.validateForm();

    if (!isValid) {
      this.renderErrorState();
      return;
    }

    this.unlock();
  }

  renderErrorState() {
    if (!this.elements.errorMessage || !this.elements.password) {
      return;
    }

    this.elements.errorMessage.removeAttribute("hidden");
    this.elements.password.setAttribute(
      "aria-described-by",
      this.elements.errorMessage.id
    );
  }

  unlock() {
    this.locked = false;
  }

  get elements() {
    return {
      errorMessage: this.querySelector("[data-gated-content-error-message]"),
      /** @type {HTMLFormElement | null} */
      form: this.querySelector("[data-gated-content-form]"),
      /** @type {HTMLInputElement | null} */
      password: this.querySelector("[data-gated-content-password]"),
    };
  }

  get locked() {
    return this.getAttribute("locked") === "true";
  }

  set locked(locked) {
    this.setAttribute("locked", String(locked));
  }

  get password() {
    return this.getAttribute('password')
  }
}

if (!customElements.get("gated-content")) {
  customElements.define("gated-content", GatedContent);
}
