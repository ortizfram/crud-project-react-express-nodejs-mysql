import { axios } from "axios";
import React, { useEffect, useState } from "react";

export function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/students")
      .then(() => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>Home</div>;
}

export default Home;
