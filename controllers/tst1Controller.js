import User from "../models/User.js";

const func1 = async (req, res) => {
  const city = req.query.city;

  res.send(`result : ${city}`);
};

const func2 = async (req, res) => {
  const city = req.params.city;
  res.send(`city : ${city}`);
};

const func3 = async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
    } else res.send("YYY");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { func1, func2, func3 };
