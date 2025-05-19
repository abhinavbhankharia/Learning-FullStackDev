import logger from "./logger.js";
import morgan from "morgan";
import express from "express";

const app = express();

const port = 3000;

app.use(express.json()); //any data in json format are accpeted

const morganFormat = ":method :url :status :response-time ms";

app.use(                          //define after the declaration of app
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let teaData = [];
let nextID = 1;

//add new data
app.post("/teas", (req, res) => {
  //when saving data in database post is better
  logger.warn("post req")
  logger.info("a Post resquest was made to add a new tea")
  const { name, price } = req.body;
  const newTea = { id: nextID++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all data
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get data based on id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

//update data
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("Deleted!!");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}...`);
});
