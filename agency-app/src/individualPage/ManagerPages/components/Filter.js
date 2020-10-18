import React from "react";

export const Filter =({value,handleChange})=>{
    return(
        <div className='search' >
            <form className="form-inline" >
                <input
                    className="form-control form-control-sm ml-2 w-30 animate__animated  animate__fadeInLeft" type="text" placeholder="Search"
                    aria-label="Search By Expert"
                    value={value}
                    onChange={handleChange}
                    style={{height: "100px" }}
                />
            </form>
        </div>
    )
}