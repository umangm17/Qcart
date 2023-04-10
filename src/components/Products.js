// import { Search, SentimentDissatisfied } from "@mui/icons-material";
// import {
//   CircularProgress,
//   Grid,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import axios from "axios";
// import {  useSnackbar } from "notistack";
// import React, { useEffect, useState } from "react";
// import { config } from "../App";
// import Footer from "./Footer";
// import Header from "./Header";
// import "./Products.css";
// import ProductCard from "./ProductCard";
// import Cart, { generateCartItemsFrom } from "./Cart";

// // Definition of Data Structures used
// /**
//  * @typedef {Object} Product - Data on product available to buy
//  *
//  * @property {string} name - The name or title of the product
//  * @property {string} category - The category that the product belongs to
//  * @property {number} cost - The price to buy the product
//  * @property {number} rating - The aggregate rating of the product (integer out of five)
//  * @property {string} image - Contains URL for the product image
//  * @property {string} _id - Unique ID for the product
//  */

// const Products = () => {
//   const { enqueueSnackbar } = useSnackbar(true)
//   const [dataList, setDataList] = useState([]);
//   const [loader, setLoader] = useState(0);
//   const [searchKey, setSearchKey] = useState("");
//   const [debounceTimeout, setdebounceTimeOut] = useState(null);
//   const [items, setItems] = useState([]);
//   // const [login,setLogin]=useState(false)
//   let userLogin = localStorage.getItem("token");
//   console.log(userLogin);


//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
//   /**
//    * Make API call to get the products list and store it to display the products
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on all available products
//    *
//    * API endpoint - "GET /products"
//    *
//    * Example for successful response from backend:
//    * HTTP 200
//    * [
//    *      {
//    *          "name": "iPhone XR",
//    *          "category": "Phones",
//    *          "cost": 100,
//    *          "rating": 4,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "v4sLtEcMpzabRyfx"
//    *      },
//    *      {
//    *          "name": "Basketball",
//    *          "category": "Sports",
//    *          "cost": 100,
//    *          "rating": 5,
//    *          "image": "https://i.imgur.com/lulqWzW.jpg",
//    *          "_id": "upLK9JbQ4rMhTwt4"
//    *      }
//    * ]
//    *
//    * Example for failed response from backend:
//    * HTTP 500
//    * {
//    *      "success": false,
//    *      "message": "Something went wrong. Check the backend console for more details"
//    * }
//    */

//   const performAPICall = async () => {
//     setLoader(1);
//     const apicall = `${config.endpoint}/products`;

//     console.log(apicall);
//     try {
//       let res = await axios.get(apicall);
//       // let responsedata = res.data;
//       let response = res.data;
//       // setDataList(responsedata);
//       setDataList(response);
//       // console.log(res);
//       console.log(response);
//       fetchCart();
//       setLoader(0);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     performAPICall();
//   }, []);

//   useEffect(() => {
//     fetchCart()
//       .then((cardData) => generateCartItemsFrom(cardData))
//       .then((cartItems) => setItems(cartItems));
//   }, []);

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
//   /**
//    * Definition for search handler
//    * This is the function that is called on adding new search keys
//    *
//    * @param {string} text
//    *    Text user types in the search bar. To filter the displayed products based on this text.
//    *
//    * @returns { Array.<Product> }
//    *      Array of objects with complete data on filtered set of products
//    *
//    * API endpoint - "GET /products/search?value=<search-query>"
//    *
//    */
//   const performSearch = async (text) => {
//     let searchUrl = `${config.endpoint}/products/search?value=${text}`;
//     // console.log(searchUrl)
//     setSearchKey(text);
//     try {
//       const response = await axios.get(searchUrl);
//       const newData = response.data;
//       setDataList(newData);
//     } catch (error) {
//       if (error.response.status === 404) {
//         setDataList([]);
//       } else {
//         return error;
//       }
//     }
//   };

//   // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
//   /**
//    * Definition for debounce handler
//    * With debounce, this is the function to be called whenever the user types text in the searchbar field
//    *
//    * @param {{ target: { value: string } }} event
//    *    JS event object emitted from the search input field
//    *
//    * @param {NodeJS.Timeout} debounceTimeout
//    *    Timer id set for the previous debounce call
//    *
//    */
//   const debounceSearch = (event, debounceTimeout) => {
//     const value = event.target.value;
//     // console.log(value)
//     setSearchKey(value);

//     if (debounceTimeout !== null) {
//       clearTimeout(debounceTimeout);
//     }

//     const newTimeout = setTimeout(() => {
//       performSearch(value);
//     }, 500);
//     setdebounceTimeOut(newTimeout);
//   };
//   const fetchCart = async (userLogin) => {
//     const cartApicall = `${config.endpoint}/cart`;
//     //  console.log(userLogin)
//     try {
//       if (userLogin!== null) {
//         let res = await axios.get(cartApicall, {
//           headers: {
//             Authorization: `Bearer ${userLogin}`,
//           },
//         });
//         return res.data;
//       }
//     } catch (error) {
//       // enqueueSnackbar("Could not fetch card details check backend is running  ", { variant: "error" })
//     }
//   };

//   // here we will use another thing called as tocheck if  already item is present
//   const isItemsInCart = (items, productId) => {
//     return items.findIndex((item) => item.productId === productId) !== -1;
//   };

//   const addToCart = async (userLogin,items, productId,qty,products) => {
//     if (userLogin!== null) {
//       enqueueSnackbar("Please login to cart for adding items", {
//         variant: "warning",
//       });
//       return;
//     }

//     if (isItemsInCart(items, productId)) {
//       enqueueSnackbar(
//         "Item already in cart. Use  the cart side bar to update qunatity or remove item ",
//         {
//           variant: "warning",
//         }
//       );
//       return;
//     }
//       try {
//        const res=await axios.get(`${config.endpoint}+/cart`,{
//         headers: {
//           Authorization: `Bearer ${userLogin}`,
//         }

//        })
//        console.log(res)
//        const cartItems=generateCartItemsFrom(res.data,products)
//        setItems(cartItems)
//       } catch(e) {
//         if (e.res){
//           enqueueSnackbar(e.res.data.message,{variant:"error"})
//         } else {
//           enqueueSnackbar("Could not fetch products .Check backend is running , return valid json ",{variant:"error"})
//         }

//       }
    
//     console.log("added to cart", productId);
//   };

//   return (
//     <div>
//       <Header>
//         {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

//         <Box className="search-desktop">
//           <TextField
//             className="search"
//             type="text"
//             size="small"
//             fullWidth
//             value={searchKey}
//             onChange={(event) => {
//               debounceSearch(event, debounceTimeout);
//             }}
//             InputProps={{
//               className: "search",
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Search color="primary" />
//                 </InputAdornment>
//               ),
//             }}
//             placeholder="Search for items/categories"
//           />
//         </Box>
//       </Header>

//       {/* Search view for mobiles */}
//       <TextField
//         type="text"
//         className="search-mobile"
//         size="small"
//         fullWidth
//         value={searchKey}
//         onChange={(event) => {
//           debounceSearch(event, debounceTimeout);
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         placeholder="Search for items/categories"
//         name="search"
//       />

//       {userLogin && (
//         <Grid container>
//           <Grid container spacing={2} md={9}>
//             <Grid item className="product-grid">
//               <Box className="hero">
//                 <p className="hero-heading">
//                   India’s{" "}
//                   <span className="hero-highlight">FASTEST DELIVERY</span> to
//                   your door step
//                 </p>
//               </Box>
//             </Grid>
//             <Grid container spacing={2}>
//               {loader === 1 && (
//                 <Box className="loading">
//                   <CircularProgress />
//                   <h4>Loading Products</h4>
//                 </Box>
//               )}
//               {loader === 0 &&
//                 (dataList.length > 0 ? (
//                   dataList.map((product) => (
//                     <Grid item xs={6} md={3} key={product._id}>
//                       <ProductCard product={product}
//                       handleAddTocart={()=>{
//                          addToCart(userLogin,items,product._id,1)
//                          }}
                      
//                       />
//                     </Grid>
//                   ))
//                 ) : (
//                   <Box className="loading">
//                     <SentimentDissatisfied color="action" />
//                     <h4>No products found</h4>
//                   </Box>
//                 ))}
//             </Grid>
//           </Grid>
//           <Grid item md={3} bgcolor="#E9F5E1">
//             <Cart  items={items}/>
//           </Grid>
//         </Grid>
//       )}
//       {userLogin == null && (
//         <Grid container>
//           <Grid item className="product-grid">
//             <Box className="hero">
//               <p className="hero-heading">
//                 India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
//                 to your door step
//               </p>
//             </Box>
//           </Grid>
//           <Grid container spacing={2}>
//             {loader === 1 && (
//               <Box className="loading">
//                 <CircularProgress />
//                 <h4>Loading Products</h4>
//               </Box>
//             )}
//             {loader === 0 &&
//               (dataList.length > 0 ? (
//                 dataList.map((product) => (
//                   <Grid item xs={6} md={3} key={product._id}>
//                     <ProductCard
//                       product={product}
//                       // handleAddTocart={()=>{
//                       //   addToCart(product._id)
//                       //  }}
//                     />
//                   </Grid>
//                 ))
//               ) : (
//                 <Box className="loading">
//                   <SentimentDissatisfied color="action" />
//                   <h4>No products found</h4>
//                 </Box>
//               ))}
//           </Grid>
//         </Grid>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Products;

import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { generateCartItemsFrom } from "./Cart.js";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
import Header from "./Header";
import "./Products.css";
// performAPI we one for search 
/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(0);
  const [debounce, setDebounce] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [items, setItems] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debounceSearch(e, 500);
  };

  const token = localStorage.getItem("token");

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  useEffect(() => {
    performAPICall();
  },[]);

  const performAPICall = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.endpoint}/products`);
      setProducts(res.data);
      setLoading(false);
      const cartData = await fetchCart(token);
      setItems(cartData);
      // console.log(cartData,'cartData');
      const cart = await generateCartItemsFrom(cartData, res.data);
      // console.log(cart,'cart from perform api');
      setCartItem(cart);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const searchData = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setStatus(0);
      setProducts(searchData.data);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
      if (e.response.status === 404) {
        setStatus(404);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const debounceCall = setTimeout(() => {
      performSearch(event.target.value);
    }, debounceTimeout);//500
    setDebounce(debounceCall);
  };

  // const data = {
  //   name: "Tan Leatherette Weekender Duffle",
  //   category: "Fashion",
  //   cost: 150,
  //   rating: 4,
  //   image:
  //     "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
  //   _id: "PmInA797xJhMIPti",
  // };

  // return (
  //   <div>
  //

  //     {/* Search view for mobiles */}
  // };

  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
        const cartData = await axios.get(`${config.endpoint}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
      });
      return cartData.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    if (items) {
      let check = items.filter((item) => item.productId === productId);
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const updateCartItem = (updatedData, products) => {
    const recieveAllData = generateCartItemsFrom(updatedData, products);
    setCartItem(recieveAllData);
  };

  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (!token) {
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "warning",
      });
      return;
    }
    if (options.preventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        "Item already in cart. Use the cart sidebar to update quantity or remove item.",
        { variant: "warning" }
      );
      return;
    }
    try {
      const toAdd = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(toAdd.data);
      updateCartItem(toAdd.data, products);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          size="small"
          type="text"
          name="search-box"
          className="search-desktop"
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleSearch(e)}
          placeholder="Search for items enter"
          value={search}
        />
      </Header>

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => handleSearch(e)}
        placeholder="Search for items/categories"
        value={search}
      />
      {/* <Grid container direction="row" justifyContent="center"> */}
        {/* <Grid container item md={9} spacing={2}> */}
          <Grid container>
            <Grid item className="product-grid" md={token ? 9 : 12}>
              <Box className="hero" mb={3} mt={2}>
                <p className="hero-heading">
                  India’s{" "}
                  <span className="hero-highlight">FASTEST DELIVERY</span> to
                  your door step
                </p>
              </Box>
            
          
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
              <p>Loading Products...</p>
            </Box>
          ) : status === 404 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <SentimentDissatisfied />
              <p>No products found</p>
            </Box>
          ) : (
            <Grid container className="product-container" spacing={2}>
              {products.map((item) => (
                <Grid item xs={12} md={3} sm={6} key={item._id}>
                  <ProductCard
                    product={item}
                    handleAddToCart={async () => {
                      await addToCart(token, items, products, item._id, 1, {
                        preventDuplicate: true,
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        {/* </Grid> */}
        {/* <Grid item md={3} text-align="center" bgcolor="#E9F5E1">
          <Cart
            products={products}
            items={cartItem}
            handleQuantity={addToCart}
          />
        </Grid> */}
        </Grid>
               
      {/* </Grid> */}
      {token ? (
          <Grid item xs={12} md={3} bgcolor="#E9F5E1">
            <Cart products={products} items={cartItem} handleQuantity={addToCart} />
          </Grid>
        ) : null}
       </Grid> 
      <Footer />
    </div>
  );
};

export default Products;
