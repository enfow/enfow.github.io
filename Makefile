format:
	yarn prettier --write app/**/*
	npm run lint

dev:
	yarn dev

build:
	EXPORT=1 yarn build

build-and-run:
	rm -rf .contentlayer
	EXPORT=1 yarn build
	npx serve out
