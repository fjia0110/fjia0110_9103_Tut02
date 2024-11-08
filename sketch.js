let cloudImage;
let bgImage;
let birdMask;

let xOffset = 0; // Horizontal offset for movement
let yOffset = 0; // Vertical offset for movement
let speed = 3; // Movement speed

let wingFlap = 0; // Variable to control wing position
let flapSpeed = 0.1; // Speed of flapping animation
let flyHeight = 0; // Variable to control bird's flying height
let flyingState = '';

// Array to hold all particles (olive branches)
let particles = [];
// Number of particles to generate
const particleCount = 100;

function preload() {
  cloudImage = loadImage('./images/clouds.jpg'); // Load the cloud image
  bgImage = loadImage('./images/bg.jpg'); // Load the cloud image
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Create a graphics object to draw the bird shape for masking
  birdMask = createGraphics(500, 400);

  drawDove(birdMask); // Draw the bird shape on the mask
  cloudImage.mask(birdMask); // Apply the bird shape as a mask on the cloud image

  // Initialize particles and add them to the particles array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new OliveBranch(random(width), random(height)));
  }
}

  function draw() {
    background(0, 100, 200); // Set background color
    image(bgImage, 0, 0, width, height);

    // Loop through each particle to update and display it
    for (let particle of particles) {
      particle.update(); // Update particle position and interactions
      particle.display(); // Draw particle on canvas
    }

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


  // Define the OliveBranch class to represent each particle
  class OliveBranch {
    constructor(x, y) {
      // Particle's position, set to initial x and y coordinates
      this.x = x;
      this.y = y;
      // Particle's velocity, using random small values for x and y direction
      this.vx = random(-0.5, 0.5); // Horizontal velocity
      this.vy = random(-0.5, 0.5); // Vertical velocity
      // Particle's size, randomly chosen to vary particle dimensions
      this.size = random(8, 15); // Random size for olive branch shape
      // Particle's rotation angle, randomized for natural look
      this.angle = random(TWO_PI);
    }

    // Update particle's position and handle mouse interaction
    update() {
      // Calculate the distance between the particle and the mouse
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let distance = sqrt(dx * dx + dy * dy);

      // Check if particle is within a certain distance from the mouse
      if (distance < 100) {
        // Calculate the angle between particle and mouse to "push" away
        let angle = atan2(dy, dx);
        // Generate a push force based on the distance from the mouse
        let pushX = cos(angle) * map(distance, 0, 100, 5, 0);
        let pushY = sin(angle) * map(distance, 0, 100, 5, 0);
        // Apply the push force to the particle's position
        this.x -= pushX;
        this.y -= pushY;
      }

      // Apply natural movement by adding velocity to position
      this.x += this.vx;
      this.y += this.vy;

      // Boundary detection: reverse velocity if particle hits canvas edges
      if (this.x > width || this.x < 0) this.vx *= -1;
      if (this.y > height || this.y < 0) this.vy *= -1;
    }

    // Display the particle as an olive branch shape on the canvas
    display() {
      // Save the current drawing state
      push();
      // Move to the particle's position
      translate(this.x, this.y);
      // Rotate the particle by its angle for a natural orientation
      rotate(this.angle);
      // Set the color for the olive branch (olive green)
      fill(107, 142, 35);
      noStroke(); // Remove outline for a smooth look
      // Draw an ellipse representing the olive branch shape
      ellipse(0, 0, this.size * 2, this.size);
      // Restore the original drawing state
      pop();
    }
  }

  // Adjust the canvas size dynamically if the window is resized
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

