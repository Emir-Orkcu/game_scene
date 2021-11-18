var scenes = {
  preload: preload,
  create: create,
  update: update
};
var game = new Phaser.Game(1300, 700, Phaser.AUTO, 'HEFA', scenes);

function preload() {
  this.load.image('grass_tile', '/images/grass_tile.png', 100, 65);
  this.load.image('water', '/images/water.png', 100, 58);
  this.load.image('character', '/images/character.png', 96, 96);
  this.load.image('tree', '/images/tree.png', 256, 352);
  this.load.image('rock', '/images/rock.png', 256, 352);
  this.load.image('tent', '/images/tent.png', 256, 352);


  game.time.advancedTiming = true;
  game.plugins.add(new Phaser.Plugin.Isometric(game));
  game.iso.anchor.setTo(0.5, 0.2);
  game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
}

function create() {
  isoGroup = game.add.group();
  game.stage.backgroundColor = '#B2D3C2';

  var tile;
  for (var xx = 0; xx < 570; xx += 57) {
    for (var yy = 0; yy < 570; yy += 57) {
      if ((yy == 57 || yy == 114) && (xx == 57 || xx == 114 || xx == 171 || xx == 228 || xx == 285)) {
        tile = game.add.isoSprite(xx, yy, -7, 'water', 0, isoGroup);
        tile.anchor.set(0.4, 0);
      } else if (xx == 342 && (yy >= 57 && yy <= 456)) {
        tile = game.add.isoSprite(xx, yy, -7, 'water', 0, isoGroup);
        tile.anchor.set(0.4, 0);
      } else {
        tile = game.add.isoSprite(xx, yy, 0, 'grass_tile', 0, isoGroup);
        tile.anchor.set(0.4, 0);
      }
    }
  }
  rock = this.add.isoSprite(114, 300, 0, 'rock', 0, isoGroup);
  rock.scale.setTo(0.25, 0.25);

  rock = this.add.isoSprite(-57, 120, 0, 'rock', 0, isoGroup);
  rock.scale.setTo(0.25, 0.25);

  rock = this.add.isoSprite(450, 200, 0, 'rock', 0, isoGroup);
  rock.scale.setTo(0.25, 0.25);



  tent = this.add.isoSprite(100, 100, 0, 'tent', 0, isoGroup);
  tent.scale.setTo(0.5, 0.5);

  player = this.add.isoSprite(-75, -40, 0, 'character', 0, isoGroup);
  player.scale.setTo(0.8, 0.8);
  player.anchor.set(0.5);
  game.physics.isoArcade.enable(player);
  player.body.collideWorldBounds = true;


  tree = this.add.isoSprite(-171, 350, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);
  tree = this.add.isoSprite(-171, 420, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);
  tree = this.add.isoSprite(-120, 420, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);
  tree = this.add.isoSprite(-69, 420, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);

  tree = this.add.isoSprite(350, -40, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);
  tree = this.add.isoSprite(350, -100, 0, 'tree', 0, isoGroup);
  tree.scale.setTo(0.5, 0.5);



  cursorPos = new Phaser.Plugin.Isometric.Point3();
  this.cursors = game.input.keyboard.createCursorKeys();


  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
  ]);

}



function update() {
  var speed = 570;

  if (this.cursors.down.isDown && ((player.body.position.y <= 130 && player.body.position.y >= 18 && player.body.position.x <= 60) || (player.body.position.y <= 85 && player.body.position.y >= -10 && player.body.position.x >= 460) || (player.body.position.y <= 220 && player.body.position.y >= 120 && player.body.position.x >= 190 && player.body.position.x <= 300) || (player.body.position.y >= 220 && player.body.position.y <= 480 && player.body.position.x >= 300 && player.body.position.x <= 350))) {
    player.body.velocity.x = 0;
  } else if (this.cursors.up.isDown && ((player.body.position.y <= 480 && player.body.position.y >= 18 && player.body.position.x >= 370 && player.body.position.x <= 400) || (player.body.position.y >= 475 && player.body.position.y <= 550 && player.body.position.x <= 150) || (player.body.position.y >= 415 && player.body.position.y <= 475 && player.body.position.x <= 50))) {
    player.body.velocity.x = 0;
  } else if (this.cursors.up.isDown && this.cursors.up.downDuration(95)) {
    player.body.velocity.x = -speed;
  } else if (this.cursors.down.isDown && player.body.position.x <= 505 && this.cursors.down.downDuration(95)) {
    player.body.velocity.x = speed;
  } else {
    player.body.velocity.x = 0;
  }





  if (this.cursors.left.isDown && ((player.body.position.y <= 20 && player.body.position.x >= 15 && player.body.position.x <= 375) || (player.body.position.y >= 400 && player.body.position.x >= 0 && player.body.position.x <= 20) || (player.body.position.y >= 460 && player.body.position.x >= 20 && player.body.position.x <= 130))) {
    player.body.velocity.y = 0;
  } else if (this.cursors.right.isDown && ((player.body.position.x >= 475 && player.body.position.y <= 100) || (player.body.position.y >= 475 && player.body.position.x <= 375 && player.body.position.x >= 315) || (player.body.position.y >= 220 && player.body.position.y <= 250 && player.body.position.x <= 315 && player.body.position.x >= 210) || (player.body.position.y >= 130 && player.body.position.y <= 150 && player.body.position.x <= 210 && player.body.position.x >= 40))) {
    player.body.velocity.y = 0;
  } else if (this.cursors.left.isDown && (player.body.position.y <= 505) && this.cursors.left.downDuration(95)) {
    player.body.velocity.y = speed;
  } else if (this.cursors.right.isDown && this.cursors.right.downDuration(95)) {
    player.body.velocity.y = -speed;
  } else {
    player.body.velocity.y = 0;
  }

}


Blockly.Blocks['ileri'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("ileri");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('Returns number of letters in the provided text.');
    this.setNextStatement(true);
  }
};

Blockly.Blocks['geri'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("geri");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('Returns number of letters in the provided text.');
  }
};

Blockly.Blocks['saga_ilerle'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("saga_ilerle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('Returns number of letters in the provided text.');

  }
};

Blockly.Blocks['sola_ilerle'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("sola_ilerle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('Returns number of letters in the provided text.');
  }
};



Blockly.JavaScript['ileri'] = function(block) {
  return "player.body.velocity.x = 3333;";
};

Blockly.JavaScript['geri'] = function(block) {
  return "player.body.velocity.x = -3333;";
};

Blockly.JavaScript['saga_ilerle'] = function(block) {
  return "player.body.velocity.y = -3333;";
};

Blockly.JavaScript['sola_ilerle'] = function(block) {
  return "player.body.velocity.y = 3333";
};


var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  },
  trashcan: true
});

function tikla() {
  try {
    eval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    alert(e);
  }
}
