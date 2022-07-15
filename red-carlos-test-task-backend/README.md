# Getting Started with server part of the Test App

### Make sure you have free 3001 port before starting the app

## Available Scripts

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Available Api

#### General

- GET requests only supported;
- local: `http://localhost:3001`
- base route: `http://localhost:3001/news`

#### Routes

- get categories: `http://localhost:3001/news`
- get random story: `http://localhost:3001/news`
- get news/stories by category: `http://localhost:3001/${category}`

#### Categories

List of default categories:

- Politics;
- Health;
- Sport;
- Gaming;
- World;
- Russia Ukraine War;
- Coronavirus;
- Economics

You can easily add/change/remove any of the category by simply editing the `CATEGORIES` field in the `dev-config.ts` file.
The only limitation is not to use "-" in the category naming.
