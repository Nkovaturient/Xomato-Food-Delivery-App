import React, { useContext } from 'react'
import './FoodDisplay.css'
import { storeContext } from '../../context/storeContext'
import FoodItems from '../FoodItems/FoodItems';


const FoodDisplay = ({category}) => {

    const {food_list} = useContext(storeContext);

  return (
    <div className='food-display' id='food-display'>
        <h1>Top Dishes near you!</h1>
        <div className="food-display-list">
          {
            food_list.map((item, index)=>{
              if(category=== 'All' || category === item.category){
                return (
                  // <FoodItems item={item} index={index} /> or
                  <FoodItems key={index} id={item._id} name={item.name} image={item.image} description={item.description} price={item.price}  />
                )
              } 
    
            })
          }
        </div>
    </div>
  )
}

export default FoodDisplay