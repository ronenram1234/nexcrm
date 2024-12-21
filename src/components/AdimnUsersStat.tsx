import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { GlobalProps } from "../App";

import { Select, MenuItem } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Likes, PieLikes } from "../interfaces/Card";
import { User } from "../interfaces/User";
import { getAllUsersDetail } from "../services/userServices";
import { errorMsg } from "../services/feedbackService";
import ClipLoader from "react-spinners/ClipLoader";

interface AdinUsersStatProps {}

const AdinUsersStat: FunctionComponent<AdinUsersStatProps> = () => {
  const { cardArray, token } = useContext(GlobalProps);

  const [pie, setPie] = useState<PieLikes[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("3");

  const [seriesValue, setSeriesValue] = useState<number[]>([3, 2, 1]);
  const [seriesGroup, setSeriesGroup] = useState<string[]>([]);

  const [usersArray, setUsersArray] = useState<User[]>([]);
  //   const [userAdmins, setuserAdmins] = useState<UserAdmin[]>([]);

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
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        errorMsg(`Transaction Error - ${err.response.data}`);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    let series: string[] = [];
    let val: number[] = [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // setLoading(true);
    // getAllUsersDetail(token)
    //   .then((res) => {
        // setUsersArray(res.data);
        for (let i = 0; i < Number(selectedValue); i++) {
          let month = currentMonth - i;
          let year = currentYear;
          if (month < 0) {
            month = 12 + month;
            year -= 1;
          }

          const monthYear = new Date(year, month).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });

          series.push(monthYear);
        //   console.log(series);
          if (usersArray !== null) {
            const userPerMonth = usersArray.reduce((acc, user) => {
              // console.log(user)
              // console.log(user.createdAt);
              const date = new Date(user.createdAt);
              //    console.log(date)
              const createdMonthYear = date.toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              });
              //    console.log(createdMonthYear)

              if (createdMonthYear === monthYear) {
                return acc + 1;
              }
              return acc;
            }, 0);
            // console.log(userPerMonth);
            val.push(userPerMonth);
            // console.log(val);
          }
        // }

        setSeriesGroup(series);
        setSeriesValue(val);
        // setLoading(false);
      }
    // )
    //   .catch((err) => {
    //     errorMsg(`Transaction Error - ${err.response.data}`);
    //     setLoading(false);
    //   });
  }, [selectedValue,usersArray]);

  useEffect(() => {
    const likesCount: Likes[] = [{ label: 0, count: 0 }];
    const likesCountString: PieLikes[] = [];

    //  console.log(cardArray);
    cardArray !== null &&
      cardArray.forEach((card) => {
        if (Array.isArray(card.likes) && card.likes.length !== undefined) {
          const found = likesCount.find(
            (like) => like.label === (card.likes ? card.likes.length : 0)
          );

          if (found) {
            found.count++;
          } else {
            likesCount.push({ label: card.likes.length, count: 1 });
          }
        }
      });

    likesCount.sort((a: Likes, b: Likes) => a.label - b.label);

    likesCount.forEach((likes) => {
      likesCountString.push({
        label: likes.label.toString(),
        value: likes.count,
      });
    });

    setPie(likesCountString);
  }, [cardArray]);

  function handleChange(event: any) {
    setSelectedValue(event.target.value as string);
  }

  return (
    <>
      <p className="h1 text-center fw-bolder">
        {loading ? "Loading..." : "Users Table"}
      </p>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader loading={loading} size={50} color="#00bcd4" />
        </div>
      ) : (
        <>
          <div className="col col-6">
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              <strong>Users Groupd by number of cards</strong>
            </div>
            <PieChart
              series={[
                {
                  data: pie,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </div>

          <div className="col col-6">
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              <strong>New Users by Month</strong>
            </div>
            <BarChart
              xAxis={[{ scaleType: "band", data: seriesGroup }]}
              series={[{ data: seriesValue }]}
              width={500}
              height={300}
            />
            <Select
              value={selectedValue}
              label="Time Range"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="3">Last 3 months</MenuItem>
              <MenuItem value="6">Last 6 months</MenuItem>
              <MenuItem value="12">Last 12 months</MenuItem>
              <MenuItem value="24">Last 24 months</MenuItem>
              <MenuItem value="36">Last 36 months</MenuItem>
            </Select>
          </div>
        </>
      )}
    </>
  );
};

export default AdinUsersStat;
