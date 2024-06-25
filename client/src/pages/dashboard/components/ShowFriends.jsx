
import { ListGroup } from "flowbite-react";
import React from 'react'
import { useContext } from 'react';
import  DashboardContext  from "../../../context/DashboardProvider";

function ShowFriends() {
    const { email } = React.useContext(DashboardContext);
    console.log("This is the email", email)
  return (
    <div>
        <div className="flex justify-center">
      <ListGroup className="w-48">

        {email.map((friend) => (
            <ListGroup.Item>{friend}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    </div>
  )
}

export default ShowFriends

