// src/constants.js




export const NAVBAR_LOGO_PNG = 'https://img.freepik.com/premium-vector/food-zone-logo-restaurant_851538-48.jpg';
export const RESTAURANTS_API = `${import.meta.env.VITE_BASEURL}/restaurants/list/v5?lat=22.7496812&lng=75.8913294&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
export const RESTAURANTS_MENU_API = `${import.meta.env.VITE_BASEURL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7496812&lng=75.8913294&restaurantId=`
export const MOBILE_RESTAURANTS_MENU_API = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7556810678842&lng=75.88886048644781&restaurantId=439786&submitAction=ENTER`
export const HERO_SECTION_CONST_IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"
export const MENU_ITEM_CONST_IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"
export const OFFER_LOGO_CONST_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/"
export const APP_NAME = 'Food Zone';
export const LOCATION_API = `${import.meta.env.VITE_BASEURL}/misc/place-autocomplete?input=`
export const LATandLONG_API = `${import.meta.env.VITE_BASEURL}/misc/address-recommend?place_id=`