import { FunctionComponent } from "react";

import AdminCardsStat from "./AdminCardsStat";
import AdimnUsersStat from "./AdimnUsersStat";

interface AdminStatsProps {}


const AdminStats: FunctionComponent<AdminStatsProps> = () => {
  

  return (
    <>

    <AdminCardsStat />
    <AdimnUsersStat />
   
    </>
  );
};

export default AdminStats;
