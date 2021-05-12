import React from 'react'

function Products({ apiData }) {
    return (
        <div>
        {
            apiData.map((d)=>{
                return (
                    <>
                        <h2 key={d.id}>{d.title}</h2>
                        <img key={d.id} src={d.image} alt='productImage' />

                    </>
                );
            })
        }
            
        </div>
    )
}

export default Products;