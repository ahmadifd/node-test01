import Person from "../models/Person.js";
import User from "../models/User.js";

const queryFilter = (filter) => {
  switch (filter.filterType) {
    case "contains":
      return { [filter.key]: { $regex: filter.value } };
    case "equals":
      return { [filter.key]: { $eq: filter.value } };
    case "startsWith":
      return { [filter.key]: { $regex: `^${filter.value}` } };
    case "endsWith":
      return { [filter.key]: { $regex: `${filter.value}$` } };
    case "isEmpty":
      return { [filter.key]: { $eq: "" } };
    case "isNotEmpty":
      return { [filter.key]: { $exists: true, $ne: "" } };
    case "isAnyOf":
      const items = filter.value.split(",");
      return {
        [filter.key]: { $in: items },
      };
    case "is":
      return { [filter.key]: { $eq: filter.value } };
    case "ne":
      return { [filter.key]: { $ne: filter.value } };
    case "gt":
      return { [filter.key]: { $gt: filter.value } };
    case "gte":
      return { [filter.key]: { $gte: filter.value } };
    case "lt":
      return { [filter.key]: { $lt: filter.value } };
    case "lte":
      return { [filter.key]: { $lte: filter.value } };
  }
};

const queryQuickSearch = (quickSearch) => {
  const srch = {
    $or: [
      {
        firstName: { $regex: quickSearch },
      },
      {
        lastName: { $regex: quickSearch },
      },
      {
        userName: { $regex: quickSearch },
      },
      {
        email: { $regex: quickSearch },
      },
    ],
  };

  return srch;
};

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
  let qry = {};
  let srt = {};
  let users = {};

  if (filter !== undefined && filter) {
    qry = { ...qry, ...queryFilter(filter) };
  }
  if (quickSearch !== undefined && quickSearch) {
    qry = { $and: [qry, queryQuickSearch(quickSearch)] };
  }

  if (sort !== undefined && sort) {
    if (sort.value == "asc") {
      srt = { [sort.key]: 1 };
    } else if (sort.value == "desc") {
      srt = { [sort.key]: -1 };
    }
  }

  let totalCount = await User.countDocuments(qry);
  let fromIndex = pageNumber * pageSize;
  if (totalCount >= fromIndex + pageSize) {
    users = await User.find(qry)
      .sort(srt)
      .skip(fromIndex)
      .limit(pageSize)
      .select("-password")
      .lean();
  } else {
    users = await User.find(qry)
      .sort(srt)
      .skip(fromIndex)
      .limit(totalCount - fromIndex)
      .select("-password")
      .lean();
  }

  res.json({ users, totalCount });
};

const func2 = async (req, res) => {
  const result = await Person.aggregate([
    { $group: { _id: { age: "$age" } } },
    //{ $match: { name: { $regex: "f" } } },
    //{ $project: { _id: 0 , "company.location":1 } },
    //{ $match: { $and: [{ age: { $eq: 20 } }, { gender: { $eq: "male" } }] } },
    //{ $match: { name: { $gt: "X" } } },
    // { $match: { gender: "female" } },
    //{ $match: { eyeColor: "blue" } },
    // { $match: { age: { $gt: 38, $lt: 40 } } },
    //{ $count: "tedad" },
    { $sort: { _id: 1 } },
  ]);

  res.json(result);
};

const func3 = async (req, res) => {
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
  let qry = {};
  let srt = { rowNumber: 1 };
  let users = {};

  if (filter !== undefined && filter) {
    qry = { ...qry, ...queryFilter(filter) };
  }
  if (quickSearch !== undefined && quickSearch) {
    qry = { $and: [qry, queryQuickSearch(quickSearch)] };
  }

  if (sort !== undefined && sort) {
    if (sort.value == "asc") {
      srt = { [sort.key]: 1 };
    } else if (sort.value == "desc") {
      srt = { [sort.key]: -1 };
    }
  }

  let totalCount = await User.countDocuments(qry);
  let fromIndex = pageNumber * pageSize;

  console.log("fromIndex", fromIndex, "totalCount", totalCount);

  if (totalCount >= fromIndex + pageSize) {
    users = await User.aggregate([
      { $match: qry },
      { $sort: srt },
      { $skip: fromIndex },
      { $limit: pageSize },
    ]);
  } else {
    const limit = totalCount - fromIndex > 0 ? totalCount - fromIndex : 1;
    users = await User.aggregate([
      { $match: qry },
      { $sort: srt },
      { $skip: fromIndex },
      { $limit: limit },
    ]);
  }

  res.json({ users, totalCount });
};

export default { func1, func2, func3 };
