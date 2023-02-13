const router = require("express").Router();
const registerEvent = require("../model/register");
router.use(require("express").json());
const shortid = require("shortid");

router.post("/register/:eventName", async (req, res) => {
  const ticketnum = shortid();

  try {
    const eventName = req.params.eventName;
    //console.log(eventName);
    const userExists = await registerEvent.findOne({
      email: req.body.email,
      eventName,
    });
    if (userExists) {
      return res.status(400).json({
        error: "user already exists",
      });
    }
    const data = await registerEvent.create({
      name: req.body.name,
      email: req.body.email,
      ticketNumber: ticketnum,
      eventName,
    });
    res.status(200).json({
      status: "success",
      message: "Registration successful",
      ticketNumber: data.ticketNumber,
    });
  } catch (e) {
    return res.json({
      e: e.message,
    });
  }
});

router.get("/register/:eventName", async (req, res) => {
  try {
    const eventName = req.params.eventName;
    const user = await registerEvent.find({ eventName });

    if (user.length) {
      let count = user.length;

      res.status(200).json({
        status: "success",
        message: "Registration successful",
        count,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "No such event exist",
      });
    }
  } catch (e) {
    return res.json({
      e: e.message,
    });
  }
});

router.post("/login/:eventName", async (req, res) => {
  try {
    const ticketNumber = req.body.ticketNumber;
    // console.log(ticketNumber);
    const eventName = req.params.eventName;
    // console.log(eventName);
    const user = await registerEvent.findOne({
      ticketNumber,
      eventName,
    });
    // console.log(user);
    if (user) {
      res.status(200).json({
        status: "success",
        message: "login successful",
        user,
      });
    } else {
      //console.log("hi");
      res.status(400).json({
        status: "failed",
        message: "invalid user",
      });
    }
  } catch (e) {
    return res.json({
      e: e.message,
    });
  }
});

module.exports = router;
