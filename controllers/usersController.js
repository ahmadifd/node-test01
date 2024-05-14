import User from "../models/User.js";
import { isValidObjectId } from "mongoose";

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

const getUsers = async (req, res) => {
  const filter = { key: "firstName", value: "1", filterType: "contains" };
  const quickSearch = "m";
  let fromIndex = 1;
  const pageSize = 3;
  const pageNumber = 0;
  const sort = { key: "firstName", value: "asc" };

  let qry = {};
  let srt = {};
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

  let users = {};
  let totalCount = await User.find(qry);
  fromIndex = pageNumber * pageSize;
  if (totalCount >= fromIndex + pageSize) {
    users = await User.find(qry)
      .sort(srt)
      .skip(fromIndex)
      .limit(pageSize + 1)
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

  console.log(users);
  res.send(users);
};

// let qry = [];
// if (filter !== undefined) {
//   qry = [
//     ...qry,
//     {
//       $match: queryFilter(filter),
//     },
//   ];
// }
// if (quickSearch) {
//   qry = [
//     ...qry,
//     {
//       $match: queryQuickSearch(quickSearch),
//     },
//   ];
// }

//const result1 = await User.aggregate(qry);

// const getUser = async (req, res) => {
//   const x1 = isValidObjectId(req.params.id);
//   res.send(x1);
// };
// const book = {
//   title: "110",
//   author: "11",
//   pages: 110,
//   genres: ["110", "11"],
//   rating: 11,
// };

// await Book.create({
//   title: "110",
//   author: "11",
//   pages: 110,
//   genres: ["110", "11"],
//   rating: 11,
// });

// await Author.create({
//   author: "11",
//   age: 11,
// });

//const books = await Book.upda .find();
//   console.log(books);
//   res.send(JSON.stringify(books));

export default { getUsers };

// [
//   {
//     $lookup: {
//       from: "authors",
//       localField: "author_id",
//       foreignField: "_id",
//       as: "author_details"
//     }
//   } ,
//   {
//     $addFields: {
//       author_details: {
//         //$first : "$author_details"
//         $arrayElemAt : ["$author_details" , 0]
//       }
//     }
//   }
// ]

// [
//   {
//      $match: {
//        "company.location.country" : "USA"
//      }
//   },
//   {
//     $group: {
//       _id: null,
//       count : {$sum:1}
//     }
//   }
// ]

// [
//   {
//     $match: {
//       tags : {$all : ["enim","id"]}
//     }
//   }
// ]

// [
//   {
//     $match: {
//       "tags.0" : "ad"
//     }
//   },
//   {
//     $count: 'result'
//   }
// ]

// [
//   {
//   $group: {
//     _id: "$favoriteFruit",
//     users:{
//       	$push : "$name"
//     	}
//   	}
// 	}
// ]

// [
//   {
//     $sort:{
//        registered : -1
//     }
//   },
//   {
//     $limit: 4
//   },
//   {
//     $project: {
// 			name:1,
//      	registered:1,
//       favoriteFruit:1
//     }
//   }
// ]

// [
//   {
//     $match: {
//       isActive:false,
//       tags:"velit"
//     }
//   },
//   {
//     $project: {
//       name:1,
//       age:1
//     }
//   }
// ]

// [
//   {
//     $addFields: {
//       number: {
//         $size : {$ifNull : ["$tags",[]]}
//       }
//     }
//   },
//   {
//     $group: {
//       _id: null,
//       average:{
//         $avg : "$number"
//       }
//     }
//   }
// ]

// [
//   {
//      $unwind:  "$tags",
//   },
//   {
//     $group: {
//       _id: "$_id",
//       number:{
//         $sum: 1
//       }
//     }
//   },
//   {
//     $group :{
//       _id : null,
//       average : {
//         $avg : "$number"
//       }
//     }
//   }
// ]

// [
//   {
//       $group: {
//         _id : "$company.location.country",
//         count:{
//         $sum : 1
//         }
//       }
//   },
//   {
//     $sort: {
//       count: -1
//     }
//   }
// ]

// [
//   {
//       $group: {
//         _id: '$gender',
//         count:{
//           $sum :1
//         }
//       }
//   }
// ]

// [
//   {
//     $group: {
//       _id: "$favoriteFruit",
//         count:{
//         $sum:1
//       }
//     }
//   },
//   {
//     $sort: {
//       count: -1
//     }
//   },
//   {
//     $limit: 2
//   }
// ]

// [
//   {
//     $group: {
//       _id: "$favoriteFruit",
//       count : {
//         $sum : 1
//       }
//     }
//   },
//   {
//     $sort: {
//       count: -1
//     }
//   },
//   {
//     $limit: 2
//   }
// ]

// [
//   {
//     $group: {
//         _id: '$gender',
//       averageAge:{
//         $avg:"$age"
//       }
//     }
//   }
// ]

// [
//   {
//     $group: {
//         _id: null,
//       averageAge:{
//         $avg:"$age"
//       }
//     }
//   }
// ]

// [
// 	{
//   	$match: {
//     	isActive : true
//  	 }
// 	},
//   {
//     $count: 'activeUsers'
//   }
// ]
