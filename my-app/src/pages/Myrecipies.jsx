import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import Updaterecipies from "./Updaterecipies";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
export default function Myrecipies() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef();
  const [myrecipies, setMyrecipies] = useState([]);
  const [updaterecipe, setUpdaterecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false);
  const {
    isOpen: ismodalopen,
    onOpen: onmodalopen,
    onClose: onmodalclose,
  } = useDisclosure();
  const [commentrecipeid, setCommentrecipeid] = useState();
  const getallcomments = async (id) => {
    // setComments([]);
    // setCommentrecipeid(id);
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    const recipies = await axios.get(
      `https://rcpebackend3.onrender.com/api/v1/comments/${id}`,
      requestOptions
    );
    const data = await recipies.data;
    if (data) {
      setComments(data);
    }
    // console.log(data);

    onmodalopen();
    // if(ismodalopen){

    // }
    // if(isOpen==false){
    // setComments([]);
    // }
    // console.log(data);
  };
  const getallmyrecipies = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        token: localStorage["token"],
      },
    };
    // const data = { findall: false };
    //   const registerdata={registerdetails};
    const allmyrecipies = await axios.get(
      "https://rcpebackend3.onrender.com/api/v1/recipies/myrecipies",
      //   logindetails,
      requestOptions
    );
    const data = await allmyrecipies.data;
    const recipies = await data.recipies;
    setMyrecipies(recipies);
  };
  const deleterecipe = async (id) => {
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
      `https://rcpebackend3.onrender.com/api/v1/recipies/${id}`,
      //   logindetails,
      requestOptions
    );
    // const data = await deletefavrecipe.data;
    if (!deletefavrecipe) {
      console.log("not able to delete");
    }
    onClose();
    toast({
      title: 'Deleted',
      description: "successfully deleted",
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
    getallmyrecipies();
  };
  const handleupdate = (recipe) => {
    setUpdaterecipe(recipe);
    setUpdate(true);
  };
  const handlecommentupdate = (id) => {
    setCommentrecipeid(id);
    getallcomments(id);
  };
  const deletecomment = async (id) => {
    const requestOptions = {
      // method: "GET",
      headers: {
        token: localStorage["token"],
      },
    };
    // const data = { findall: false };
    //   const registerdata={registerdetails};
    const deletecomment = await axios.delete(
      `https://rcpebackend3.onrender.com/api/v1/comments/${id}`,
      //   logindetails,
      requestOptions
    );
    if (deletecomment) {
      toast({
        title: "comment deleted",
        description: "comment deleted.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
    // const data = await deletefavrecipe.data;
    // if (!deletefavrecipe) {
    // console.log("not able to delete");
    // }
    // onClose();
    getallcomments(commentrecipeid);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
      return;
    }
    getallmyrecipies();
  }, []);

  return (
    <div>
      <Navbar login={true} />
      {!update &&<Text
        sx={{
          fontWeight: "bold",
          marginTop: "20px",
          fontSize: "50px",
          textAlign: "center",
          fontFamily:"roboto"
        }}
      >
        MY <span className="text-green-400">RECIPIES</span>({myrecipies.length})
      </Text>
      }
      {!update && (
        <div
          className="flex w-full justify-center md:justify-around"
          style={{
            marginTop: "10px",
            // width: "100vw",
            margin: "auto",
            // display: "flex",
            padding:"20px",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            fontFamily:"roboto"
            // flexDirection: "column",
          }}
        >
          {myrecipies.map((recipe, index) => {
            return (
              <Card
                key={recipe.id}
                className="max-w-sm mb-5"
                sx={{
                  //  width: "38%", 
                  //  marginBottom: "20px",
                    // marginTop: "20px"
                   }}
              >
                <CardBody>
                  <Text sx={{ marginBottom: "10px", fontWeight: "bold" }}>
                    By {recipe.username}
                  </Text>
                  <Image
                    src={recipe.filename}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{recipe.recipename}</Heading>
                    <Text sx={{ marginBottom: "10px" }}>
                      {recipe.description}
                    </Text>
                  </Stack>
                  <div className="w-full flex flex-col items-center md:flex-row justify-center">
                    <Button
                      colorScheme="red"
                      className="w-20 mt-2"
                      onClick={onOpen}
                      sx={{ marginRight: "10px" }}
                    >
                      Delete
                    </Button>
                    <Button
                      colorScheme="green"
                      // onClick={onOpen}
                      className="w-20 mt-2"
                      // {...recipe}
                      onClick={() => handleupdate(recipe)}
                      sx={{ backgroundColor: "#6bf679" }}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="green"
                      // onClick={onOpen}
                      // {...recipe}
                      className="w-40 mt-2"
                      // onClick={()=>handleupdate(recipe)}
                      onClick={() => handlecommentupdate(recipe.id)}
                      sx={{ marginLeft: "10px", backgroundColor: "#6bf679" }}
                    >
                      UpdateComments
                    </Button>
                  </div>
                </CardBody>
                <Modal isOpen={ismodalopen} onClose={onmodalclose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Comments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody sx={{}}>
                      {/* <di>  */}
                      <div style={{ height: "50vh", overflowY: "scroll" }}>
                        {comments.map((comment, index) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                // backgroundColor: "grey",
                                border: "2px solid black",
                                padding: "10px",
                                borderRadius: "20px",
                                // boxShadow:"10px",
                                marginBottom: "10px",
                              }}
                            >
                              <Text sx={{ fontWeight: "bold" }}>
                                By {comment.commentowner}
                              </Text>
                              <ReactStars
                                count={5}
                                value={comment.rating || 1}
                                // onChange={ratingChanged}
                                // value={5}
                                size={24}
                                activeColor="#ffd700"
                                isHalf={true}
                                edit={false}
                              />
                              <p>{comment.commenttext}</p>
                              <Button
                                colorScheme="red"
                                onClick={() => deletecomment(comment.id)}
                              >
                                delete comment
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      {/* </div> */}
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Recipe
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleterecipe(recipe.id)}
                          ml={3}
                        >
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
      )}

      {update && <Updaterecipies {...updaterecipe} />}
    </div>
  );
}
