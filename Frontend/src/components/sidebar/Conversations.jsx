import { useState, useEffect, useRef } from "react";
import Conversation from "./Conversation";
import axios from 'axios';

const Conversations = () => {
  const [data, setData] = useState([]);
  const endOfConversationsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', { withCredentials: true });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
	<div className="flex flex-col h-screen">
	<div className="flex-1 p-4 overflow-y-auto">
	  {data.map((conversation, index) => (
		<Conversation
		  key={index} // Use a unique key for each item
		  avatar={conversation.profilepic}
		  name={conversation.username}
		/>
	  ))}
	</div>
  </div>
  
  );
};

export default Conversations;
