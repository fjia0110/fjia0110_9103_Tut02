# Final project

## Interacting with the Animation

User input to interact with the animation:

1. **Action Triggers**: Click anywhere on the screen to initiate the bird's flying animation. The bird will "take off" and "touch down", simulating flight.
2. **Keyboard Controls**: Use the arrow keys to control the bird's movement on the screen.
3. **Mouse Move**: Move the mouse slowly across the screen. As you approach olive branches, they will react by moving.

## Details of individual approach to animating the group code
1. I choose interaction to drive my individual code
2. I add animations to the wings and tail of dove, as well as animations of olive movement and mouse collision, because these animations interact with user input, so this is unique from other group members.
3. Inspiration by [Palmsunday Dove GIF](https://tenor.com/view/palmsunday-dove-pigeon-gif-4431279105166989335)
4. A short technical explanation:
    - Firstly, I used keyIsDown to determine if the directional keys on the current keyboard have been pressed, and modified the offset value based on their orientation. Then, I adjusted the position of the dove based on the offset value to achieve movement.
    - Secondly, I modified the value of wingFlap (constantly changing back and forth between -1 and 1), and then used this value to modify the corresponding position of Bezier Vertex when drawing graphics to achieve the effect of flapping wings and tails.
    - Then, I monitored the mouse click event and gave the current two states "takeUp" and "takeUp", and modified the value of flyHeight during these two states to achieve the animation of Dove's takeoff and landing
    - Finally, I created the OliveBranch class because I thought each OliveBranch should have its own update and display methods
        - constructor: Initialize the values of various parameters of OliveBBranch, such as position, acceleration, angle, etc.
        - update: Update the current position and angle of OliveBBranch based on the current mouse position, Because the closer you get to the mouse here, the faster Olive Branch will move away from the mouse. Therefore, several mathematical formulas are used for calculation. Please refer to the following link for details:
            - [sqrt](https://p5js.org/reference/p5/sqrt/)
            - [atan2](https://p5js.org/reference/p5/atan2/)
            - [cos](https://p5js.org/reference/p5/cos/)
            - [sin](https://p5js.org/reference/p5/sin/)
            - [map](https://p5js.org/reference/p5/map/)
        - display: Draw an ellipse based on the current position, size, and angle of OliveBranch
