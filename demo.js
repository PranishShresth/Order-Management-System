var array = [
  {
    active: true,
    modifiedOn: "2020-05-04T14:01:21.217Z",
    _id: "5eb020eae052210468c368f2",
    User: {
      type: "admin",
      _id: "5ea264ed75d49d462c904f51",
      email: "shresthapranish99@gmail.com",
      name: "Pranish",
      __v: 0,
      password: "$2a$10$xhbrT5ijsjTe/pqIhXGjz.FySDFqoKVYaA36GevoIjCXqnQpIZOLy",
    },
    Product: {
      _id: "5eaed9fbdbbd6a47f84d21f9",
      productName: "3D Copper Glass",
      productDescription:
        "Designed to look trendy and stylish, this light quite easily catches everyone’s attention. Thanks to the unconventional colour scheme which is inspired by the beautiful 3D pattern, it blends in with almost every style and setting.  What’s more? A cool combination of style and utility! The beautiful halo of random impressions on the glass lampshades with copper finish bring the amazing design to life when lit up. The artistic inclusion in the form of a painted glass sphere shade also gives this light a funky yet classy look.",
      productPrice: 100,
      productCategory: "Pendant Light - Cluster Pendant",
      productThumbnail:
        "https://www.lightosphere.com.au/image/cache/data/productImages/BM10CPA014_1-600x600.jpg",
      __v: 0,
    },
    Quantity: 2,
    createdAt: "2020-05-04T14:04:26.502Z",
    updatedAt: "2020-05-04T14:04:26.502Z",
    __v: 0,
  },
  {
    active: true,
    modifiedOn: "2020-05-04T14:01:21.217Z",
    _id: "5eb020eae052210468c368f0",
    User: {
      type: "admin",
      _id: "5ea264ed75d49d462c90499",
      email: "shresthapranish99@gmail.com",
      name: "Pranish",
      __v: 0,
      password: "$2a$10$xhbrT5ijsjTe/pqIhXGjz.FySDFqoKVYaA36GevoIjCXqnQpIZOLy",
    },
    Product: {
      _id: "5eaed9fbdbbd6a47f84d2122",
      productName: "3D Copper Glass",
      productDescription:
        "Designed to look trendy and stylish, this light quite easily catches everyone’s attention. Thanks to the unconventional colour scheme which is inspired by the beautiful 3D pattern, it blends in with almost every style and setting.  What’s more? A cool combination of style and utility! The beautiful halo of random impressions on the glass lampshades with copper finish bring the amazing design to life when lit up. The artistic inclusion in the form of a painted glass sphere shade also gives this light a funky yet classy look.",
      productPrice: 100,
      productCategory: "Pendant Light - Cluster Pendant",
      productThumbnail:
        "https://www.lightosphere.com.au/image/cache/data/productImages/BM10CPA014_1-600x600.jpg",
      __v: 0,
    },
    Quantity: 2,
    createdAt: "2020-05-04T14:04:26.502Z",
    updatedAt: "2020-05-04T14:04:26.502Z",
    __v: 0,
  },
];

var filter = array.filter((product) => {
  return product.User._id === "5ea264ed75d49d462c904f51";
});

console.log(filter);
