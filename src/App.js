
import Authenticate from './components/Authenticate';
import React, {useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';


function App() {
  const [user, setUser] = useState({ haslogin: false, accessToken: "" });
  
  useEffect(() => {
    if(localStorage.getItem('access-token'))
    {
      setUser({
        haslogin: true,
        accessToken: localStorage.getItem('access-token')
      })
    }
  },[])

console.log(user)

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {!user.haslogin ? <Authenticate user={user} setUser={setUser} /> : <Dashboard user={user} />}
    </div>
  );
}

export default App;
