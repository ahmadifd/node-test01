import User from "../models/User.js";

const func1 = async (req, res) => {
  const data = `RegExr was created by gskinner.com. Edit the Expression & Text to see matches. Roll over matches or the expression for details. 
  PCRE & JavaScript flavors of RegEx are supported. Validate your expression with Tests mode.
  The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community and view patterns you create or favorite in My Patterns.
  Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.`;

  const city = req.query.city;
  let query = {};
  query["city"] = new RegExp(city, "i");
  const result = [...data.split(" ")].find((x) => query);

  res.send(`result : ${result}`);
};

const func2 = async (req, res) => {
  const city = req.params.city;
  res.send(`city : ${city}`);
};
export default { func1, func2 };
