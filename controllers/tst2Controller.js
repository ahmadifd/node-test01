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
      .limit(pageSize )
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

const queryFilter = (filter) => {
  switch (filter.filterType) {
    case "contains":
      return { [filter.key]: { $regex: filter.value } };
    case "equals":
      return { [filter.key]: filter.value };
    case "startsWith":
      return { [filter.key]: { $regex: `^${filter.value}` } };
    case "endsWith":
      return { [filter.key]: { $regex: `${filter.value}$` } };
    case "isEmpty":
      return { [filter.key]: "" };
    case "isNotEmpty":
      return { [filter.key]: { $exists: true, $ne: "" } };
    case "isAnyOf":
      return { [filter.key]: filter.value };
    case "is":
      return { [filter.key]: filter.value };
    case "=":
      return { [filter.key]: filter.value };
    case "!=":
      return { [filter.key]: { $ne: filter.value } };
    case ">":
      return { [filter.key]: { $gt: filter.value } };
    case ">=":
      return { [filter.key]: { $gte: filter.value } };
    case "<":
      return { [filter.key]: { $lt: filter.value } };
    case "<=":
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


export default { func1 };
