const express = require("express");
const app = express();
const connectToDB = require("./DB/database");
const cors=require("cors");
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/register"));

app.listen(5000, async () => {
  try {
    await connectToDB();
    console.log(`Server is up on port 5000`);
  } catch (e) {
    console.log(e);
  }
});
