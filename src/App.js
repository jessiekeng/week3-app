import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchItems();
    });
    return unsubscribe;
  }, []);

  // CRUD: Fetch items
  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(list);
  };

  // CRUD: Add item
  const addItem = async () => {
    if (!newItem) return;
    await addDoc(collection(db, "items"), { name: newItem });
    setNewItem("");
    fetchItems();
  };

  // CRUD: Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
    fetchItems();
  };

  // Auth: Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
    } catch (err) { alert(err.message); }
  };

  // Auth: Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
    } catch (err) { alert(err.message); }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user.email}!</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>CRUD Form</h3>
      <input type="text" placeholder="New item" value={newItem} onChange={e=>setNewItem(e.target.value)} />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} <button onClick={()=>deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
