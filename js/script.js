const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let sobremesa;
let button;
let disabledButton;
let textDefaultShow;
let textDefault;
let text;

let spin = [
  {
    src: "./assets/images/symbols/default-img.png",
    name: "default-img",
  },
  {
    src: "./assets/images/symbols/arthur-escolhe.png",
    name: "arthur-escolhe",
  },
  {
    src: "./assets/images/symbols/fruta.png",
    name: "fruta",
  },
  {
    src: "./assets/images/symbols/mamae-escolhe.png",
    name: "mamae-escolhe",
  },
  {
    src: "./assets/images/symbols/fruta.png",
    name: "fruta",
  },
  {
    src: "./assets/images/symbols/sorvete.png",
    name: "sorvete",
  },
  {
    src: "./assets/images/symbols/fruta.png",
    name: "fruta",
  },
  {
    src: "./assets/images/symbols/chocolatinho.png",
    name: "chocolatinho",
  },
  {
    src: "./assets/images/symbols/picole.png",
    name: "picole",
  },
];

let move1;
let spinCount;
let symbols = [];
let slot;
let enabledButton;
let randomSort;
let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;


const game = new Phaser.Game(config);

function preload() {
  this.load.image("chocolatinho-txt", "assets/images/frases/chocolatinho.png");
  this.load.image(
    "mamae-escolhe-txt",
    "assets/images/frases/mamae-escolhe.png"
  );
  this.load.image(
    "arthur-escolhe-txt",
    "assets/images/frases/arthur-escolhe.png"
  );
  this.load.image("fruta-txt", "assets/images/frases/fruta.png");
  this.load.image("picole-txt", "assets/images/frases/picole.png");
  this.load.image("sorvete-txt", "assets/images/frases/sorvete.png");

  for (item of spin) {
    this.load.image(item.name, item.src);
  }

  this.load.image("disabledButton", "assets/images/disabled-button.png");
  this.load.image("button", "assets/images/button.svg");
  this.load.image("bg", "assets/images/bg.png");
  this.load.image("bg-slot", "assets/images/bg-slot.png");
  this.load.image("sobremesa", "assets/images/sobremesa.png");
  this.load.image("textDefault-txt", "assets/images/frases/default.png");
  this.load.image("default-img", "assets/symbols/images/default-img.png");

}

function create() {
  enabledButton = true;
  this.add.image(gameWidth/2, gameHeight/2, "bg-slot");
  
  slot = this.add.container(gameWidth/2, ((gameHeight/2)*.9));
  for (i = 0; i < 9; i++) {
    let symbol = this.add.image(((gameWidth/2)*1.25) * i, 0, spin[i].name);
    
    slot.add(symbol);
    symbols.push(symbol);
  }
  
  this.add.image(gameWidth/2, gameHeight/2, "bg");
  this.add.image(gameWidth/2, ((gameHeight/2)*.25), "sobremesa");
  textDefaultShow = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "textDefault-txt");


  button = this.add.sprite(gameWidth/2, ((gameHeight/2)*1.73), "button").setInteractive();
  button.on("pointerdown", function () {
    move1 = true;
    spinCount = 0;
    randomSort = randomNumber();

    console.log(`Teste sorteio: ${randomSort.name}`);
  });

  this.add.image(gameWidth/2, ((gameHeight/2)*1.73), "button");
}

function update() {
  if (randomSort) {
    updateSlot(slot, randomSort.name);
    let nameText = randomSort.name;

    if (move1) {
      textDefaultShow.destroy();
      if (enabledButton) {
        enabledButton = false;
        textDefault = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "textDefault-txt");

        if (text) {
          text.destroy();
        }

        this.add.image(gameWidth/2, ((gameHeight/2)*1.73), "disabledButton");
        button.input.enabled = false;
      }
    } else {
      if (!enabledButton) {
        textDefault.destroy();

        switch (nameText) {
          case "chocolatinho":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "chocolatinho-txt");
            break;
          case "fruta":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "fruta-txt");
            break;
          case "arthur-escolhe":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "arthur-escolhe-txt");
            break;
          case "mamae-escolhe":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "mamae-escolhe-txt");
            break;
          case "sorvete":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "sorvete-txt");
            break;
          case "picole":
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "picole-txt");
            break;
          default:
            text = this.add.image(gameWidth/2, ((gameHeight/2)*1.35), "textDefault-txt");
        }

        enabledButton = true;
        this.add.image(gameWidth/2, ((gameHeight/2)*1.73), "button");
        button.input.enabled = true;
      }
    }
  }
}

function updateSlot(slot, randomSymbol) {
  let symbols = slot.list;
  const symbolWidth = (gameWidth/2)*1.25;
  const centerX = 270;

  if (move1) {
    symbols.forEach((symbol) => {
      symbol.x += 50;
     
      if (symbol.x > symbolWidth) {
        symbol.x -= symbols.length * symbolWidth;
      } 
        if (
          symbol.x <= centerX &&
          symbol.x + symbolWidth > centerX
        ) {
          const symbolName = symbol.texture.key;
          if (randomSymbol == symbolName) spinCount++;
          if (spinCount == 15) {
            move1 = false;
          }

        }
    });
  }
}
function randomNumber() {
  let randomNumberDraw = Math.floor(Math.random() * 100);

  let spinRandom;

  if (randomNumberDraw <= 12) {
    spinRandom = spin[1];
  }
  if (randomNumberDraw > 12 && randomNumberDraw <= 24) {
    spinRandom = spin[2];
  }
  if (randomNumberDraw > 24 && randomNumberDraw <= 36) {
    spinRandom = spin[3];
  }
  if (randomNumberDraw > 36 && randomNumberDraw <= 48) {
    spinRandom = spin[4];
  }
  if (randomNumberDraw > 48 && randomNumberDraw <= 60) {
    spinRandom = spin[5];
  }
  if (randomNumberDraw > 60 && randomNumberDraw <= 72) {
    spinRandom = spin[6];
  }
  if (randomNumberDraw > 72 && randomNumberDraw <= 84) {
    spinRandom = spin[7];
  }
  if (randomNumberDraw > 84 && randomNumberDraw <= 100) {
    spinRandom = spin[8];
  }
  return spinRandom;
  // return spin[2];
}
