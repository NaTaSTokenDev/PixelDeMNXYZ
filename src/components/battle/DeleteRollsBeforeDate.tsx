import React, { useState } from 'react';
import { getFirestore, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from "../../config/firebase-config";

interface DeleteRollsProps {
  userAddress: string;
}

const DeleteRollsBeforeDate: React.FC<DeleteRollsProps> = ({ userAddress }) => {
  const deleteBeforeDate = new Date('2023-06-25');

  const handleDelete = async () => {
    if (deleteBeforeDate) {
      try {
        const rollsCollectionRef = collection(db, 'rolls');

        const rollsQuerySnapshot = await getDocs(query(rollsCollectionRef));
        const rollsToDelete = rollsQuerySnapshot.docs.filter((doc) => {
          const docTimestamp = doc.data().timestamp;
          return docTimestamp && docTimestamp.toDate() < deleteBeforeDate;
        });

        const deletePromises = rollsToDelete.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log(`Deleted ${rollsToDelete.length} rolls before ${deleteBeforeDate}`);
      } catch (error) {
        console.error('Error deleting rolls:', error);
      }
    }
  };

  return (
    <div>
    
      <button className="button-a" onClick={handleDelete}>Delete Rolls</button>
    </div>
  );
};

export default DeleteRollsBeforeDate;
