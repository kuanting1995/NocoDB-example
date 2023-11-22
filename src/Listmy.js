import React, { useEffect, useState } from "react";
import axios from "axios";

const Listmy = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8080/api/v1/db/data/noco/plljb7z8fyn4ye8/guest/views/%E6%B4%BB%E5%8B%95%E5%8F%83%E5%8A%A0%E4%BA%BA",
      params: { offset: "0", limit: "25", where: "" },
      headers: {
        "xc-auth":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsYWlyZWx1QGtmc3lzY2Mub3JnIiwiaWQiOiJ1c213NjY1OWFseHFneGNyIiwicm9sZXMiOnsib3JnLWxldmVsLWNyZWF0b3IiOnRydWUsInN1cGVyIjp0cnVlfSwidG9rZW5fdmVyc2lvbiI6IjA5N2RiYzJkNDg0YzAyYTM2ZmE1MjRiMDhjODRhNjBkNjNkMmM5NGQyZmQ3YTA5YTA0NTNjYThlYWY5YzQ0OWZhMGQwMWM3MTM4ZDRlZWRlIiwiaWF0IjoxNjk5ODM4NjQ5LCJleHAiOjE2OTk4NzQ2NDl9.blrlcmPWoIk01e-vetTqQaWQfoZrAyWgUN1oex-i__0",
      },
    };
//axios傳送資料
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1>春酒參與名單：</h1>
      {data ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>姓名</th>
              <th>性別</th>
              <th>年齡</th>
              <th>手機號碼</th>
            </tr>
          </thead>
          <tbody>
            {data.list.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Listmy;
