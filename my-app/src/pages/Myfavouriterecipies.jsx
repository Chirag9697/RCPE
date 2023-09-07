import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
export default function Myfavouriterecipies() {
  const navigate = useNavigate();
  const toast = useToast()
  const [favrecipies, setFavrecipies] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const getallmyfavouriterecipies = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        token: localStorage["token"],
      },
    };
    // const data = { findall: false };
    //   const registerdata={registerdetails};
    const allmyfavouriterecipies = await axios.get(
      "http://localhost:3000/api/v1/recipies/favourites",
      //   logindetails,
      requestOptions
    );
    const data = await allmyfavouriterecipies.data;
    console.log(data);
    setFavrecipies(data);
  };
  const deletefavrecipe = async (id) => {
    // onOpen();
    
    const requestOptions = {
      // method: "GET",
      headers: {
        token: localStorage["token"],
      },
    };
    // const data = { findall: false };
    //   const registerdata={registerdetails};
    const deletefavrecipe = await axios.delete(
      `http://localhost:3000/api/v1/recipies/favourites/${id}`,
      //   logindetails,
      requestOptions
    );
    // const data = await deletefavrecipe.data;
    if (!deletefavrecipe) {
      console.log("not able to delete");
      return;
    }
    toast({
      title: 'Delete',
      description: "deleted from favourite recipe",
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
    onClose();
    getallmyfavouriterecipies();
    // console.log(data);
    // setFavrecipies(data);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
      return;
    }
    getallmyfavouriterecipies();
  }, []);

  return (
    <>
      <Navbar login={true} />
      <Text sx={{fontWeight:"bold",marginTop:"20px",fontSize:"50px",textAlign:"center"}}>MY Favourite RECIPIES({favrecipies.length})</Text>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          margin: "auto",
          display: "flex",
          flexWrap:"wrap",
          padding:"16px",
          flexDirection: "column",
        }}
      >
        {favrecipies.map((recipe, index) => {
          return (
            <Card
              key={recipe.favrecipeid}
              maxW="sm"
              sx={{ marginBottom: "20px",width:"25%"}}
            >
              <CardBody>
              <Text>{recipe.username}</Text>
                <Image
                  src={recipe.filename}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{recipe.recipename}</Heading>
                  <Text>{recipe.description}</Text>
                </Stack>
                <Button
                  colorScheme="red"
                  onClick={onOpen}
                  sx={{marginTop:"10px"}}
                >
                  Delete
                </Button>
              </CardBody>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete from favourite recipe
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="red" onClick={()=>deletefavrecipe(recipe.favrecipeid)} ml={3}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>        
            </Card>
          );
        })}
      
      </div>
    </>
  );
}
