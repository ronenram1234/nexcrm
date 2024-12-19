import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GlobalProps } from "../App";
import { User } from "../interfaces/User";
import { errorMsg } from "../services/feedbackService";
import { getAllUsersDetail } from "../services/userServices";
import ClipLoader from "react-spinners/ClipLoader";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { CardRecFull } from "../interfaces/Card";

interface AdminCardsProps {}

const AdminCards: FunctionComponent<AdminCardsProps> = () => {
  const { cardArray } = useContext(GlobalProps);
  const [cards, setCards] = useState<CardRecFull[]>([]);

  //   let cards:CardRecFull[]= []

  useEffect(() => {
    
    if (cardArray !== null) setCards(cardArray);
  }, [cardArray]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      document.body.classList.add("cursor-loading");
    } else {
      document.body.classList.remove("cursor-loading");
    }
  }, [loading]);

  //   useEffect(() => {
  //     setLoading(true);
  //     getAllUsersDetail(token)
  //       .then((res) => {
  //         setUsersArray(res.data);
  //         console.log(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         errorMsg(`Transaction Error - ${err.response.data}`);
  //         setLoading(false);
  //       });
  //   }, [token]);

  // Updated columns without the fullName column
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "subtitle",
      headerName: "Subtitle",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
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
      field: "web",
      headerName: "Website",
      width: 180,
    },
    {
      field: "image.url",
      headerName: "Image URL",
      width: 200,
      valueGetter: (params) => params.row.image?.url || "",
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
      field: "address.street",
      headerName: "Street",
      width: 180,
    },
    {
      field: "address.houseNumber",
      headerName: "House Number",
      width: 120,
    },
    {
      field: "address.zip",
      headerName: "ZIP Code",
      width: 120,
    },
    {
      field: "bizNumber",
      headerName: "Business Number",
      width: 150,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 150,
      valueGetter: (params) => (params.row.likes ? params.row.likes.length : 0),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      valueGetter: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
      sortComparator: (v1, v2) =>
        new Date(v1).getTime() - new Date(v2).getTime(),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <p className="h1 text-center fw-bolder">
        {loading ? "Loading..." : "Cards Table"}
      </p>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader loading={loading} size={50} color="#00bcd4" />
        </div>
      ) : (
        <>
          <Paper
            sx={{ height: "70vh", width: "100%", border: "2px solid #000" }}
          >
            <DataGrid
              rows={cards}
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

export default AdminCards;
