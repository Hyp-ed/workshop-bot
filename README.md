# workshop-bot

1. clone
2. run `npm install && npm install nodemon -g`
3. start with `npm run start`
4. create `database.sqlite` file in root directory of the repository

api endpoints

`POST` - `/bot` this is listening for webhooks (add it to the repository)

`POST` - `/team/new` creates new team required `team_name` and `repository_url` parameters in body as JSON

`GET` - `/team` lists all existing teams

