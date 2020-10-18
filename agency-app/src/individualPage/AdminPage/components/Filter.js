import React from "react";

export const Filter =({value,handleChange})=>{
    return(
        <div className='search'>
            <form className="form-inline" >
                <input
                    className="form-control form-control-sm ml-2 w-30 animate__animated  animate__fadeInLeft" type="text" placeholder="Search for email"
                    aria-label="Search"
                    value={value}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}
