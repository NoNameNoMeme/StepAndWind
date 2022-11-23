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
  const formDataObj = {};
  form.forEach((value, key) => (formDataObj[key] = value));
  console.dir(formDataObj);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  axios
    .post(`https://fest.stepiveter.ru/intervals`, formDataObj, config)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function getIntervals(btn) {
  axios
    .get(`https://fest.stepiveter.ru/intervals?type=${btn.dataset.type}`)
    .then(function (response) {
      // handle success
      console.log(response);

      const dataArray = response.data.data;

      console.log(dataArray);

      const modalId = btn.dataset.bsTarget;
      console.log(modalId);

      const modal = document.querySelector(modalId);
      console.log(modal);

      const modalSelect = modal.querySelector("select");
      console.log(modalSelect);

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
      console.log(error);
    });
}
