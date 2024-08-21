'use client'
import MainLayout from "@components/layout/MainLayout";
import React, { useEffect, useState } from "react";
import ProductList from '../../../../components/ProductList';
import '../../../../src/app/globals.css'
import Title from "@components/common/Title";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../utils/firebase'; // Adjust the path to your firebaseConfig.js file

export default function Sale() {
  const [manufacturer, setManufacturer] = useState('');

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "manufacturers"));
        const manufacturers = querySnapshot.docs.map(doc => doc.data().name); // Adjust according to your Firestore structure
        setManufacturer(manufacturers.join(',')); // Assuming you want to join multiple manufacturers
      } catch (error) {
        console.error("Error fetching manufacturers: ", error);
      }
    };

    fetchManufacturers();
  }, []);

  return (
    <MainLayout>
      <Title text="SPECIAL OFFERS" />
      <ProductList
        category={manufacturer}  // Pass the manufacturer as the category
        order=">"
        limit=''
        group='Item_ID_Auto'
        type=''
      />
    </MainLayout>
  );
}
