
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";
import { User } from "../interfaces/User";
import { errorMsg } from "../services/feedbackService";
import { getAllUsersDetail } from "../services/userServices";

interface AdminUsersProps {
    
}
 
const AdminUsers: FunctionComponent<AdminUsersProps> = () => {



        
        const { currentUser, cardArray,token } = useContext(GlobalProps);
        const [usersArray, setUsersArray] =useState<User []>([]);
    
    useEffect(() => {
        console.log('BEFORE')
        getAllUsersDetail(token)
        .then((res)=>{setUsersArray(res.data)
            console.log(res.data)
    })
        .catch((err)=>errorMsg(`Transaction Error - ${err.response.data}`))},[])
    
        // console.log(userArray);
        return (<>
    
    <h1>AdminUsers</h1>
    <h1>{usersArray.length}</h1>
    {usersArray.length > 0 ? (
            <p>
              {usersArray[0].name.first} {usersArray[0].name.last}
            </p>
          ) : (
            <p>No users available</p>
          )}
    
        </>);


}
 
export default AdminUsers;