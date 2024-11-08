let cloudImage;
let birdMask;

let xOffset = 0; // Horizontal offset for movement
let yOffset = 0; // Vertical offset for movement
let speed = 3; // Movement speed

let wingFlap = 0; // Variable to control wing position
let flapSpeed = 0.1; // Speed of flapping animation
let flyHeight = 0; // Variable to control bird's flying height
let flyingState = '';

function preload() {
  cloudImage = loadImage('./images/clouds.jpg'); // Load the cloud image
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Create a graphics object to draw the bird shape for masking
  birdMask = createGraphics(500, 400);

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

   // Update wing position for flapping effect
   if (flapSpeed > 0.1) {
    flapSpeed -= 0.008; // Slow down flapping speed
   }

   wingFlap += flapSpeed;
   if (wingFlap > 1 || wingFlap < -1) {
     flapSpeed *= -1; // Reverse direction to create flapping effect
   }

   // Update flying height based on space bar press
   if (flyingState === 'takeUp') {
    flyHeight -= 5;
    if (flyHeight <= height / 2 - 400) {
      flyingState = 'takeDown';
    }
   } else if (flyingState === 'takeDown') {
    flyHeight += 5;
    if (flyHeight >= height / 2 - 200) {
      flyingState = ''; // Reset flying state when bird reaches the desired height
    }
   }

   const moveHeight = flyingState ? height / 2 - 200 - flyHeight : 0; // Calculate the vertical movement based on the flying state

    // Clear and redraw the bird mask with updated wing position
    birdMask.clear(); // Clear previous drawing on birdMask
    translate(width / 2 - 200, height / 2 - 200 - moveHeight); // Move origin to center of the graphics object
    drawDove(birdMask); // Redraw bird with updated wing position

    // Apply the bird shape mask to the cloud image
    let maskedImage = cloudImage.get(); // Copy of cloudImage to avoid modifying the original
    maskedImage.mask(birdMask); // Apply mask to the copy

    // Display the masked cloud image, so it appears in the shape of the bird
    image(maskedImage, xOffset, yOffset, 500, 400);
  }

  function drawDove(pg) {
    pg.fill(255); // Fill white for the mask

    pg.noStroke();

    pg.beginShape();

    // Pigeon's head
    pg.vertex(200, 150);
    pg.bezierVertex(172, 141, 160, 74, 73, 3   + wingFlap * 50); // top wings
    pg.bezierVertex(155, 188, 109, 98, 82, 152); // head curve
    pg.bezierVertex(137, 126, 105, 144, 70, 149); // oral curve
    // Neck of the pigeon
    pg.bezierVertex(135, 166, 98, 196, 166, 244); // Neck Curve

    // Body and tail of the pigeon
    pg.bezierVertex(169, 246, 238, 282, 198, 260); // body curve
    pg.bezierVertex(332, 396, 392  + wingFlap * 20, 292, 249, 250); // Tail curve
    pg.bezierVertex(231, 200, 305, 260, 343, 160   + wingFlap * 100); // Tail curve

    // Pigeon's Wings
    pg.bezierVertex(241, 274, 339, 195 + wingFlap * 150, 391, 89 + wingFlap * 200); // wing curve
    pg.bezierVertex(322, 96, 487, 89 + wingFlap * 200, 291, 74  + wingFlap * 100); // wing curve
    pg.bezierVertex(212, 57, 164, 165, 197, 155); // Wings back to the head

    pg.endShape(CLOSE);

  }

  function mouseClicked() {
    flapSpeed = 0.5;
    flyHeight = height / 2 - 200
    flyingState = 'takeUp';
  }


