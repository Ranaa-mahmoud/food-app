import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import { getCategories } from "../../../../api/modules/Categories";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteCategory } from './../../../../api/modules/Categories';

export default function CategoryList() {

  const[categoriesList,setCategoriesList]=useState([]);

  // get category
  
  const getCategory=async()=>{
    try{
      const response= await getCategories()
     setCategoriesList(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }
// delete
const DeleteCategory=async(id)=>{
  try{
      await deleteCategory(id)
      setCategoriesList((prev) =>
      prev.filter((category) => category.id !== id)
    );
  }catch(error){
    console.log(error)
  }
 
}

  useEffect(()=>{
    getCategory()
  },[])
  return (
    <>
      <Header
        title={
          <>
            Categories <span className="text-light fw-light">Item</span>
          </>
        }
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={photo}
      />
      <div className=" px-5 py-3   d-flex justify-content-between justify-content-center align-items-center">
        <div>
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success">Add New Category</button>
      </div>
      <div className="px-5 py-3 ">
      {categoriesList.length>0?
        <table className="table table-striped table-responsive text-center  ">
 <thead className="table-light  fs-5">
  <tr style={{ height: "50px" }}>
    <th className="py-4 px-3" scope="col">#</th>
    <th className="py-4 px-3" scope="col">Name</th>
    <th className="py-4 px-3" scope="col">Creation date</th>
    <th className="py-4 px-3" scope="col">Action</th>
  </tr>
</thead>
  <tbody> 
  
       {categoriesList.map(category=>
      <tr key={category.id} style={{ height: "65px" }}>
  <th scope="row" className="py-3 px-3">{category.id}</th>
  
  <td className="py-3 px-3">{category.name}</td>
  
  <td className="py-3 px-3">{category.creationDate}</td>
  
  <td className="py-3 px-3">
    <i 
      className="fa fa-edit text-warning mx-2" 
      style={{ cursor: "pointer", fontSize: "18px" }}
    ></i>
    
    <i  
 onClick={() => DeleteCategory(category.id)}
      className="fa fa-trash text-danger" 
      style={{ cursor: "pointer", fontSize: "18px" }}
    ></i>
  </td>
</tr>
    )}
  </tbody>
</table>:<NoData/>    }

      </div>
    </>
  );
}
