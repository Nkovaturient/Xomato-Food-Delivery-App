import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '', //0
        category: 'Salad',
    });

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // useEffect(()=>{
    //     console.log(data);
    // }, [data])whenever data gets updates

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append("name", data.name) //all stored in our data obj
            formData.append("description", data.description)
            formData.append("price", Number(data.price)) //convert price strng to no.
            formData.append("category", data.category)
            formData.append("image", image)


            let response = await axios.post(`${url}/api/food/add`, formData)
            if (response.data.success) { //refreshing the form after sending the data to backend
                setData({
                    name: '',
                    description: '',
                    price: '', //0
                    category: 'Salad',
                })
                setImage(false);
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "colored",
                });
            }


        } catch (err) {
            toast.error(err.message);
            console.log(`Error in adding product-${err.message}`)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler} >
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="img" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])}
                        type="file" id='image' hidden required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleOnChange} value={data.name}
                        type="text" name='name' placeholder='enter here' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleOnChange} value={data.description}
                        name="description" rows='6' placeholder='give your product description..' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleOnChange}
                            name="category" required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleOnChange} value={data.price}
                            type="Number" name='price' placeholder='💲20' />

                    </div>
                </div>
                <button className='add-btn' type='submit'>ADD PRODUCT</button>
            </form>

        </div>
    )
}

export default Add