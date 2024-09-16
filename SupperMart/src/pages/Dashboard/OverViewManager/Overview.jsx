import React from "react";
import UpperBar from "../../../common/UpperBar/UpperBar";

const Overview = () => {
  const links = [
    { name: "Store", to: "/overview/addstore" },
    { name: "Category", to: "/overview/addcategory" },
    { name: "Sub Category", to: "/overview/addsubcategory" },
    { name: "Product", to: "/overview/addproduct" },
  ];

  return (
    <div>
      <UpperBar links={links} />
    </div>
  );
};

export default Overview;
