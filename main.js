let imgs = document.querySelectorAll('.container img:not(.icon)');
let imgNum = document.querySelector('.container .slide-num');
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let bulletsContainer = document.querySelector('.indicators');

let currentImg = 0;
let countdownInterval;
let duration = 3; 

function createBullets(){
  let ul = document.createElement('ul');
  for(let i = 1; i <= imgs.length; i++) {
    let li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  }
  bulletsContainer.appendChild(ul);
}

createBullets();
let bullets = document.querySelectorAll('.indicators ul li');


function updateSlider(){
  // remove class active from all imgs
  imgs.forEach((img) => img.classList.remove('active'));
  
  // add class active to currentImg
  imgs[currentImg].classList.add('active');

  // handle nextBtn
  if(currentImg < imgs.length - 1) {
    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
  } else {
    nextBtn.disabled = true;
    nextBtn.classList.add('disabled');
  }

  //handle prevBtn
  if(currentImg > 0) {
    prevBtn.disabled = false;
    prevBtn.classList.remove('disabled');
  } else {
    prevBtn.disabled = true;
    prevBtn.classList.add('disabled');
  }

  // updating bullets
  bullets.forEach((bullet) => bullet.classList.remove('on'));
  bullets[currentImg].classList.add('on');

  // updating imgNum
  imgNum.innerHTML = `Slide #${currentImg + 1} of ${imgs.length}`;


}

nextBtn.addEventListener('click', () => {
  if (currentImg < imgs.length - 1) {
    currentImg++;
    updateSlider();
    restCountdown();
  }
});

prevBtn.addEventListener('click', () => {
  if(currentImg > 0) {
    currentImg--;
    updateSlider();
    restCountdown();
  }
});

// handle click on bullets
bullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    currentImg = index;
    updateSlider();
    restCountdown();
  });
});


function countdown(duration) {
  let time = duration;

  countdownInterval = setInterval(() => { 
    if(--time < 0) {
      clearInterval(countdownInterval);
      currentImg = (currentImg + 1) % imgs.length;
      console.log(currentImg);
      updateSlider();
      countdown(duration);
    }
  }, 1000);
};

function restCountdown() {
  clearInterval(countdownInterval);
  countdown(duration);
}

updateSlider();
countdown(duration);


