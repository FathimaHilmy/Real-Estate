import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { Button } from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, Slider, TextField } from "@mui/material";

const Main = () => {
  const token = localStorage.getItem("token");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [property, setproperty] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [price, setPrice] = useState([100, 100000]);
  const [priceAnchor, setPriceAnchor] = useState(null);
  const [selectedid, setselectedid] = useState(null);
  const [transtype, settranstype] = useState("");
  const [proptype, setproptype] = useState("");
  const priceOpen = Boolean(priceAnchor);

  const handletrans = async (e) => {
    try {
      const value = e.target.value;
      if (value == "") {
        const res = await fetch(
          `http://localhost:3000/api/getprop?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        console.log("this is the data", data);
        setproperty(data.result);
      } else {
        console.log(value);
        settranstype(value);
        console.log("selected value:", value);
        const res = await fetch(
          `http://localhost:3000/api/tfilt?type=${value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        setproperty(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handletpropt = async (e) => {
    try {
      const value = e.target.value;
      if (value == "") {
        const res = await fetch(
          `http://localhost:3000/api/getprop?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        console.log("this is the data", data);
        setproperty(data.result);
      } else {
        console.log(value);
        setproptype(value);
        console.log("selected value:", value);
        const res = await fetch(
          `http://localhost:3000/api/pfilt?type=${value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        setproperty(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleprice = async () => {
    try {
      const min = price[0];
      const max = price[1];
      console.log("this is min max at fomt", max, min);
      const res = await fetch(
        `http://localhost:3000/api/prfilt?min=${min}&max=${max}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      setproperty(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesliderchange = (event, newvalue) => {
    setPrice(newvalue);
  };

  const handlemin = (e) => {
    setPrice([Number(e.target.value), price[1]]);
  };
  const handlemax = (e) => {
    setPrice([price[0], Number(e.target.value)]);
  };
  const open = Boolean(anchorEl);
  const handleclick = (event, id) => {
    console.log("Selected id:", id);
    setAnchorEl(event.currentTarget);
    setselectedid(id);
  };

  const handleclose = () => {
    setAnchorEl(null);
  };
  const limit = 10;
  const onlogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const ondel = async (id) => {
    try {
      console.log("id at del", id);
      const res = await fetch(`http://localhost:3000/api/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setproperty((prev) => prev.filter((property) => property._id !== id));
    } catch (error) {
      error;
      console.log(error);
    }
  };
  const handleUpdate = (id) => {
    console.log("this is the id at handleupd", id);
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    const fetchprop = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/getprop?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        console.log("this is the data", data);
        setproperty(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprop();
  }, [page, limit]);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1 className="welcome"> Welcome back</h1>
        <Button
          className="logout"
          onClick={onlogout}
          variant="outlined"
          size="large"
          startIcon={<LogoutSharpIcon />}
        >
          Logout
        </Button>
      </div>
      <div className="container2">
        <button className="create" onClick={() => navigate("/create")}>
          <AddSharpIcon />
          create a new property
        </button>
        <select className="trans" onChange={handletrans}>
          <option value="">Show All</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <select className="prop" onChange={handletpropt}>
          <option value="">Show All</option>
          <option value="land">Land</option>
          <option value="apartment">Apartment</option>
        </select>
        <button
          className="price"
          onClick={(e) => setPriceAnchor(e.currentTarget)}
        >
          Price
        </button>
        <Menu
          anchorEl={priceAnchor}
          open={priceOpen}
          onClose={() => setPriceAnchor(null)}
        >
          <div className="ddown">
            <TextField
              label="Min"
              type="number"
              value={price[0]}
              onChange={handlemin}
              size="small"
            />

            <TextField
              label="Max"
              type="number"
              value={price[1]}
              onChange={handlemax}
              size="small"
            />
            <Slider
              value={price}
              onChange={handlesliderchange}
              min={0}
              max={100000000}
              valueLabelDisplay="auto"
            />
            <div className="buttoo">
              <button className="subm" onClick={handleprice}>
                Submit
              </button>
            </div>
          </div>
        </Menu>
      </div>
      <div className="Big">
        <div className="Box">
          {property && property.length > 0 ? (
            property.map((prop) => (
              <div key={prop._id} className="Box2">
                <div className="card">
                  <div className="toprow">
                    <span className="pric">
                      <CurrencyRupeeIcon />
                      {prop.price}
                    </span>
                    <div className="left">
                      <span
                        className={
                          prop.transactiontype == "sale"
                            ? "transtype"
                            : "transt"
                        }
                      >
                        {prop.transactiontype}
                      </span>
                      <button
                        className="butto"
                        onClick={(e) => {
                          console.log("button clicked");
                          handleclick(e, prop._id);
                        }}
                      >
                        <MoreVertIcon />
                      </button>
                    </div>
                  </div>
                  <div className="down">
                    <div className="propname">{prop.propertyname}</div>

                    <div className="proptype">
                      <HomeWorkIcon style={{ color: " brown" }} />
                      {prop.propertytype}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
      <Menu onClose={handleclose} open={open} anchorEl={anchorEl}>
        <MenuItem
          onClick={() => {
            console.log("id at on click", selectedid);
            handleUpdate(selectedid);
            {
              handleclose;
            }
          }}
          className="edit"
        >
          edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("id at cons", selectedid);
            ondel(selectedid);
            handleclose();
          }}
          className="delete"
        >
          delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Main;
