Run a mongodb docker:
	docker run --rm -d -p 27017:27017 mongo

Back uses express and socket.io 
To start
    cd back/server
	npm install
	node index.js 

Front uses vite, vue, vuex, socket.io and tailwind.
To start
	cd front2
	npm install
	npm run dev

To create a new user, enter localhost:3000/subscribe 