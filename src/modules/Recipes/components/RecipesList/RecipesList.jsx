import Header from "../../../Shared/components/Header/Header";
import photo from "/src/assets/images/header.png";
import { useEffect, useState } from "react";
import NoData from "../../../Shared/components/NoData/NoData";
import { deleteRecipes, getRecipes } from "../../../../api/modules/Recipes";

export default function RecipesList() {

 const[recipesList,setRecipesList]=useState([]);

  // get category
  const getList=async()=>{
    try{
      const response= await getRecipes()
     setRecipesList(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }
// delete
const deleteRecipe=async(id)=>{
  try{
      await deleteRecipes(id)
      setRecipesList((prev) =>
        prev.filter((recipe) => recipe.id !== id)
    );
  }catch(error){
    console.log(error)
  }
 
}

  useEffect(()=>{
    getList()
  },[])
 

 

 
  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={photo}
      />

      <div className="px-5 py-3 d-flex justify-content-between justify-content-center align-items-center">
        <div>
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button className="btn btn-success">Add New Item</button>
      </div>
<div className="px-5 py-3 ">
      {recipesList.length>0?
        <table className="table table-striped table-responsive text-center  ">
 <thead className="table-light  fs-5">
  <tr style={{ height: "50px" }}>
    <th className="py-4 px-3" scope="col">#</th>
    <th className="py-4 px-3" scope="col">Name</th>
    <th className="py-4 px-3" scope="col">Image</th>
    <th className="py-4 px-3" scope="col">Price</th>
    <th className="py-4 px-3" scope="col">Description</th>
    <th className="py-4 px-3" scope="col">Category</th>
        <th className="py-4 px-3" scope="col">Tag</th>
            <th className="py-4 px-3" scope="col">Action</th>



  </tr>
</thead>
  <tbody> 
  
       {recipesList.map(recipe=>
      <tr key={recipe.id} style={{ height: "65px" }}>
  <th scope="row" className="py-3 px-3">{recipe.id}</th>
  
  <td className="py-3 px-3">{recipe.name}</td>
  
  <td>
  {recipe.imagePath ? (
    <img classname="table-img" src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt={recipe.name} style={{width:"60px",height:"60px", objectfit:"cover" }} />
  ) : (
    <span>No Image</span>
  )}
</td>
    <td className="py-3 px-3">{recipe.price}</td>
  <td className="py-3 px-3">{recipe.description}</td> 
   <td className="py-3 px-3">{recipe.category[0]?.name }</td>
   <td className="py-3 px-3">{recipe.tag?.name }</td>

  <td className="py-3 px-3">
    <i 
      className="fa fa-edit text-warning mx-2" 
      style={{ cursor: "pointer", fontSize: "18px" }}
    ></i>
    
    <i  
 onClick={() => deleteRecipe(recipe.id)}
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