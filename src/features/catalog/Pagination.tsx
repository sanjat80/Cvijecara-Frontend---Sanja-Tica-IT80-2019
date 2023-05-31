import React, { useState } from 'react';

interface Props  {
    postsPerPage: number;
    totalPosts: number;
    paginate:any;
    currentPage:number;
}

export default function Pagination ({postsPerPage, totalPosts, paginate, currentPage}:Props){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage);i++)
    {
        pageNumbers.push(i);
    }
    const handleClick = (pageNumber:any) => {// Ažuriraj trenutnu stranicu
        paginate(pageNumber);
      };
    
    
    return (
        <nav>
            <div className="pagination" >
                {pageNumbers.map(number =>(
                    <button onClick={() => handleClick(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}
                    style={{
                        padding: '8px 12px',
                        margin: '0 2px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        color: '#333',
                        cursor: 'pointer',
                        marginBottom:'50px',
                        marginTop:'50px'
                      }}
                    >
                        {number}
                    </button>    
                ))}
            </div>
        </nav>
    )
}