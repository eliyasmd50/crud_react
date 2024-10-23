import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get("http://localhost:2500/users").then ((res) => {
      setUsers(res.data);
      setFilterUsers(res.data);
    })
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  //search function
  const handleSearchChange = (e) => {
    const searchText =  e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText);
    })
    setFilterUsers(filteredUsers);
  };

  //delete function
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if(isConfirmed) {
    await axios.delete(`http://localhost:2500/users/${id}`).then((res)=> {
      setUsers(res.data);
      setFilterUsers(res.data);
    })
   }
  }

  return (
    <>
    <header>
      <h1>Create React App for CRUD application of users</h1>
    </header>
    <main>
      <article className='container'>
        <h2>Table of the users</h2>
        <br />

        <section className='input-search'>
          <input type="text" placeholder='Search Names here' onChange = {handleSearchChange}/>
          <button className='btn green'>Add Record</button>
        </section>
        <section>
          <table className='table'>
            <caption>User table CRUD</caption>
            <thead>
              <tr>
                <th scope='col'>S.NO</th>
                <th scope='col'>Name</th>
                <th scope='col'>Age</th>
                <th scope='col'>City</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers && 
                  filterUsers.map((user, index) => {
                return (
                  <tr key = {user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.Age}</td>
                    <td>{user.city}</td>
                    <td><button className='btn green'>Edit</button></td>
                    <td><button className='btn red' onClick={() =>handleDelete(user.id)}>Delete</button></td>
                  </tr>
                )
              }) }
            </tbody>
          </table>
        </section>
      </article>
    </main>
    <hr />
    <br />
    <footer>
      <p>
        <a href="#">Back to Top</a>
      </p>
    </footer>
    </>
  )
}

export default App
