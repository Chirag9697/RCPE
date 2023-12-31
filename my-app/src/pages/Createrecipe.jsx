import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AlertDialog,
} from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "@chakra-ui/react";
import uuid from "react-uuid";
import { Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
// import io from 'socket.io-client';
// import Navbar from "./components/Navbar";
import Navbar from "../components/Navbar";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "../App.css";
import { SearchIcon } from "@chakra-ui/icons";
import Login from "./Login.jsx";
import Register from "./Register";
import Reactrouter from "../components/Reactrouter";

const dataadded = [];
const dataadded2 = [];
const reorder = (list, startIndex, endIndex) => {
  console.log(list, startIndex, endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  console.log("removed", removed);
  result.splice(endIndex, 0, removed);
  // console.log(newresult);
  console.log("newresult", result);
  return result;
};
const additem = (list, startindex, endindex) => {
  const itemtobeadded = list[startindex];
  for (var i = 0; i < dataadded.length; i++) {
    if (itemtobeadded.ingredientname == dataadded[i].ingredientname) {
      return { dataadded, dataadded2 };
    }
  }
  if (endindex > dataadded.length - 1) {
    dataadded.push({ ...itemtobeadded, id: uuid() });
    dataadded2.push({ itemtobeadded });
  } else {
    dataadded.splice(endindex, 0, { ...itemtobeadded, id: uuid() });
    dataadded2.splice(endindex, 0, { itemtobeadded });
  }
  return { dataadded, dataadded2 };
};
// const socket = io.connect('http://localhost:3000');
function Createrecipe() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const Navigate = useNavigate();
  const toast = useToast();
  if (!localStorage.getItem("token")) {
    Navigate("/");
  }
  const theme = "#6bf679";

  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState([{}]);
  const [allrecipedetails, setAllrecipedetails] = useState({
    recipename: "",
    cookingtime: "",
    time: "",
    recipedescription: "",
    recipeinstruction: "",
    ingredient: [],
    recipeimage: null,
    quantity: [],
  });
  const handleSendNotification = () => {
    // socket.emit('sendNotification', notificationMessage);
    // console.log('Notification sent:', notificationMessage);
    // setNotificationMessage(''); // Clear the input field after sending
  };
  const handlechange = (e) => {
    setAllrecipedetails({
      ...allrecipedetails,

      [e.target.name]:
        e.target.name === "recipeimage" ? e.target.files["0"] : e.target.value,
    });
    console.log(allrecipedetails);
  };
  const handleinputchange = (ingredientname) => (event) => {
    console.log(event.target.value);
    // console.log(ingredients[0].itemtobeadded);
    var i;
    for (i = 0; i < ingredients.length; i++) {
      if (ingredients[i].itemtobeadded.ingredientname === ingredientname) {
        break;
      }
    }
    var flag = true;
    var j;
    for (j = 0; j < quantity.length; j++) {
      if (quantity[j].id === ingredients[i].itemtobeadded.id.toString()) {
        flag = false;
        break;
      }
    }
    if (flag == true) {
      // quantitites=
      var newquantity = {
        id: ingredients[i].itemtobeadded.id.toString(),
        quantity: 0,
        size: "",
      };
      newquantity[`${event.target.name}`] = event.target.value;
      if (quantity.length == 0) {
        quantity[0] = newquantity;
        // setQuantity(quantity);
      } else {
        quantity.push(newquantity);
      }
      setQuantity(quantity);
      console.log(quantity);
    } else {
      quantity[j][`${event.target.name}`] = event.target.value;
      console.log(quantity);
    }

    // console.log("ids",id);
  };

  const handlecreaterecipe = async (e) => {
    e.preventDefault();
    console.log("creating recipe");
    setLoading(true);
    const allingredients = ingredients.map((ingredient) => {
      return ingredient.itemtobeadded.id;
    });
    // const quantities=
    // console.log(allingredients);
    console.log(quantity);
    const newrecipe = {
      ownerid: 1,
      recipename: allrecipedetails.recipename,
      cookingtime: `${allrecipedetails.cookingtime + allrecipedetails.time}`,
      description: allrecipedetails.recipedescription,
      instruction: allrecipedetails.recipeinstruction,
      ingredients: quantity,
    };
    console.log(newrecipe);
    const data = new FormData();
    data.append("ownerid", newrecipe.ownerid);
    data.append("recipename", newrecipe.recipename);
    data.append("cookingtime", newrecipe.cookingtime);
    data.append("description", newrecipe.description);
    data.append("instruction", newrecipe.instruction);
    data.append("ingredients", JSON.stringify(newrecipe.ingredients));
    data.append("avatar", allrecipedetails.recipeimage);
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.post(
      "https://rcpebackend3.onrender.com/api/v1/recipies/",
      data,
      requestOptions
    );
    const result = await response.data;
    if (result) {
      console.log("added recipe");
      toast({
        title: "created recipe",
        description: "sucessfuly added recipe",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      // socket.emit('sendNotification', `new recipe named ${newrecipe.recipename} has been added`);
      Navigate("/home");
    }
    console.log(response);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(source);
    console.log(destination);
    if (source.droppableId == "2" && destination == null) {
      items2.splice(source.index, 1);
      ingredients.splice(source.index, 1);
      setItems2(items2);
      setIngredients(ingredients);
    } else if (source.droppableId == "1" && destination == null) {
      return;
    } else if (source.droppableId == destination.droppableId) {
      const reorderedItems = reorder(items, source.index, destination.index);
      setItems(reorderedItems);
    } else if (source.droppableId != destination.droppableId) {
      const { dataadded, dataadded2 } = additem(
        items,
        source.index,
        destination.index
      );
      setItems2(dataadded);
      setIngredients(dataadded2);
    }
  };
  const handlesearchingredient = (e) => {
    if (e.target.value != "") {
      const newitems = items.filter((item) => {
        return item.ingredientname.includes(e.target.value);
      });
      setItems(newitems);
    } else {
      getallingredients();
    }
  };

  const getallingredients = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        //   token: localStorage["token"],
      },
    };
    const getallingredients = await axios.get(
      "https://rcpebackend3.onrender.com/api/v1/ingredients/",
      requestOptions
    );
    const data = await getallingredients.data;
    setItems(data);
  };
  // const getallnotification=()=>{
  //   socket.on('notification',(message)=>{
  //     // console.log()
  //     console.log(message);
  //     toast({
  //       title: "Notification",
  //       description:`new recipe named ${message} is added`,
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });

  //   })
  // }
  // useEffect(()=>{
  // },[])
  useEffect(() => {
    // getallnotification();
    getallingredients();
    setItems2(dataadded);
  }, []);

  return (
    <>
      <Navbar login={true} />
      <form onSubmit={handlecreaterecipe} encType="multipart/form-data">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "white",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "5px",
            // border: `2px solid ${theme}`,
            boxShadow: "4px",
            // width: "89vw",
            // height: "80vh",
            // padding: "10px",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            fontSize="40px"
            color="white"
            sx={{ marginTop: "0", color: `${theme}` }}
          >
            Enter new <span style={{ color: `${theme}` }}>Recipe</span>
          </Text>
          <div  className="flex flex-col md:flex-row" style={{ 
            //display: "flex", 
            //flexDirection: "row"
           }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Text fontSize="1xl" sx={{ marginLeft: "10px" }}>
                Enter Recipe Name:
              </Text>
              <Input
                className="w-28"
                sx={{ 
                  // width: "20vw", marginLeft: "10px", marginTop: "10px" 
                }}
                placeholder="Enter recipe name"
                name="recipename"
                onChange={handlechange}
                isRequired
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Text fontSize="1xl" sx={{ marginLeft: "30px" }}>
                Enter Cooking  Time:
              </Text>
              <div
              // className="w-36 md:w-96"
              style={{ 
                display: "flex", 
                padding: "10px" 
                }}>
                <Input
                className="w-48"
                  sx={{ 
                    // width: "22vw",
                     borderRightRadius: "0"
                     }}
                  type="number"
                  placeholder="Enter time"
                  name="cookingtime"
                  onChange={handlechange}
                  isRequired
                />
                <Select
                  placeholder="time"
                  name="time"
                  className="w-16"
                  sx={{ 
                    //width: "6vw", 
                    borderLeftRadius: "0" 
                  }}
                  onChange={handlechange}
                  isRequired
                >
                  <option value="hour">hour</option>
                  <option value="min">min</option>
                  <option value="sec">sec</option>
                </Select>
              </div>
            </div>
            <div>
              <Text fontSize="1xl" sx={{ marginLeft: "30px" }}>
                Add recipe Image:
              </Text>
              <Input
                type="file"
                className="w-32"
                sx={{ 
                //  width: "20vw",
                   margin: "10px"
                   }}
                placeholder="add image"
                name="recipeimage"
                accept="image/*"
                onChange={handlechange}
                isRequired
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center" style={{ 
            // display: "flex", 
            //flexDirection: "row"
           }}>
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Text fontSize="1xl" sx={{ marginLeft: "10px" }}>
                  Add recipe Description:
                </Text>
                <Textarea
                  name="recipedescription"
                  className="w-52"
                  sx={{
                    // width: "30vw", 
                    marginBottom: "10px"
                   }}
                  placeholder="Enter description of the recipe"
                  onChange={handlechange}
                  isRequired
                />
              </div>
              <div>
                <Text fontSize="1xl" sx={{ marginLeft: "10px" }}>
                  Add recipe Instruction:
                </Text>
                <Textarea
                  className="w-52"
                  sx={{ 
                    //width: "30vw"
                   }}
                  name="recipeinstruction"
                  placeholder="Enter instruction of the recipe"
                  onChange={handlechange}
                  isRequired
                />
              </div>
            </div>
            <div className="w-full bg-stone-100 md:w-2/4">
              <Text fontSize="1xl" sx={{ marginLeft: "10px" }}>
                Add recipe Ingredients:
              </Text>

              <div className="w-full h-64 flex" style={{ marginTop: "30px" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <div
                    className="flex justify-between items-center w-full h-full "
                    style={{
                      // display: "flex",
                      // width: "40vw",
                      // marginTop: "10px",
                      // height: "30vh",
                      // backgroundColor: "blue",

                      margin: "auto",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <div
                    className="w-full"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // marginTop: "30px",
                      }}
                    >
                      <Droppable key={"1"} droppableId={"1"}>
                        {(provided) => {
                          return (
                            <div
                              className="w-40 md:w-64"
                              style={{
                                // width: "20vw",
                                height: "30vh",
                                backgroundColor: `${theme}`,
                                marginRight: "10px",
                                borderRadius: "2px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                overflowY: "scroll",
                              }}
                              // key={"2"}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {items.map((data, index) => {
                                return (
                                  <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => {
                                      return (
                                        <Card
                                          className="w-4/5"
                                          sx={{
                                            // width: "15vw",
                                            borderBottom: "1px solid grey",
                                          }}
                                          // key={data.ingredientid}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          <CardBody>
                                            <Text>{data.ingredientname}</Text>
                                            {/* <Input placeholder='Basic usage' /> */}
                                          </CardBody>
                                        </Card>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                      <div className="w-40 md:w-60" style={{ display: "flex" }}>
                        <Input
                          // className="w-56"
                          placeholder="search ingredients"
                          onChange={handlesearchingredient}
                        />
                        <div
                          // className="w-full"
                          style={{
                            // width: "30px",
                            border: "1px solid light rey",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <SearchIcon sx={{ marginTop: "5px" }} />
                        </div>
                      </div>
                    </div>
                    <div
                    className="w-96 h-full ml-2 mt-3"
                      style={{
                        // width: "20vw",
                        // height: "30vh",
                        // backgroundColor: "blue",
                        marginRight: "10px",
                        borderRadius: "2px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        // overflowY: "scroll",
                      }}
                    >
                      <Droppable key={"2"} droppableId={"2"}>
                        {(provided) => {
                          return (
                            <div
                            className="w-full md:w-72"
                              style={{
                                // width: "20vw/",
                                height: "30vh",
                                backgroundColor: `${theme}`,
                                marginRight: "10px",
                                borderRadius: "2px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                overflowY: "scroll",
                              }}
                              // key={"2"}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {items2.map((data, index) => {
                                return (
                                  <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => {
                                      return (
                                        <Card
                                          className="w-40 md:w-60"
                                          sx={{
                                            // width: "15vw",
                                            borderBottom: "1px solid grey",
                                          }}
                                          // key={data.ingredientid}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          <CardBody
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Text>{data.ingredientname}</Text>
                                            <Input
                                              placeholder="Qty"
                                              type="number"
                                              sx={{ width: "100px" }}
                                              name="quantity"
                                              onChange={handleinputchange(
                                                data.ingredientname
                                              )}
                                              // value={value<0?}
                                              // disabled={Value<0?true:false}
                                            />
                                            {/* isRequired */}
                                            <Select
                                              placeholder="Select option"
                                              name="size"
                                              onChange={handleinputchange(
                                                data.ingredientname
                                              )}
                                              isRequired
                                            >
                                              <option value="ml">ml</option>
                                              <option value="l">l</option>
                                              <option value="gm">gm</option>
                                              <option value="kg">kg</option>
                                            </Select>
                                          </CardBody>
                                        </Card>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                </DragDropContext>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              // backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <Button
              colorScheme="green"
              type="submit"
              className="w-32"
              sx={{
                backgroundColor: `${theme}`,
                // width: "10vw",
                marginTop: "50px",
              }}
            >
              {loading == false ? "add new recipe" : <Spinner />}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Createrecipe;
