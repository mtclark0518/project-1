### Project One README

### --------------------"Makin' Bacon"--------------------
### mtclark0518.github.io/project-1
check it out - throw me some ideas for updates.

**----Version 0-----
		  
### ----------The User View----------

	Makin' Bacon is a "skill-shot/target practice" style game that is similar in functionality to NES DuckHunt.
	Two players take turns "shooting" targets
	Gameplay uses aiming via the mouse cursor 
	Game objective is to score the most points during a 30 second interval or "round".

### ----------Language Use / Functionality Challenges ----------

	Completed solely via front end technologies (html, css, js & jquery). 
	Utilized OOP techniques to build application resources
	Challenges include use of functions such as setInterval, setTimeout, Math.{...}

### --------------------Functionality--------------------

### ----------Target Object----------

**----Version0-----
	
	Generate randomly
	Move at various speeds
	Move at various trajectories
	Move at varying speeds
	Move at varying trajectories
	Vanish off game space if not hit by the player within a certain interval
	Targets move across the screen
	
**-----Stretch-Goals-----
	
		
		
Grow in "strength || hp"
		

### ----------Timing & Scoring & Winning Condition----------

	Rounds last 30 seconds.
	Target hits are worth 1 point.
	Score is displayed around the perimeter of the game space.
	After two rounds the scores are compared 
	Whoever scores the most wins
	The winner is posted via a popup


**-----Stretch-Goals-----
	
	Player accuracy impacts score.

### ----------Detecting a Hit----------
	
**----Version0-----
	
	User clicks on target to take a shot.
	If click event is registered by the target it will trigger a hit function.
	The target will dissapear and the Player will receive points.
	
**-----Stretch-Goals-----

	User triggers a keyup function on the spacebar, signifying a "shot"
	At the time this event triggers, user is aiming via cursor position. Hovering over the target
	If hovering over an element with class ".target" 
		it will add the class ".hit" to the element (which will impact style)
		If the hovered element does not have the class ".target", It will register shot as miss.
		(total shots will be tracked for stretch goals).
	Hits register damage rather than kill.
	Players can choose from a variety of weapons
	Weapons have limited ammunition
	Weapons register unique css animations. 
	

** Project requirments listed below:

### Technical Requirements

Your app must:

* **Render a game in the browser**
* **Include** two players (either two humans, or human and computer)
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** *or* **jQuery** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---

### Necessary Deliverables

* A **working game, built by you**, hosted somewhere on the internet
* A **link to your hosted working game** in the URL section of your GitHub repo
* A **git repository hosted on GitHub**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
* **A ``readme.md`` file** with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

---

### Suggested Ways to Get Started

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!
* **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems
* Work through the lessons in class & ask questions when you need to! Think about adding relevant code to your game each night, instead of, you know... _procrastinating_.
* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
* **Consult documentation resources** (MDN, jQuery, etc.) at home to better understand what you’ll be getting into.
* **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.

---

### Potential Project Ideas

##### Blackjack
Make a one player game where people down on their luck can lose all their money by guessing which card the computer will deal next!

##### Self-scoring Trivia
Test your wits & knowledge with whatever-the-heck you know about (so you can actually win). Guess answers, have the computer tell you how right you are!

---

### Useful Resources

* **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla Javascript)_
* **[jQuery Docs](http://api.jquery.com)** _(if you're using jQuery)_
* **[GitHub Pages](https://pages.github.com)** _(for hosting your game)_

---

### Project Feedback + Evaluation

* __Project Workflow__: Did you complete the user stories, wireframes, task tracking, and/or ERDs, as specified above? Did you use source control as expected for the phase of the program you’re in (detailed above)?

* __Technical Requirements__: Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?

* __Creativity__: Did you add a personal spin or creative element into your project submission? Did you deliver something of value to the end user (not just a login button and an index page)?

* __Code Quality__: Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code as your instructors have in class?

* __Deployment__: Did you deploy your application to a public url using GitHub Pages?

* __Total__: Your instructors will give you a total score on your project between:

    Score | Expectations
    ----- | ------------
    **0** | _Incomplete._
    **1** | _Does not meet expectations._
    **2** | _Meets expectations, good job!_
    **3** | _Exceeds expectations, you wonderful creature, you!_

 This will serve as a helpful overall gauge of whether you met the project goals, but __the more important scores are the individual ones__ above, which can help you identify where to focus your efforts for the next project!
