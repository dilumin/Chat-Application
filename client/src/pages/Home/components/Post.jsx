import React from 'react'

function Post(props) {
return (
    <div className='bg-slate-200 p-4 mt-3 mb-3 w-3/5 min-w-500px rounded-2xl '>
            <div className='flex justify-end '> {props.time} </div>
            <div className='flex justify-start font-bold' >{props.email} </div>
            <div className='text-start pl-4 pt-4'> {props.Desc} </div>
    </div>
)
}

export default Post