import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = "https://your-api.com/items"; // Replace with actual API URI

const UpdateItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing item when component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URI}/${itemId}`);
        setItem(response.data);
        setUpdatedValue(response.data.name); // Assuming the item has a 'name' field
      } catch (error) {
        setMessage("Error fetching item");
        console.error(error);
      }
    };

    fetchItem();
  }, [itemId]);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  // Handle item update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URI}/${itemId}`, {
        name: updatedValue, // Adjust based on your API fields
      });
      setItem(response.data);
      setMessage("Item updated successfully!");
    } catch (error) {
      setMessage("Error updating item");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      {item ? (
        <div>
          <p>Current Value: {item.name}</p>
          <input type="text" value={updatedValue} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;
