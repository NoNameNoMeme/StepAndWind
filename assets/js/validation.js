function validForm(form) {
  form.classList.add("was-validated");
  return form.checkValidity();
}
