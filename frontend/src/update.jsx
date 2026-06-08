import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update = () => {
  const token = localStorage.getItem("token");
  const [upddata, setupdData] = useState({
    propertyname: "",
    transactiontype: "",
    propertytype: "",
    price: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    setupdData({ ...upddata, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  const onupd = async () => {
    try {
      console.log("frontnd sends", upddata);
      console.log("this is id", id);
      const res = await fetch(`http://localhost:3000/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upddata),
      });
      const result = await res.json();
      if (!res.ok) {
        alert("error occured");
      } else {
        alert("property updated");
        setupdData("");
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="continer2">
        <h1 className="tex">Update property</h1>
        <input
          type="text"
          placeholder="Property Name"
          className="property"
          name="propertyname"
          value={upddata.propertyname}
          onChange={handlechange}
        ></input>
        <select
          className="transactiontype"
          name="transactiontype"
          value={upddata.transactiontype}
          onChange={handlechange}
        >
          <option value="">Transaction Type</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select
          className="propertytype"
          name="propertytype"
          value={upddata.propertytype}
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
          value={upddata.price}
          onChange={handlechange}
        ></input>
        <button
          className="crea"
          onClick={() => {
            {
              onupd();
            }
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Update;
