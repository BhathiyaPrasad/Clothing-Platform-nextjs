
'use client'
import MainLayout from "@components/layout/MainLayout";
import React from "react";
import ProductList from '../../../../../components/ProductList';
import '../../../../app/globals.css'


export default function skirts () {
    return (
     <MainLayout> 
     <ProductList
     category="women"
     order=">="
     limit={12}
     group='Brand'
     type='dresses'
     /></MainLayout>
    )
}