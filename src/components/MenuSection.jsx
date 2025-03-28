import React from "react";
import RestaurantMenuItemCard from "./cards/RestaurantMenuItemCard";

function MenuSection({ card }) {
 
    return <RestaurantMenuItemCard card={card} />;
  

//   if (card?.categories) {
//     card?.categories?.map((item) => {
//       return <h1>{item?.title}</h1>;
//     });
//   } else {
//     return <div>{card?.title}</div>;
//   }
}

export default MenuSection;
