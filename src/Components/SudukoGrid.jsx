import React from 'react'

const SudukoGrid = () => {

    const Grid = Array.from({ length: 9 }, () => Array(9).fill(1));

   Grid?.map((row,rowInd)=>(
    row.map((col,colInd)=>(
        console.log(Grid[rowInd][colInd])
    ))
   ))
  return (
   <div className='flex justify-center flex-col items-center w-full h-screen'>
     <div>SudukoGrid</div>



     <div className='grid grid-cols-9'>
             {
                Grid.map((row,rowIndex)=>(
                    row.map((col,colInd)=>(
                        
                                <input
                                    className='h-[40px] border border-red-500  w-[40px] '

                                />
                        
                    ))
                ))
             }
     </div>


   </div>
  )
}

export default SudukoGrid