window.addEventListener("DOMContentLoaded", function () {
  let cookieWrapper = document.getElementById("cookie");
  let cookieStyle = getComputedStyle(cookieWrapper);
  let cookieBottom = parseInt(cookieStyle.bottom);
  let position = cookieBottom;
  let cookieButton = document.querySelector(".cookie__button");
  let regPhone =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  cookieButton.addEventListener("click", function () {
    let moveInterval = setInterval(() => {
      position = position - 2;
      cookieWrapper.style.bottom = position + "px";
      if (position == -100) {
        clearInterval(moveInterval);
        cookieWrapper.style.display = "none";
      }
    }, 10);
  });

  setTimeout(function () {
    let moveInterval = setInterval(() => {
      position = position + 2;
      cookieWrapper.style.bottom = position + "px";
      if (position == 0) {
        clearInterval(moveInterval);
      }
    }, 10);
  });

  let getInTouchForm = document.getElementById("getInTouchForm");

  getInTouchForm.addEventListener("submit", (e) => {
    let input = document.querySelectorAll(".get-in-touch__input");
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("click", () => {
        input[i].classList.remove("empty-area");
      });
    }
    for (let i = 0; i < input.length; i++) {
      if (input[i].value == "") {
        input[i].classList.add("empty-area");
      }
    }
    let emptyInput = document.querySelectorAll(".empty-area");
    if (emptyInput.length > 0) {
      e.preventDefault();
    } else {
    }
  });
});
