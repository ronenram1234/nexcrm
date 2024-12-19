import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";
import { User } from "../interfaces/User";
import { errorMsg } from "../services/feedbackService";
import { getAllUsersDetail } from "../services/userServices";
import ClipLoader from "react-spinners/ClipLoader";

import { 
  DataGrid, 
  GridColDef, 
  GridValueGetterParams,
   
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface AdminUsersProps {}

const AdminUsers: FunctionComponent<AdminUsersProps> = () => {
  const { token } = useContext(GlobalProps);
  const [usersArray, setUsersArray] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      document.body.classList.add("cursor-loading");
    } else {
      document.body.classList.remove("cursor-loading");
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getAllUsersDetail(token)
      .then((res) => {
        setUsersArray(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        errorMsg(`Transaction Error - ${err.response.data}`);
        setLoading(false);
      });
  }, [token]);

  // Updated columns without the fullName column
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "name.first",
      headerName: "First Name",
      width: 130,
      valueGetter: (params: GridValueGetterParams<User>) => params.row.name?.first || '',
      
    },
    {
      field: "name.last",
      headerName: "Last Name",
      width: 130,
      valueGetter: (params: GridValueGetterParams<User>) => params.row.name?.last || '',
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "address.city",
      headerName: "City",
      width: 120,
    },
    {
      field: "address.country",
      headerName: "Country",
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      valueGetter: (params) => (params.row.isAdmin ? "Yes" : "No"),
    },
    {
      field: "isBusiness",
      headerName: "Business",
      width: 120,
      valueGetter: (params) => (params.row.isBusiness ? "Yes" : "No"),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleDateString(),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <p className="h1 text-center fw-bolder">{loading ? "Loading..." : "Users Table"}</p>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader loading={loading} size={50} color="#00bcd4" />
        </div>
      ) : (
        <>
      
          <Paper sx={{ height: "70vh", width: "100%", border: "2px solid #000"  }}>
            <DataGrid
              rows={usersArray}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default AdminUsers;
