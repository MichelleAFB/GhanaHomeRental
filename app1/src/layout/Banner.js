import React, { useState } from 'react'
import '../css/Banner.css'
import { Button } from "@material-ui/core";
import Search from '../Search';
import { useNavigate } from "react-router-dom";

function Banner() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search />}

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
            
        </div>
    )
}

export default Banner
