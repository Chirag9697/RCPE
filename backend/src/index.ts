//local
import * as auth from './packages/authentication';
import * as fromusermodel from './packages/users';
import * as fromrecipemodel from './packages/recipies';
import * as fromcommentmodel from './packages/comments';
import * as fromlikemodel from './packages/likes';
import * as fromfavouriterecipe from './packages/favourite-recipies';
import * as fromingredientmodel from './packages/ingredients';
import * as fromviewmodel from './packages/views';
import http from 'http';
import { Server, Socket } from 'socket.io';

//lib
import knex from "knex";
import express from 'express';
// import {development} from '../knexfile'
// import  from '../knexfile';

import { Model } from 'objection';
// import socket.io from 'socket.io';
import cors from 'cors';

export const app=express();
const development=require("../knexfile");
const server = http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"]
    }
});;
io.on('connection', (socket: Socket)=> {
    console.log('A user connected.',socket.id);
  
    socket.on('sendNotification', (message: string) => {
      // Handle the incoming notification message
      console.log('Received notification message:', message);
      // You can emit this message to other clients or store it in a database
      socket.broadcast.emit('notification', message)
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
});
const connection = development;
// var cors=require('cors');
const initial="api/v1"
Model.knex(knex(connection));
app.use(cors());
app.use(express .json());

app.use(`/${initial}/auth`,auth.router);
app.use(`/${initial}/recipies`,fromrecipemodel.router);
app.use(`/${initial}/comments`,fromcommentmodel.router);
app.use(`/${initial}/likes`,fromlikemodel.router);
app.use(`/${initial}/recipies/favourites`,fromfavouriterecipe.router);
app.use(`/${initial}/ingredients/`,fromingredientmodel.router);
app.use(`/${initial}/views/`,fromviewmodel.router);

function addingredients(){
    const ingredient=['rice','barley','wheat','water','aachar','kachar'];
    for(var i=0;i<ingredient.length;i++){
        fromingredientmodel.create({ingredientname:ingredient[i]});
    }
    console.log('added all ingredient');
    
}   
addingredients();
console.log("hello");
server.listen(3000,()=>{
    console.log("listening on port 3000")
})

// module.exports=app;