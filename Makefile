format:
	npm run lint

dev:
	yarn dev

build-and-run:
	rm -rf .contentlayer
	yarn build && yarn export
	npx serve out
