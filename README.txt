Project One README

The game is a "skill-shot/target practice" style game that is similar in functionality to NES Duckhunt. 

2 players take turns "shooting" targets using a combination of keyup&click events to simulate shooting/aiming.

Players hit as many targets as possible during a set interval or "round".

player rounds last (30sec).

Targets will generate randomly && move around the game field && vanish if not hit by player within a certain interval

Scores are kept and after both players get turn the winner is posted via an alert popup

I plan to accomplish this primarily through dom manipulation via jquery. I will rely heavly on (setTimeout / setInterval) functions to control the game as well as target properties. 

A keyup function on the spacebar will signify a "shot"
Aiming is accomplished via cursor position
At time of shot I will check which element is in a hover state
If hovering over an element with class "target" it will register as a hit and trigger the hit function on the element.
If hover location is not over .target it will register shot as a miss.
