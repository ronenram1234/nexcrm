import { FunctionComponent, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { GlobalProps } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewCard, updateCard } from "../services/cardServices";
import { successMsg, errorMsg } from "../services/feedbackService";
import { CardRecFull, NewCard } from "../interfaces/Card";

interface NewEditCardProps {}

const NewEditCard: FunctionComponent<NewEditCardProps> = () => {
  const location = useLocation();
  const action = location.state?.action;
  const { currentUser, cardArray, setCardArray, token } = useContext(GlobalProps);
  let localCardArray:CardRecFull[]=[]

  const formik = useFormik<NewCard>({
    initialValues: {
      title: "Spolding and Sons Ltd.",
      subtitle: "Garden building supplier",
      description:
        "Our reputation for manufacturing and installing high-quality garden buildings continues to grow strong.Whether you’re looking for the perfect summer house to extend your outdoor living space, or you want a purpose built workshop, garage or just somewhere to keep your lawnmower, Spolding and Sons will work with you to build your dream garden buildings.",
      phone: "0502872545",
      email: "info@spoldingandsons.co.uk",
      web: "https://spoldingandsons.co.uk/",
      image: {
        url: "https://plus.unsplash.com/premium_photo-1673141390230-8b4a3c3152b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FyZGVufGVufDB8fDB8fHww",
        alt: "yard",
      },
      address: {
        state: "",
        country: "United Kingdom",
        city: "Chesterfield",
        street: "Campbell Drive",
        houseNumber: 10,
        zip: 68443,
      },
      // initialValues: {
      //   title: "",
      //   subtitle: "",
      //   description: "",
      //   phone: "",
      //   email: "",
      //   web: "",
      //   image: { url: "", alt: "" },
      //   address: {
      //     state: "",
      //     country: "",
      //     city: "",
      //     street: "",
      //     houseNumber: 0,
      //     zip: "",
      //   },
      user_id: currentUser?._id || "",
      
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required").min(2).max(256),
      subtitle: yup.string().required("Sub title is required").min(2).max(256),
      description: yup
        .string()
        .required("Description is required")
        .min(2)
        .max(1024),
      phone: yup
        .string()
        .required("Phone is required")
        // .matches(/^(05[0-9]{1})\d{6}$/, "Invalid phone number")
        .min(9)
        .max(11),

      email: yup
        .string()
        .min(5)
        .email("Invalid email address")
        .required("Email is required"),
      web: yup.string().min(14).url("Invalid URL"),
      image: yup.object({
        url: yup.string().url("Invalid URL").min(14, "URL is too short"),
        alt: yup.string().min(2).max(256),
      }),
      address: yup.object({
        state: yup.string(),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required"),
        street: yup.string().required("Street is required"),

        houseNumber: yup
          .number()
          .required("House number is required")
          .positive()
          .integer(),
        zip: yup.string(),
      }),
    }),
    onSubmit: async (values) => {
      if (action === "edit") {
        // const response = await updateCard();
        // successMsg("Card updated successfully!");
        // navigate("/cards");
      } else {
        // console.log(values);
        createNewCard(values, token)
          .then((res) => {
            console.log(res.data);
            
            if (cardArray!==null)
             localCardArray = [...cardArray];
            localCardArray.push(res.data);
            setCardArray(localCardArray);
          })
          .catch((err) => {
            console.log(err);
            errorMsg(`Transaction Error - ${err.response.data}`);
          });

        // successMsg("New card created successfully!");
        // navigate("/cards");
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="d-flex  align-items-center flex-column">
          <h5 className="display-5 my-2">New Card</h5>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Title*"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>

            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Subtitle*"
                type="text"
                name="subtitle"
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.subtitle && Boolean(formik.errors.subtitle)
                }
                helperText={formik.touched.subtitle && formik.errors.subtitle}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Description*"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </div>

            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Phone*"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Email*"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>

            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Web URL"
                type="url"
                name="web"
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.web && Boolean(formik.errors.web)}
                helperText={formik.touched.web && formik.errors.web}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Image URL"
                type="text"
                name="image.url"
                value={formik.values.image?.url || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.image?.url === true &&
                  Boolean(formik.errors.image?.url)
                }
                helperText={
                  formik.touched.image?.url === true
                    ? formik.errors.image?.url
                    : ""
                }
              />
            </div>

            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Image Alt"
                type="text"
                name="alt"
                value={formik.values.image?.alt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.image?.alt && Boolean(formik.errors.image?.alt)
                }
                helperText={
                  formik.touched.image?.alt && formik.errors.image?.alt
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="State"
                type="text"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </div>

            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Country*"
                type="text"
                name="address.country"
                value={formik.values.address.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.country &&
                  Boolean(formik.errors.address?.country)
                }
                helperText={
                  formik.touched.address?.country &&
                  formik.errors.address?.country
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="City*"
                type="text"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.city &&
                  Boolean(formik.errors.address?.city)
                }
                helperText={
                  formik.touched.address?.city && formik.errors.address?.city
                }
              />
            </div>

            <div className="form-floating mx-3 col-6">
              <TextField
                variant="outlined"
                label="Street*"
                type="text"
                name="address.street"
                value={formik.values.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.street &&
                  Boolean(formik.errors.address?.street)
                }
                helperText={
                  formik.touched.address?.street &&
                  formik.errors.address?.street
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="House Number*"
                type="number"
                name="address.houseNumber"
                value={formik.values.address.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.houseNumber &&
                  Boolean(formik.errors.address?.houseNumber)
                }
                helperText={
                  formik.touched.address?.houseNumber &&
                  formik.errors.address?.houseNumber
                }
              />
            </div>

            <div className="form-floating mx-3 col-6 mt-4">
              <TextField
                variant="outlined"
                label="Zip Code"
                type="text"
                name="address.zip"
                value={formik.values.address.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.address?.zip &&
                  Boolean(formik.errors.address?.zip)
                }
                helperText={
                  formik.touched.address?.zip && formik.errors.address?.zip
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-item-center flex-row col-12 mt-4">
            <div className="mx-3 mt-4 col-6 ">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
            <div className="mx-3 mt-4 col-6 ">
              <button type="submit" className="btn btn-secondary w-100">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewEditCard;
