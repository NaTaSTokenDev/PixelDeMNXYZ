import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../config/firebase-config";

interface SelectedUser {
  id: string;
  demnused: string;
  roll: number;
  taddress: string;
  time: string;
  win: boolean;
}

interface DeMNSelectProps {
  selectedValue: string;
  userAddress: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<SelectedUser[]>>;
  selectedUser: SelectedUser[];
}

const defaultUser: SelectedUser = {
  id: "",
  demnused: "N/A",
  roll: 0,
  taddress: "",
  time: "",
  win: false,
};

const RecentWinners: React.FC<DeMNSelectProps> = ({
    selectedValue,
    userAddress,
  }) => {
    const usersCollectionRef = collection(db, 'rolls');
    const [recentWinners, setRecentWinners] = useState<SelectedUser[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(usersCollectionRef);
          const fetchedData = querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            }) as SelectedUser
          );
  
          const matchingUsers = fetchedData.filter(
            (user) => user.win
          );
  
          setRecentWinners(matchingUsers);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [selectedValue]);
  
    return (
      <div>
        <div>

          <h6>Recent Winners:</h6>
          <ul>
            {recentWinners.map((user) => (
              <div key={user.id}>
                <p>{user.demnused} - Rolled: {user.roll}</p>
                <h5>{user.taddress}</h5> 
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default RecentWinners;