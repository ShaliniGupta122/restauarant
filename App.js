import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  
  const [Restaurant, setRestaurants] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [form, setForm] = useState({ id: 0, name: '', type: '', location: '',
                                     rating: '' });


  //Fetch the data from API.
  useEffect(() => {
      fetchRestaurants()
  }, []);




  //Gets the list of Restaurant from the backend (Express --> Mongoose --> MongoDB)
  const fetchRestaurants = async () => {
      try {
          const response = await axios.get("http://localhost:8001/getAllTrainerss");
          console.log(response.data);
          setRestaurants(response.data);
      } catch (error) {
          console.error("Error fetching Restaurant..", error);
      }
  }
  const handleDelete = async (id) => {
      await axios.delete("http://localhost:8001/deleteRecord/" + id);
      fetchRestaurants();
  }
  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
  }


  //Setting the Edit record field..
  const handleEdit = (form) => {
      setForm(form);
      setEditRecord(true);
  }
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (editRecord) {
          await axios.put("http://localhost:8001/updateRestaurant"+form.id, form);
      } else {
          await axios.post("http://localhost:8001/insertData", form);
      }
      setForm({ id: 0, name: '', type: '', location: '', rating: '' });
      setEditRecord(false);
      fetchRestaurants();
  }
return (
      <div id="mystyle">
          <h3> Restaurant List...</h3>
          <table border={1} cellPadding={10}>
              <thead>
                  <tr>
                      <th> ID </th>
                      <th> Name </th>
                      <th> type </th>
                      <th>  location </th>
                      <th> rating </th>
                      <th> Action</th>
                  </tr>
              </thead>
              <tbody>
                  {Restaurant.map((rest) => (
                      <tr key={rest.id}>
                          <td>{rest.id}</td>
                          <td>{rest.name}</td>
                          <td>{rest.type}</td>
                          <td>{rest.location}</td>
                          <td>{rest.rating}</td>
                          <td>
                              <button onClick={() =>
                                  handleDelete(rest.id)}>Delete</button>
                              <button onClick={() => handleEdit(rest )}>Edit</button>
                              
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <br /><br />
          <div id="first">
          <h2> Form to update or add record...</h2>
          <form onSubmit={handleSubmit}>
          Id :  <input name='id' value={form.id} onChange={handleChange} /> <br /><br />
              Name :  <input name='name' value={form.name} onChange={handleChange} /><br /><br />
              type :  <input name='type' value={form.type} onChange={handleChange} /><br /><br />
               location <input name='location' value={form.location} onChange={handleChange} /><br /><br />
              rating :  <input name='rating' value={form.rating} onChange={handleChange} /> &nbsp;<br /><br />
              <button type='submit'>{editRecord ? 'Update' : 'Add'} Record </button>
          </form>
          </div>




          </div>
  );
}


export default App;