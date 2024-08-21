'use client'
import MainLayout from "@components/layout/MainLayout";
import React from "react";
import ProductList from '../../../../components/ProductList';
import '../../../../src/app/globals.css'
import Title from "@components/common/Title";


export default function week () {
    return (
     <MainLayout> 
       <Title text="WEEKLY SPECIALS" />
     <ProductList
     category=""
     order=">"
     limit=''
     group='Item_ID_Auto'
     type=''
     /></MainLayout>
    )
}