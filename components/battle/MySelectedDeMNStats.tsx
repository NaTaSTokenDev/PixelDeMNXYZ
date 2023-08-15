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
  setLevel1: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultUser: SelectedUser = {
  id: "",
  demnused: "N/A",
  roll: 0,
  taddress: "",
  time: "",
  win: false,
};

const MySelectedDeMN: React.FC<DeMNSelectProps> = ({
  selectedValue,
  userAddress,
  setLevel1
}) => {
  const usersCollectionRef = collection(db, 'rolls');
  const [selectedUserData, setSelectedUserData] = useState<SelectedUser[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [users, setUsers] = useState<SelectedUser[]>([]);

  useEffect(() => {
    const matchingUsers = users.filter(
      (user) => user.taddress === userAddress && user.demnused === selectedValue
    );
    setSelectedUserData(matchingUsers.length > 0 ? matchingUsers : [defaultUser]);

    const totalWins = matchingUsers.filter(user => user.win).length;

    if (totalWins >= 1) {
      setLevel1(true);
    } else {
      setLevel1(false);
    }
  }, [selectedValue, users, userAddress]);

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

        setUsers(fetchedData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const matchingUsers = users.filter(
      (user) => user.taddress === userAddress && user.demnused === selectedValue
    );
    setSelectedUserData(matchingUsers.length > 0 ? matchingUsers : [defaultUser]);
  }, [selectedValue, users]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>
        <h2>{selectedValue}</h2>
        {console.log (selectedUserData.length)}
        {selectedUserData.length !== 1 && ( // Conditionally render if selectedUserData has data
          <div>
            <p>Total Wins: {selectedUserData.filter(user => user.win).length}</p>
            <p>Last Rolls:</p>
            <ul>
              {selectedUserData.map((user) => (
                <div key={user.id}>
                  <p>{user.roll} - {user.win ? "Win" : "Lose"}</p>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySelectedDeMN;
