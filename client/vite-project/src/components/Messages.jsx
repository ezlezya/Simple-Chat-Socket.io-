import React from 'react'

export default function Messages({ messages, user }) {
  return (
    <div style={{overflow: "hidden", backgroundColor: "#312e2e"}}>
      {
        messages.map((item, index) => (
          <div key={index} style={{ maxHeight: "100vh", width: "90%", margin: "10px"}}>
            <h2 style={item.user === user ? {display: "flex", color: 'white', fontSize: "28px", backgroundColor: "#4450FD", borderRadius: "10px", padding: "10px"} : {color: "white", fontSize: "28px", border: "1px solid", borderRadius: "10px", padding: "10px"}}>{item.user === user ? "You" : item.user}: {item.message}</h2>
          </div>
        ))
      }
    </div>
  )
}
