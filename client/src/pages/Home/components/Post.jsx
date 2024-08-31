import React from 'react';

function Post(props) {
  const DateTimeRefactor =
    props.time.split('T')[0].split('-').join('-') +
    ' ' +
    props.time.split('T')[1].split('.')[0];

  return (
    <div className="bg-slate-200 p-4 mt-3 mb-3 mr-12 ml-12 sm:mr-28 sm:ml-28 lg:mr-96 lg:ml-96 rounded-2xl ">
      <div className="flex justify-end "> {DateTimeRefactor} </div>
      <div className="flex justify-start font-bold">{props.email} </div>
      <div className="text-start pl-4 pt-4"> {props.Desc} </div>
      {props.img_url && (
        <div className="flex justify-center mt-4">
          <img src={props.img_url} alt="" className="w-3/4 h-3/4" />
        </div>
      )}
    </div>
  );
}

export default Post;
