import React, { useEffect, useState } from 'react'

export default function Books() {
const [data, setData] = useState([])
    useEffect(()=> {
    fetch('http://localhost:3001/books')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  return (
    <div>
      <h1>Books</h1>
      <table align = "center">
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Rating</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key = {i}>
              <td> {d.title} </td>
              <td> {d.author} </td>
              <td> {d.rating} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}