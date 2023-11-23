import React, { useEffect, useState } from "react";
import axios from "axios";

const Listmy = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8080/api/v1/db/data/noco/p5uvi4qv69nz6sx/test/views/test',
      params: {offset: '0', limit: '25', where: ''},
      headers: {
        'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsYWlyZUBrZnN5c2NjLm9yZyIsImlkIjoidXN4bmlneWE0NmNxOWl3cSIsInJvbGVzIjoib3JnLWxldmVsLWNyZWF0b3Isc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiMzU1MTA3MmQyMzhlYzIxZTI3MmUzNWE4OThjN2Y5NzUxMDYxMWRiNTI3YjM1YmQxNjliNDQ3MTQ4MzU2NTU3ZDVjNmZkOGRjZGI4Y2Q0NWYiLCJpYXQiOjE3MDA3MDE5NTQsImV4cCI6MTcwMDczNzk1NH0.8Y-WKMn3md5gj0MILbsv_5h_06bDI6vN2nB3jOB_la8'
      }
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
