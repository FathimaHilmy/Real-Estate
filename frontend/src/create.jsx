import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const token = localStorage.getItem("token");
  const [propertydata, setpropertyData] = useState({
    propertyname: "",
    transactiontype: "",
    propertytype: "",
    price: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    setpropertyData({ ...propertydata, [e.target.name]: e.target.value });
  };

  const oncreate = async () => {
    try {
      console.log("frontnd sends", propertydata);
      const res = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertydata),
      });
      const result = await res.json();
      if (!res.ok) {
        alert("error occured");
      } else {
        alert("property added");
        setpropertyData("");
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="continer2">
        <h1 className="tex">Create a new property</h1>
        <input
          type="text"
          placeholder="Property Name"
          className="property"
          name="propertyname"
          value={propertydata.propertyname}
          onChange={handlechange}
        ></input>
        <select
          className="transactiontype"
          name="transactiontype"
          value={propertydata.transactiontype}
          onChange={handlechange}
        >
          <option value="">Transaction Type</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          className="propertytype"
          name="propertytype"
          value={propertydata.propertytype}
          onChange={handlechange}
        >
          <option value="">Property Type</option>
          <option value="land">Land</option>
          <option value="apartment">Apartment</option>
        </select>
        <input
          type="text"
          placeholder="Price"
          className="Price"
          name="price"
          value={propertydata.price}
          onChange={handlechange}
        ></input>
        <button className="crea" onClick={oncreate}>
          Create
        </button>
      </div>
    </>
  );
};

export default Create;
