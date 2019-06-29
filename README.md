# click-game

A mouse click accuracy game where the user attempts to click 10 randomly
generated targets as fast as possible.

This is the first side project I did. Because of that, some of the code in here
is pretty bad. So now, instead of fixing it, I've decided to turn this to a
beginner CTF (it's not a bug it's a feature :upside_down_face:).

To run as a CTF,

```bash
# clone and cd
git clone https://github.com/jeffjyang/click-game.git && cd click-game 

# build and run the image
docker run -p 3000:3000 $(docker build -q .)
```

Visit `localhost:3000` and find the vulnerability :) 

(or go to https://jeffjyang.github.io/click-game/ if you just want to play the
click game)

***

Backend built using Node.js and SQLite.

Frontend built using pure HTML5 (for the `canvas` element), CSS, and jQuery.  
