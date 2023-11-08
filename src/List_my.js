import axios from "axios";
import React, { useState, useEffect } from 'react';

const List_my = () => {

const options = {
  method: 'GET',
  url: 'http://localhost:8080/api/v1/db/data/noco/plljb7z8fyn4ye8/guest/views/%E6%B4%BB%E5%8B%95%E5%8F%83%E5%8A%A0%E4%BA%BA',
  params: {offset: '0', limit: '25', where: ''},
  headers: {
    'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsYWlyZWx1QGtmc3lzY2Mub3JnIiwiaWQiOiJ1c213NjY1OWFseHFneGNyIiwicm9sZXMiOiJvcmctbGV2ZWwtY3JlYXRvcixzdXBlciIsInRva2VuX3ZlcnNpb24iOiIwOTdkYmMyZDQ4NGMwMmEzNmZhNTI0YjA4Yzg0YTYwZDYzZDJjOTRkMmZkN2EwOWEwNDUzY2E4ZWFmOWM0NDlmYTBkMDFjNzEzOGQ0ZWVkZSIsImlhdCI6MTY5OTMyNDkwOCwiZXhwIjoxNjk5MzYwOTA4fQ.m21iN6gpGJ3C3sqbBuiVN9bQvJaRxfzQDW_c6nq2-Oc'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

  return (
    <table>
      <thead>
        <tr>
          <th>column1</th>
          <th>column2</th>
        </tr>
      </thead>
    </table>
  );
};

export default List_my;