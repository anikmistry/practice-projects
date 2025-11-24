import React from 'react';
import { useParams } from 'react-router-dom';

export default function User () {
    const {userId} = useParams()
    return (
        <>
        <div className='items-center flex justify-center text-2xl font-bold'>User:{userId}</div>
        </>
    )
}