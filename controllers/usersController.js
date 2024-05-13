import User from "../models/User.js";
import { isValidObjectId } from "mongoose";

const getUsers = async (req, res) => {
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

  const result = await User.find({ name: "110" });

  res.send(result);

  //const books = await Book.upda .find();
  //   console.log(books);
  //   res.send(JSON.stringify(books));
};

const getUser = async (req, res) => {
  const x1 = isValidObjectId(req.params.id);
  res.send(x1);
};

export default { getUsers, getUser };

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
