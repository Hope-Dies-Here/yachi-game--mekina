const playerCar = document.getElementById("player-car");
let score = 0
let c = false

const sound = new Audio('./sound/crash-6711.mp3')
const scoreSound = new Audio('./sound/score.mp3')
const transitSound = new Audio('./sound/transit.mp3')

let carPosition = "center";
document.addEventListener("keydown", (e) => {
    if(c) return
  if (e.key === "ArrowLeft") {
    // transitSound.play()
    // alert("AAAAAAAAA")
    // playerCar.style.left = parseInt(playerCar.style.left) - 10 + "px";
    // playerCar.classList.remove("left-3/3");
    // playerCar.classList.remove("-translate-x-3/2");
    // playerCar.classList.remove("left-1/2");
    // playerCar.classList.add("left-1/2");
    // playerCar.classList.add("-translate-1/2");

    if (carPosition == "center") {
      playerCar.style.transform = `translateX(-120px)`;
      carPosition = "left";
    } else if (carPosition == "right") {
      playerCar.style.transform = `translateX(0px)`;
      carPosition = "center";
    } else {
      console.log("uh oh");
    }
  } else if (e.key === "ArrowRight") {
    // transitSound.play()

    // alert("AAAAAAAAA")
    // console.log(playerCar.style);
    if (carPosition == "center") {
      playerCar.style.transform = `translateX(120px)`;
      carPosition = "right";
    } else if (carPosition == "left") {
      playerCar.style.transform = "translateX(0px)";
      carPosition = "center";
    } else {
      console.log("uh oh");
    }

    // playerCar.style.left = parseInt(playerCar.style.left) + 10 + "px";
  }
});
const pos = [
  { left: "left-3/3", translate: "-translate-x-3/3", position: "right" },
  { left: "left-1/2", translate: "-translate-x-1/2", position: "center" },
  { left: "left-1/3", translate: "-translate-x-3/3", position: "left" },
];

class Con {
  constructor(position) {
    this.position = position;
    this.element = this.createElement();
  }

  createElement() {
    const img = document.createElement("img");
    img.src = "./img/cone.png";
    img.className = `enemy-car w-1/4 rounded-lg absolute ${this.position.left} transform ${this.position.translate} top-0 ${this.position.position}`;
    document.getElementById("road").appendChild(img);
    return img;
  }

  moveDown(i) {
    // this.element.style.top = `${i - 40}px`;
    this.element.style.transform = `translateY(${i-30}px)`;
    this.element.style.border = "6px solid red";
  }
}

// enemy cars movement
const enemyCars = document.querySelectorAll(".enemy-car");
const village = document.querySelectorAll(".sliding-bg");
console.log(enemyCars);
let i = 0;
let l = 0;
console.log(document.getElementById("road").getClientRects());
const sampleEnemyCar = `
                <img id="enemy-car" src="./img/image.png" class="enemy-car w-15 rounded-lg absolute left-3/3 transform -translate-x-3/3 top-20 " />
`;

const cons = [];

function startGame() {
  const conGenerate = setInterval(() => {
    const index = pos[Math.floor(Math.random() * 3)];
    const newCon = new Con(index);
    cons.push(newCon);
    console.log(cons.length);

     cons.forEach((con) => {
    con.moveDown(i); // Move 3px per frame
    i = i+9 
  });
  }, 1800);
}

function collision(enemyCarPos, car) {
//   const enemyCarPos = car.getClientRects();
  const playerCarPos = playerCar.getClientRects();
    let collision = false
  if (
    enemyCarPos[0].bottom > playerCarPos[0].top &&
    enemyCarPos[0].top + 70 < playerCarPos[0].bottom
  ) {
    const ec = enemyCarPos[0];
    const pc = playerCarPos[0];

    if (car.classList.contains(carPosition)) {
        console.log(ec);

    //   if (pc.left < ec.right && pc.right > ec.left) {
        collision = ec
    //   }
    } else {
        collision = false
    }
  }
  return collision
}

let ps = []
const carImages = ["image.png", "enemy.png", "lambo.png", "colombus.png", "lambo.png", "redone.png", "motor.png"]
function generateBeyene() { 
    const p = document.createElement("img")
    const selectedImage = carImages[Math.floor(Math.random() * carImages.length)]
    // selectedImage == "motor.png" ? "w-60" : "w-70"
    p.src = `./img/${selectedImage}` //carImages[Math.floor(Math.random() * carImages.length)]
    p.style.top = '-300px'
    const index = pos[Math.floor(Math.random() * 3)];
    p.className = `z-999 absolute w-[70px] ${index.left} object-contain transform transition ease-in-out duration-300 ${index.translate} ${index.position}`
    p.id = Date.now()
    selectedImage == "motor.png" ? p.style.width = "50px" : ""
    document.getElementById("road").appendChild(p)
    ps.push({ element: p, top: -300 })
    return p
}
let o = 0

// const moveVillage = setInterval(() => {
//     village.forEach((v) => {
//       v.style.backgroundPosition = `0 ${o}px`;
    
//       // v.style.transform = `translateY(${i - 10}px)`
//     });
//     o+=4

// } ,16)
    generateBeyene()

    let double = 0
const beyeneInterval = setInterval(() => {
    generateBeyene()
    if(double > 3) {
        double = 0
        generateBeyene()
    }
    double++
    console.log(ps);
}, 1200)

const speed = 8
function update() {
    
    if(c) { 
        requestAnimationFrame(update)
        return
    }

    try {
    village.forEach((v) => {
      v.style.backgroundPosition = `0 ${o}px`;
    
      // v.style.transform = `translateY(${i - 10}px)`
    });
    o+=speed+2
    ps.forEach((p, index) => {
        p.top = p.top + speed
        p.element.style.top = p.top + "px";

        // if(p.top > window.innerHeight) {
            
        // }
        if(p.top > window.innerHeight) {
            p.element.remove()
            score++
            scoreSound.play()
            ps = ps.filter(p => {
                return p.top < window.innerHeight
            })
            document.getElementById("score").innerText = score
            console.log(score);
        }

        const enemy = [{
            top: p.top,
            bottom: p.top + p.element.height,
            left: p.element.offsetLeft,
            right: p.element.offsetLeft + p.element.width
        }]
        // console.log(carPosition);
        c = collision(enemy, p.element)
        if(c) {
            // alert("beyen")
            const myCarPos = playerCar.getBoundingClientRect()
            const enmCarPos = p.element.getBoundingClientRect()
            // const crash = document.createElement("p")
            const crash = document.createElement("img")
            crash.className = "opacity-90 w-25 text-white p-3 fixed z-999 rounded-full"
            crash.src = "./img/chrash.png"
            // crash.innerText = "Chrash"
            crash.style.left = enmCarPos.left + "px" 
            console.log(myCarPos);
            crash.style.bottom =  90 + "px"
            // console.log(playerCar.style);
            document.getElementById("road").appendChild(crash)

                    clearInterval(beyeneInterval)

            sound.play()

            throw new Error("Crash")
        } 
        
    }) 
    } catch(err) {
        console.log(err);
        c = true
    }
    requestAnimationFrame(update)
    // console.log(c);
    // if(c) {
    //     alert("Game Over")
    // }
}

update()


window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        clearInterval(beyeneInterval)
    }
})
// startGame();
