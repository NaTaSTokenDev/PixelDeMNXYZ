import { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function AttacksLeft({
    userAddress
  }: {
    userAddress: string;
  }): JSX.Element  {
  const [users, setUsers] = useState<{ id: string; time: string; taddress: string; todaysrolls: number }[]>([]);
  const usersCollectionRef = collection(db, "todaysrolls");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as { id: string; time: string; taddress: string; todaysrolls: number }[];
        setUsers(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => user.taddress === userAddress);

  return (
    <div>
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <span>{user.todaysrolls}</span>
        </div>
      ))}
    </div>
  );
}


export default AttacksLeft;
