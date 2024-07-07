        
     /****** OUR CONTEXT API******* */
 /** enveloping our app component from main.jsx for feasible accessibility throughout */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const storeContext = createContext(null);

const storeContextProvider= (props)=>{

    const[cartItems, setCartItems]=useState({});
    const url=`https://xomato-food-delivery-app.onrender.com`; //http://localhost:4000
    const [token, setToken]=useState('')
    const [food_list, setFoodList]=useState([]); //to access from db

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){ //check if cartitemid was already present
            setCartItems((prev)=> ({...prev, [itemId]:1 }));//create a entry for carditem then will inc
        } else { //if any cart has 1 then inc
            setCartItems((prev)=> ({...prev, [itemId]: prev[itemId]+1}));
        }
        if(token){
            await axios.post(`${url}/api/cart/add`, {itemId}, {headers: {token}})
        }
    }

    const removeFromCart=async(itemId)=>{
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId]-1}));
        if(token){
            await axios.post(`${url}/api/cart/remove`, {itemId}, {headers: {token}})
        }
    }

    const loadCartData=async(token)=>{
            const response= await axios.post(`${url}/api/cart/get`, {headers: {token}})
            setCartItems(response.data.cartData);  
    }


    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems) {//bcuz cartItem is an object-forIn loop
            if(cartItems[item] > 0) { //if item qty is greater than 0

            let itemInfo=food_list.find((product) => product._id === item) //if from foodlist-that product is present and matches with cartitem
            totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }

    //fetching foodItems from db
    const getFoodList=async()=>{
        try{
            let response= await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data)
        }catch(err){
            console.log('dATA Fetch failed');
        }
       
    }


    useEffect(()=>{ //retrieving tokens in a state var
        async function loadData(){
            await getFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem("token"))
                
                await loadCartData(localStorage.getItem("token"))
            }
        }

        loadData();
    }, [])



    const contextValue={ /*here we cn define any func or value and access universally through CONTEXTAPI */
        food_list,
        setFoodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount, 
        url,
        token,
        setToken,
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // }, [cartItems])
    
    return(
        <storeContext.Provider value={contextValue}>
            {props.children}

        </storeContext.Provider>
    )
}

export default storeContextProvider;
