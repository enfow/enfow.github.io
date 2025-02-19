format:
	yarn prettier --write app/**/*
	npm run lint

dev:
	yarn dev

build:
	EXPORT=1 yarn build

build-and-run:
	rm -rf .contentlayer
	yarn build && yarn export
	npx serve out
