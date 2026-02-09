let scene, camera, renderer, heart;
let autoTimer = null;
const AUTO_TIME = 20000; // 20 seconden

let cardsData = [
  "Ik maak dit, om sorry te zeggen voor alles.",
  "Ik heb echt spijt van wa ik gisteren heb gedaan...",
  "Ik voel me echt kunt wa ik heb gedaan tegen jou en hoe ik heb gedaan..",
  "Ik snap volledig dat je boos bent, en pijn hebt :(",
  "Ik wil het echt goe maken en tonen da ik nog steeds evenveel van je hou",
  "Zoals hoe wij elkaar leerden kennen, ik wil het goemaken en het beteren",
  "Daarom dit cadeau",
  "Ik heb oprecht pijn van hoe jij leidt onder mij",
  "Ik wil het echt goemaken en ik hoop dat je deze kans mij geeft",
  "Ik hou mega veel van jou",
  "Jij bent het beste wat me ooit is overkomen",
  "Ik heb oprecht nog nooit beter gehad met jou",
  "Jij bent mijn zonlict in mijn hart",
  "Jij bent zo in mijn hart gegroeid dat ik alleen maar aan jou denk",
  "Ik hoop dat je het mij vergeeft en mij een kans geeft",
  "Ik hou echt mega veel van jou...",
  "Ik wil jou echt ni kwijt",
  "En daarom dit cadeau",
  "Om mijn liefde nog eens duidelijk te maken voor jou"
];

let currentCard = 0;
let cardElement = null;
let started = false;

let isMobile = false; // 📱 Mobile flag

// ✅ INIT
init();
animate();

// ----------------------
// INIT FUNCTION
// ----------------------
function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 8; // default desktop camera

  renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // Licht
  const light = new THREE.PointLight(0xff88aa, 2);
  light.position.set(5,5,5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffaacd, 0.8);
  scene.add(ambient);

  // ❤️ Hart
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.2);
  shape.bezierCurveTo(0, 2.2, -1.8, 2.2, -1.8, 0.8);
  shape.bezierCurveTo(-1.8, -1.2, 0, -2, 0, -2.8);
  shape.bezierCurveTo(0, -2, 1.8, -1.2, 1.8, 0.8);
  shape.bezierCurveTo(1.8, 2.2, 0, 2.2, 0, 1.2);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1.2,
    bevelEnabled: true,
    bevelSize: 0.15,
    bevelThickness: 0.15
  });

  const material = new THREE.MeshStandardMaterial({
    color: 0xff2f6f,
    roughness: 0.25,
    metalness: 0.5,
    emissive: 0x660022
  });

  heart = new THREE.Mesh(geometry, material);
  heart.scale.set(1.3,1.3,1.3); // desktop default
  scene.add(heart);

  // 📱 Mobile check
  checkMobile();

  // Event listeners
  window.addEventListener('click', startSequence);
  window.addEventListener('resize', onResize);
}

// ----------------------
// START CARD SEQUENCE
// ----------------------
function startSequence(){
  if(started) return;
  started = true;
  document.getElementById("hint").innerText = "Klik op de kaart 💌";
  showNextCard();
}

// ----------------------
// SHOW NEXT CARD
// ----------------------
function showNextCard(){
  if(autoTimer) clearTimeout(autoTimer);

  if(currentCard >= cardsData.length){
    document.getElementById("finalPhoto").classList.add("show");
    document.getElementById("hint").innerText = "";
    return;
  }

  cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerText = cardsData[currentCard];
  document.body.appendChild(cardElement);

  setTimeout(()=>{
    cardElement.classList.add("show");
  }, 50);

  cardElement.addEventListener("click", ()=>{
    nextCard();
  });

  autoTimer = setTimeout(()=>{
    nextCard();
  }, AUTO_TIME);
}

// ----------------------
// NEXT CARD
// ----------------------
function nextCard(){
  if(!cardElement) return;

  if(autoTimer) clearTimeout(autoTimer);

  cardElement.classList.add("hide");

  setTimeout(()=>{
    if(cardElement) cardElement.remove();
    currentCard++;
    showNextCard();
  }, 500);
}

// ----------------------
// ANIMATE
// ----------------------
function animate(){
  requestAnimationFrame(animate);
  heart.rotation.y += 0.003;
  heart.rotation.x += 0.002;
  renderer.render(scene, camera);
}

// ----------------------
// ON RESIZE
// ----------------------
function onResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  checkMobile();
}

// ----------------------
// CHECK MOBILE
// ----------------------
function checkMobile(){
  isMobile = window.innerWidth <= 768;

  if(heart){
    if(isMobile){
      // 📱 GSM: hart kleiner + camera verder
      heart.scale.set(0.8, 0.8, 0.8);
      camera.position.z = 10;
    }else{
      // 💻 Desktop
      heart.scale.set(1.3, 1.3, 1.3);
      camera.position.z = 8;
    }
  }

  // Optional: cards max-width for mobile
  const cards = document.querySelectorAll(".card");
  cards.forEach(card=>{
    if(isMobile){
      card.style.fontSize = "22px";
      card.style.padding = "24px 28px";
      card.style.borderRadius = "20px";
      card.style.maxWidth = "85%";
      card.style.textAlign = "center";
    }else{
      card.style.fontSize = "18px";
      card.style.padding = "14px 18px";
      card.style.borderRadius = "14px";
      card.style.maxWidth = "none";
      card.style.textAlign = "left";
    }
  });
}
