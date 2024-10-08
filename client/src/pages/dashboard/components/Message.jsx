import React from 'react';
import photo from './user-icon-svgrepo-com.svg';

function Message(props) {
  return (
    <div>
      {props.Me ? (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={photo} />
            </div>
          </div>
          <div className="chat-header">
            {props.username}
            {/* <time className="text-xs opacity-50">12:46</time> */}
          </div>
          <div className="chat-bubble"> {props.msg}</div>
          {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={photo} />
            </div>
          </div>
          <div className="chat-header">
            {props.username}
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{props.msg}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      )}
    </div>
  );
}

export default Message;
