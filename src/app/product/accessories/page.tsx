'use client'

import MainLayout from "@components/layout/MainLayout";
import React from "react";
import ProductList from '@components/ProductList';
import '../../../../src/app/globals.css'


export default function accessories () {
 return (
    <MainLayout> 
     <ProductList
        category="accessories"
        order=">="
        limit={12}
        group='Brand'
        type=''
     />
    </MainLayout>
 )
}