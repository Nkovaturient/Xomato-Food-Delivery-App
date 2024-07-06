import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams} from 'react-router-dom'
import { storeContext } from '../../context/storeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const [searchParams, setSearchParams]= useSearchParams()
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');
    const navigate=useNavigate();

    const {url}=useContext(storeContext);

    // function useQuery(){
    //     return new URLSearchParams(location.search);
    // }
    // let query=useQuery();

    // const getToken=()=>{
    //     const success=query.get('success');
    //     const orderId=query.get('orderId');

    //     console.log(success, orderId);
    // }

    // useEffect(()=>{
    //     getToken()
    // }, [])

    const verifyPayment=async()=>{
        const response=await axios.post(`${url}/api/order/verify`, {success, orderId})
        if(response.data.success){

            toast.success(`${response.data.message}`)
            navigate('/myorders');
        } else {
            toast.warning(`${response.data.message}`)
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment()
    }, [])

    
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify