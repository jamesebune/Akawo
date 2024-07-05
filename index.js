const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/AkawoDB")
  .then(() => console.log("Connection to Database is successful"))
  .catch((err) => {
    console.error("SORRY, Unable to connect to DB", err.message);
  });

const memberSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: {
    type: String,
    min: 11,
    max: 13,
    // required: true,
  },
});

const Member = mongoose.model("member", memberSchema);

async function createNewMember() {
  const member = new Member({
    name: "new member",
    address: "new address",
    email: "member1@new.com",
    phone: "2348022715352",
  });
  const result = await member.save();
  console.log(result);
}
createNewMember();

app.get("/", (req, res) => {
  res.send("Welcome to Akawo financial services");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}....`));
