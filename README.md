![](https://i.imgur.com/oBGr0mf.png)

> **[Play Flying Solo](https://karannavani.github.io/wdi-project-one/)**

# Goal
To build a fun and interesting game, using Javascript or jQuery for DOM manipulation.

# Game
![](https://i.imgur.com/XXlUwEV.png)

Flying Solo is a spin on the classic addictive game – Flappy Bird, with a Star Wars theme.

The aim of the game is to fly Han Solo (or any other character) between the column of pipes without hitting them. 

There is a single player mode and a multiplayer mode.
# Technologies Used
* HTML 5
* CSS 3
* Javascript (ECMAScript 6)
* jQuery
* Github
* Git
* Google Fonts
* CSS Animations

---
# Approach Taken
Throughout the project, I used Trello to manage my tasks and list down priorities. This helped me tackle the most important issues first and allowed me to lay down a strong foundation.

![](https://i.imgur.com/C5RiNtg.jpg)

### Core functionality

1. My challenge was to figure out what would be the best way to implement this in a browser using Javascript. I decided that having the character fixed on the x axis and having the pipes move toward it would be an efficient way to get started. 
 	
![](https://i.imgur.com/cgvuD9R.png)	

2. I added a simple box div, which would lay as foundation for Han Solo and future characters. I also added some divs to act as columns.

3. With the basic HTML structure in place, I decided to make the elements more dynamic. Instead of cluterring the DOM with ever present columns of pipes, I wrote a function to generate them dynamically at a set interval, as long as the game is still running.
 
4. After the essential game elements were in place, I had to figure out how to detect collision. This is detailed below in the 'Wins' section.

5. In order to make the character motion smoother, I implemented gravity to have the parabolic effect that the original Flappy Bird introduced. This made for more realistic jumps and descents.

<div style='position:relative;padding-bottom:54%'><iframe src='https://gfycat.com/ifr/ShoddyPerfumedChinchilla' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe></div>

### Bonus Features

After achieving my core objectives, I decided to introduce a few more features that would improve user experience and interactivity.

1. **Scoreboard** – During user testing, a question that always came up was, "what's the highscore?". Based on this, I decided to make use of local storage for storing highscores and I displayed the leaderboard on the main game screen.

	Introducing competitiveness made the game immediately more exciting as everyone around me tried to beat each other's score.
	
2. **Multiplayer Mode** – After noticing how much people enjoyed competing after I introduced the leaderboard, the next logical enhancement seemed to be a multiplayer feature. In this mode I added the ability for two players to play simultaneously on the same machine and have individual score counts.

3. **Character Selection** – A friend suggested to me that having a Light Side vs Dark Side battle would be a fun feature to introduce. So I decided to implement a character selection feature for fun. Surprisingly, it ended up impacting the user experience more than I had anticipated and it also helped to craft a more polished game.

<div style='position:relative;padding-bottom:54%'><iframe src='https://gfycat.com/ifr/WeepySevereGrayling' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0' allowfullscreen></iframe></div>

---
# Wins
* **Collision** – Figuring out collision detection turned out to be quite a challenge, since I had to figure out how to compare the position of the character against the position of the columns.

	Since the columns are generated at random heights, at an interval, as long as the game is running – I found it challenging to track all of their positions and perform collision detection on each.
	
	With the help of my tutor, I devised a better way to do this. Instead of looping through all the columns being infinitely generated, I decided to perform the collision detection only against the column which is immediately in front of the character. This made for much easier code and was light on the computation.

* **Multiplayer** – I had scalability in mind from the very beginning, I ensured that my code was divided into small reusable functions. This came in handy when I tried to implement multiplayer support. There was minimal duplication required to make this work.

---
# Blockers
* **Game Reset** – As my code grew in complexity, it became harder to keep track of all the variables and intervals I was running. This caused issues with the reset functionality of the game, where the game still continues to run even after a collision.

---
# Future Features
* **Responsiveness** – Being able to play the game on mobile or tablet.

* **Collecting Coins** – Having coins scattered in between columns. This will make the game more challenging and allow me to add new features that allow the player to spend those coins.

* **Special Powers** – Each character will possess a set of unique powers which they can use in the game for their benefit and/or at the cost of their enemies.
