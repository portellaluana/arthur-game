const config = {
  type: Phaser.AUTO,
  width: 761,
  height: 1365,
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
    src: "./assets/images/symbols/arthur-escolhe.png",
    name: "arthur-escolhe",
  },
  {
    src: "./assets/images/symbols/fruta-2.png",
    name: "fruta-2",
  },
  {
    src: "./assets/images/symbols/mamae-escolhe.png",
    name: "mamae-escolhe",
  },
  {
    src: "./assets/images/symbols/fruta-3.png",
    name: "fruta-3",
  },
  {
    src: "./assets/images/symbols/sorvete.png",
    name: "sorvete",
  },
  {
    src: "./assets/images/symbols/fruta-4.png",
    name: "fruta-4",
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

const game = new Phaser.Game(config);

function preload() {
  this.load.image("chocolatinho", "assets/images/frases/chocolatinho.png");
  this.load.image("mamae-escolhe", "assets/images/frases/mamae-escolhe.png");
  this.load.image("arthur-escolhe", "assets/images/frases/arthur-escolhe.png");
  this.load.image("fruta", "assets/images/frases/fruta.png");
  this.load.image("picole", "assets/images/frases/picole.png");
  this.load.image("sorvete", "assets/images/frases/sorvete.png");

  for (item of spin) {
    this.load.image(item.name, item.src);
  }

  this.load.image("disabledButton", "assets/images/disabled-button.svg");
  this.load.image("button", "assets/images/button.svg");
  this.load.image("bg", "assets/images/bg.png");
  this.load.image("sobremesa", "assets/images/sobremesa.png");
  this.load.image("textDefault", "assets/images/frases/default.png");

  // this.load.image("winline", "assets/images/winline.png");
}

function create() {
  enabledButton = true;

  slot = this.add.container(400, 410);
  for (i = 0; i < 8; i++) {
    let symbol = this.add.image(0, 100 * i, spin[i].name);
    slot.add(symbol);
    symbols.push(symbol);
  }

  this.add.image(380, 682, "bg");
  this.add.image(380, 200, "sobremesa");

  button = this.add.sprite(400, 1160, "button").setInteractive();
  button.on("pointerdown", function () {
    move1 = true;
    spinCount = 0;
    randomSort = randomNumber();

    console.log(`Teste sorteio: ${randomSort.name}`);
  });

  this.add.image(400, 1160, "button");
  
}

function update() {
  if (randomSort) {
    updateSlot(slot, randomSort.name, move1);
    let nameText = randomSort.name;

    if (move1) {
      if (enabledButton) {
        enabledButton = false;
        textDefault = this.add.image(400, 890, "textDefault");

        if (text) {
          text.destroy();
        }

        this.add.image(400, 1160, "disabledButton");
        button.input.enabled = false;
      }
    } else {
      if (!enabledButton) {
        textDefault.destroy();

        switch (nameText) {
          case "chocolatinho":
            text = this.add.image(400, 890, "chocolatinho");
            break;
          case "fruta-2":
            text = this.add.image(400, 890, "fruta");
            break;
          case "fruta-3":
            text = this.add.image(400, 890, "fruta");
            break;
          case "fruta-4":
            text = this.add.image(400, 890, "fruta");
            break;
          case "arthur-escolhe":
            text = this.add.image(400, 890, "arthur-escolhe");
            break;
          case "mamae-escolhe":
            text = this.add.image(400, 890, "mamae-escolhe");
            break;
          case "sorvete":
            text = this.add.image(400, 890, "sorvete");
            break;
          case "picole":
            text = this.add.image(400, 890, "picole");
            break;
          default:
            text = this.add.image(400, 890, "textDefault");
        }

        enabledButton = true;
        this.add.image(400, 1160, "button");
        button.input.enabled = true;
      }
    }
  }
}

function updateSlot(slot, randomSymbol, move) {
  let symbols = slot.list;
  if (move) {
    symbols.forEach((symbol) => {
      symbol.y += 10;
      if (symbol.y > 300) {
        symbol.y -= symbols.length * 100;
      }

      const frameCenterY = 138;
      const symbolHeight = 100;

      if (slot.x == 400) {
        if (
          symbol.y <= frameCenterY &&
          symbol.y + symbolHeight > frameCenterY
        ) {
          const symbolName = symbol.texture.key;
          if (randomSymbol == symbolName) spinCount++;
          if (spinCount == 30) move1 = false;
        }
      }
    });
  }
}
function randomNumber() {
  let randomNumberDraw = Math.floor(Math.random() * 100);

  let spinRandom;

  if (randomNumberDraw <= 12) {
    spinRandom = spin[0];
  }
  if (randomNumberDraw > 12 && randomNumberDraw <= 24) {
    spinRandom = spin[1];
  }
  if (randomNumberDraw > 24 && randomNumberDraw <= 36) {
    spinRandom = spin[2];
  }
  if (randomNumberDraw > 36 && randomNumberDraw <= 48) {
    spinRandom = spin[3];
  }
  if (randomNumberDraw > 48 && randomNumberDraw <= 60) {
    spinRandom = spin[4];
  }
  if (randomNumberDraw > 60 && randomNumberDraw <= 72) {
    spinRandom = spin[5];
  }
  if (randomNumberDraw > 72 && randomNumberDraw <= 84) {
    spinRandom = spin[6];
  }
  if (randomNumberDraw > 84 && randomNumberDraw <= 100) {
    spinRandom = spin[7];
  }
  return spinRandom;
}
