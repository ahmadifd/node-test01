import User from "../models/User.js";

const func1 = async (req, res) => {
  const pageNumber = req?.body?.pageNumber;
  const filter = req?.body?.filter;
  const sort = req?.body?.sort;
  const quickSearch = req?.body?.quickSearch;
  const pageSize = req?.body?.pageSize;

  console.log(
    "pageNumber",
    pageNumber,
    "filter",
    filter,
    "sort",
    sort,
    "quickSearch",
    quickSearch,
    "pageSize",
    pageSize
  );
  res.json({ name: "Farshid" });
};

export default { func1 };
