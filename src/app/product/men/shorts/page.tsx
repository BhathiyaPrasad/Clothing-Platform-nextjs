'use client'
import MainLayout from "@components/layout/MainLayout";
import React from "react";
import ProductList from '../../../../../components/ProductList';
import '../../../../app/globals.css'



export default function shirts () {
    return (
     <MainLayout> 
     <ProductList
     category="men"
     order=">="
     limit={12}
     group='Brand'
     type='shorts'
     /></MainLayout>
    )
}