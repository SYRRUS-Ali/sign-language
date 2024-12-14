document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");
  
    // Инициализация команды
    const teamContainer = document.querySelector("#team .row");
    const teamMembers = [
      {
        name: "Баранова Екатерина",
        img: "images/team/kate.jpg",
      },
      {
        name: "Винник Евгения",
        img: "images/team/jenny.jpg",
      },
      {
        name: "Закураева Амина",
        img: "images/team/amina.jpg",
      },
      {
        name: "Лёвкина Карина",
        img: "images/team/karina.jpg",
      },
    ];
  
    teamContainer.innerHTML = teamMembers
      .map(
        (member) => `
          <div class="col-md-3">
            <div class="card p-3 text-center">
             <img src="${member.img}" alt="${member.name}" class="img-fluid rounded-circle mb-3" >
              <h5>${member.name}</h5>
            </div>
          </div>`
      )
      .join("");
  
// Переключение форм
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const modalTitle = document.getElementById("modalTitle");
const toggleAuthBtn = document.getElementById("toggleAuth");

// Установка начального состояния форм
const toggleForm = (isLogin) => {
  loginForm.style.display = isLogin ? "block" : "none";
  registerForm.style.display = isLogin ? "none" : "block";
  modalTitle.textContent = isLogin ? "Login" : "Register";
  toggleAuthBtn.textContent = isLogin
    ? "Don't have an account? Register"
    : "Already have an account? Login";
};

toggleForm(true);

// Слушатель на кнопку переключения
toggleAuthBtn.addEventListener("click", () => {
  toggleForm(loginForm.style.display === "none");
});
});
