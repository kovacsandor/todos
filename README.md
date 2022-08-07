# todos

## Start server

```bash
cd server/
# configure .env file
cat <<EOF >.env
CLIENT_ORIGIN=http://localhost:3082
JWT_SECRET=JWT_SECRET
PORT=8082
EOF
npm install
npm start
```

## Start client

```bash
cd client/
# configure .env file
cat <<EOF >.env
PORT=3082
REACT_APP_BACKEND_API_URL=http://localhost:8082
REACT_APP_TITLE=Todos
EOF
npm install
npm start
```

## Visit the app

Open [http://localhost:3082] in the browser
