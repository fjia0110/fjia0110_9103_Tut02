let cloudImage;
let birdMask;

let xOffset = 0; // Horizontal offset for movement
let yOffset = 0; // Vertical offset for movement
let speed = 3; // Movement speed

function preload() {
  cloudImage = loadImage('./images/clouds.jpg'); // Load the cloud image
}

function setup() {
    createCanvas(500, 400);

  // Create a graphics object to draw the bird shape for masking
  birdMask = createGraphics(width, height);

  drawDove(birdMask); // Draw the bird shape on the mask
  cloudImage.mask(birdMask); // Apply the bird shape as a mask on the cloud image
}

  function draw() {
    background(0, 100, 200); // Set background color

    // Update position based on arrow keys for smooth movement
  if (keyIsDown(LEFT_ARROW)) {
    xOffset -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    yOffset -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yOffset += speed;
  }

    // Display the masked cloud image, so it appears in the shape of the bird
    image(cloudImage, xOffset, yOffset, width, height);
  }

  function drawDove(pg) {
    pg.fill(255); // Fill white for the mask

    pg.noStroke();

    pg.beginShape();

    // Pigeon's head
    pg.vertex(200, 150);
    pg.bezierVertex(172, 141, 160, 74, 73, 3); // top wings
    pg.bezierVertex(155, 188, 109, 98, 82, 152); // head curve
    pg.bezierVertex(137, 126, 105, 144, 70, 149); // oral curve
    // Neck of the pigeon
    pg.bezierVertex(135, 166, 98, 196, 166, 244); // Neck Curve

    // Body and tail of the pigeon
    pg.bezierVertex(169, 246, 238, 282, 198, 260); // body curve
    pg.bezierVertex(332, 396, 392, 292, 249, 250); // Tail curve
    pg.bezierVertex(231, 200, 305, 260, 343, 160); // Tail curve

    // Pigeon's Wings
    pg.bezierVertex(241, 274, 339, 195, 391, 89); // wing curve
    pg.bezierVertex(322, 96, 487, 89, 291, 74); // wing curve
    pg.bezierVertex(212, 57, 164, 165, 197, 155); // Wings back to the head

    pg.endShape(CLOSE);

    pg.beginShape();
    pg.vertex(239, 296);
    pg.vertex(294, 268);
    pg.vertex(357, 307);
    pg.vertex(284, 345);
    pg.endShape(CLOSE);
  }


