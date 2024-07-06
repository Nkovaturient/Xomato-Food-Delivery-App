import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

  const[list, setList]=useState([]);//storing all the db data in a state var

  const getFoodList= async()=>{ 
    try{

    const response= await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if(response.data.success)
      setList(response.data.data);
      setTimeout(() => {
        toast.info('Fetched your enlisted Food Items', {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
      });
        
      }, 3000);
  }
  catch(err){
    toast.error(err.message);
  }
    
  }

  const removeFood=async(itemId)=>{
    // console.log(itemId);
    try{
    const response=await axios.post(`${url}/api/food/delete`, {id: itemId});
    if(response.data.success)
    toast.info(response.data.message, {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
  });
  await getFoodList(); //refresh the pg after deletion
}
catch(err){
  toast.error(err.message);
}
  }


  useEffect(()=>{
    getFoodList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Food Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="img" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>💲{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>❌</p>

            </div>

          })
        }
      </div>
    </div>
  )
}

export default List