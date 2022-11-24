const btnsInterval = document.querySelectorAll(".intervals-btn");
const btnsSubmit = document.querySelectorAll(".submit-btn");

btnsSubmit.forEach((button) => {
  button.addEventListener("click", () => {
    sendForm(button.closest("form"));
  });
});

btnsInterval.forEach((element) => {
  element.addEventListener("click", () => {
    getIntervals(element);
  });
});

function sendForm(formHTML) {
  const form = new FormData(formHTML);
  if (!validForm(formHTML)) {
    return false;
  }
  form.delete("checkbox");
  const formDataObj = {};
  form.forEach((value, key) => (formDataObj[key] = value));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  axios
    .post(`https://fest.stepiveter.ru/intervals`, formDataObj, config)
    .then(function (response) {
      // handle success
      if (!alert("Вы успешно записались!")) location.reload();
    })
    .catch(function (error) {
      // handle error
      if (!alert("Ошибка при записи. Попробуйте снова!")) location.reload();
    });
}

function getIntervals(btn) {
  axios
    .get(`https://fest.stepiveter.ru/intervals?type=${btn.dataset.type}`)
    .then(function (response) {
      // handle success

      const dataArray = response.data.data;

      const modalId = btn.dataset.bsTarget;

      const modal = document.querySelector(modalId);

      const modalSelect = modal.querySelector("select");

      let intervalsArray;
      dataArray.forEach((interval) => {
        if (interval.vacant) {
          intervalsArray += `<option value="${interval.time}">Свободное время: ${interval.time}</option>`;
        }
      });

      modalSelect.innerHTML = intervalsArray;
    })
    .catch(function (error) {
      // handle error
    });
}
