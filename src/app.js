const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;

app.get("/repositories", (request, response) => {
  const repositorie = repositories
  
  return response.json(repositorie);
});

app.post("/repositories", (request, response) => {
 const { title, url, techs } = request.body;

 const repositorie = { id: uuid(), title, url, techs, likes }

 repositories.push(repositorie);

 return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url , techs } = request.body;

  const { id } = request.params;

 repostiorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

 if (repostiorieIndex < 0) {
   return response.status(400).json({ error: 'ID is invalid'});
 }

const repositorie = {
  id, 
  title, 
  url, 
  techs, 
  likes
}

repositories[repostiorieIndex] = repositorie;

return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

 repostiorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

 if (repostiorieIndex < 0) {
   return response.status(400).json({ error: 'ID is invalid'});
 }
 repositories.splice(repostiorieIndex, 1);

 return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

 repostiorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

 if (repostiorieIndex < 0) {
   return response.status(400).json({ error: 'ID is invalid'});
 }
 
 
  repositories[repostiorieIndex].likes += 1;


repositories[repostiorieIndex] = {
  id: repositories[repostiorieIndex].id, 
  title: repositories[repostiorieIndex].title, 
  url: repositories[repostiorieIndex].url, 
  techs: repositories[repostiorieIndex].techs, 
  likes: repositories[repostiorieIndex].likes,
};

return response.json({
  title: repositories[repostiorieIndex].title, 
  likes: repositories[repostiorieIndex].likes,
});

});

module.exports = app;
