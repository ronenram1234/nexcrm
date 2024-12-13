import { FunctionComponent, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { GlobalProps } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewCard, updateCard } from "../services/cardServices";
import { successMsg, errorMsg } from "../services/feedbackService";

interface NewEditCardProps {

   
}
 
const NewEditCard: FunctionComponent<NewEditCardProps> = () => {

    const location = useLocation(); 
    const action = location.state?.action;
    const {  currentUser, cardArray } = useContext(GlobalProps);

    const formik = useFormik({
        initialValues: {
            _id: "",
            title: "",
            subtitle: "",
            phone: "",
            email: "",
            web: "",
            image: { url: "", alt: "" },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: 0,
                zip: 0,
            },
            user_id: currentUser?._id || "",
            createdAt: new Date().toISOString(),
        },
        validationSchema: yup.object({
            title: yup.string().required("Title is required").min(2).max(256),
            subtitle: yup.string().min(2).max(256),
            phone: yup
                .string()
                .required("Phone is required")
                .min(9)
                .max(15)
                .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
            email: yup
                .string()
                .email("Invalid email address")
                .required("Email is required"),
            web: yup.string().url("Invalid URL"),
            image: yup.object({
                url: yup
                    .string()
                    .url("Invalid URL")
                    .required("Image URL is required"),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object({
                state: yup.string().min(2).max(256),
                country: yup.string().required("Country is required").min(2).max(256),
                city: yup.string().required("City is required").min(2).max(256),
                street: yup
                    .string()
                    .required("Street is required")
                    .min(2)
                    .max(256),
                houseNumber: yup
                    .number()
                    .required("House number is required")
                    .min(1)
                    .max(9999)
                    .positive()
                    .integer(),
                zip: yup
                    .number()
                    .positive()
                    .integer()
                    .required("ZIP code is required")
                    .min(2)
                    .max(99999),
            }),
        }),
        onSubmit: async (values) => {
            try {
                if (action === "edit") {
                    const response = await updateCard();
                    // successMsg("Card updated successfully!");
                    // navigate("/cards");
                } else {
                    const response = await createNewCard();
                    // successMsg("New card created successfully!");
                    // navigate("/cards");
                }
            } catch (err) {
                errorMsg("Error processing the request.");
                console.error(err);
            }
        },
    });
    
    return ( <>
    
    <h1>action - {action}</h1>
    </> );
}
 
export default NewEditCard;