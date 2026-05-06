import axiosClient from "../axiosClient"

 export const getTags= () =>{
    return axiosClient.get('/tag')

}