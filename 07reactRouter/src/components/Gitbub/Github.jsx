import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
export default function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://api.github.com/users/anikmistry');
    //             const data = await response.json();
    //             console.log(data);
    //             setData(data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <>
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
            <h1 className='font-bold text-red-600'>Github Profile</h1>
            <h1>Name: {data.name}</h1>
            <h1>Total Repo: {data.public_repos}</h1>
            <h1>Github followers: {data.followers}</h1>
        </div>
        <div className='flex justify-center'><img src={data.avatar_url} alt="" />
        </div>
        </>
    )
}

export  const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/anikmistry')
    return response.json();
}


