all:
	elm-install # using github.com/gdotdesign/elm-github-install
	yarn && yarn start
	open http://localhost:8080/
