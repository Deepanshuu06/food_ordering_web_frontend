import React from "react";
import RestaurantMenuItemCard from "./cards/RestaurantMenuItemCard";

function MenuSection({ card  , restaurantDetails }) {
 
    return <RestaurantMenuItemCard card={card} restaurantDetails={restaurantDetails} />;
  

//   if (card?.categories) {
//     card?.categories?.map((item) => {
//       return <h1>{item?.title}</h1>;
//     });
//   } else {
//     return <div>{card?.title}</div>;
//   }
}

export default MenuSection;
