import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
// import io from "socket.io-client";
// const socket = io.connect("https://rcpebackend3.onrender.com");

export default function Navbar(props) {
  const navigate = useNavigate();
  const toast = useToast();
    const handlelogout = () => {
      console.log("logout");
      localStorage.removeItem("token");
      toast({
        title: "Logout",
        description: "successfully logged out",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate("/");
    };
  const theme = "#6bf679";
  // useEffect(() => {
      // if (props.login == true) {
      // socket.on("notification", (message) => {
      //   // Handle the incoming notification data
      //   toast({
      //     title: "Notification",
      //     description: `${message}`,
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      //   });

        // You can update the state or trigger a notification component here
      // });

      // Don't forget to remove the listener when the component unmounts
      // return () => {
        // socket.off("notification");
      // };
      // }
      // else{
        // return;
      // }
    // }, []);
  return (
    <>
      <nav
        className="flex  flex-col items-center w-full h-2/3  text-white md:flex-row  justify-between h-12 lg:justify-between  bg-green-400"
        style={{
            fontFamily:"roboto"
        //   width: "100vw",
        //   height: "10vh",
        //   backgroundColor: `${theme}`,
        //   display: "flex",
        //   justifyContent: "space-between",
        //   color: "white",
        //   alignItems: "center",
        }}
      >
        <div
          className="flex flex-col  justify-between md:flex-row"
          style={{
            display: "flex",
            width: "10vw",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Link to="/">
            <div
              className="w-14"
              style={{
                fontWeight: "bold",
                fontSize: "3xl",
                marginLeft: "10px",
                fontFamily: "serif",
              }}
            >
              RCPE
            </div>
          </Link>
          {props.login == true && (
            <Link to="/home">
              <div className="w-24 ml-4 mt-2 md:mt-0">Home</div>
            </Link>
          )}
        </div>
        <div
          className="p-2 w-full flex mt-2 items-center md:w-full justify-center  lg:w-2/4 justify-end"
          style={
            {
              // display: "flex",
              // width: "30vw",
              // justifyContent: `${
              // props.login == true ? "space-between" : "flex-end"
              // }`,
              // alignItems: "center",
            }
          }
        >
          {props.login == true && (
            <>
              <Link className="" to="/createrecipe">
                <div className="w-24" style={{ cursor: "pointer" }}>
                  Add Recipe
                </div>
              </Link>
              <Link to="/myfavouriterecipe">
                <div className="w-28" style={{ cursor: "pointer" }}>
                  My favourites
                </div>
              </Link>
              <Link to="/myrecipe">
                <div className="w-24" style={{ cursor: "pointer" }}>
                  My Recipies
                </div>
              </Link>
              <div>
                <Button
                  colorScheme="green"
                  // className="w-16 mr-5 p-3"
                  className="w-18 p-1 mb-2"
                  sx={{ backgroundColor: `${theme}` }}
                  onClick={handlelogout}
                >
                  LOGOUT
                </Button>
              </div>
            </>
          )}
          {props.login == false && (
            <>
              <Link to="/login">
                <Button
                  colorScheme="green"
                  className="w-14 mr-5 p-3"
                  sx={
                    {
                      // backgroundColor: `${theme}`,width:"5vw",height:"5vh",marginRight:"10px"
                    }
                  }
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  colorScheme="green"
                  className="w-20 mr-5 p-3"
                  sx={
                    {
                      // backgroundColor: `${theme}`,width:"7vw",height:"5vh"
                    }
                  }
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
