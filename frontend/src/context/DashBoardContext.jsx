import { createContext, useEffect, useMemo, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const dashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState();
  const [editData,setEditData] = useState({})
  const [allItems, setAllItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen,setEditOpen]=useState(false)
  const headers = {
    token: sessionStorage.getItem("token"),
  };

  //Get user info to check admin or not
  const getUserInfo = async () => {
    let userInfos;
    if (sessionStorage.getItem("token") != undefined) {
      userInfos = await jwtDecode(sessionStorage.getItem("token"));
      setUserInfo(userInfos);
    }
  };

  //Add New Product to DB
  const addItem = async () => {
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("productName", formData.product_name);
      form.append("price", formData.price);
      form.append("desscription", formData.desscription);
      form.append("quantity", formData.product_name);
      form.append("image", formData.image);
      const res = await axios.post(
        "http://localhost:4000/api/v1/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: headers.token,
          },
        }
      );
      getAllItem();
    } catch (e) {
      alert(e.message);
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  //Fetch All the products
  const getAllItem = async () => {
    const items = await axios.get("http://localhost:4000/api/v1/get-product", {
      headers: headers,
    });
    setAllItems(items.data.data);
  };

  //Hadle Ann new Item popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };

  //Handle Edit popup
  const editHandleClickOpen = (data) => {
    console.log(data,"<[=========")
    setEditData(data)
    setEditOpen(true);
  };

  const editHandleClose = () => {
    setEditOpen(false);
    setIsLoading(false);
  };

  //Handle Deleting a Product
  const handleDelete = async (id) => {
    try {
      setDelLoading(true);
      const deleted = await axios.delete(
        `http://localhost:4000/api/v1/del-product/${id}`,
        { headers: headers }
      );
      getAllItem()
    } catch (error) {
      alert(error.message);
    } finally {
      setDelLoading(false);
    }
  };

  //Handle Editing a product
  const handleEdit=async()=>{
    try {
        setEditLoading(true)
        let data = new FormData()
        data.append("id",editData.id);
        data.append("product_name", editData.product_name);
        data.append("price", editData.price);
        data.append("desscription", editData.desscription);
        data.append("quantity", editData.quantity);
        data.append("image", editData.image);
        const editedData = await axios.put("http://localhost:4000/api/v1/update-product",data,{headers:{
            "Content-Type":"multipart/form-data",
            token:headers.token
        }})
        // console.log(data,"<=========")
        getAllItem()
    } catch (error) {
        alert(error.message)
    }finally{
        setEditOpen(false)
        setEditLoading(false)
    }
  }
  return (
    <dashboardContext.Provider
      value={{
        userInfo,
        getUserInfo,
        getAllItem,
        allItems,
        formData,
        setFormData,
        addItem,
        isLoading,
        setIsLoading,
        handleClickOpen,
        handleClose,
        open,
        handleDelete,
        delLoading,
        editOpen,
        editHandleClickOpen,
        editHandleClose,
        setEditData,
        editData,
        handleEdit,
        editLoading,
        setEditLoading
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export { dashboardContext, DashboardContextProvider };
