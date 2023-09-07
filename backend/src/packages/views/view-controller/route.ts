import express from 'express';
import multer from 'multer';
import * as fromusermodel from '../../users'; 
import * as fromrecipemodel from '../../recipies';
import * as fromcommentmodel from '../../comments';
import * as fromingredientmodel from '../../recipeingredients';
// import {checktoken} from '../../../utils/check-token'
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary';
import { checktoken } from '../../../utils/check-token';
import DatauriParser from 'datauri/parser';
// import { Path } from 'mongoose';
import path from 'path';
import * as fromviewmodel from '../../views';
export const router=express.Router();
const parser=new DatauriParser();

dotenv.config();

router.post('/',checktoken(['admin','user']),async(req,res)=>{
   const{ipaddress,recipeid}=req.body;
    try{
        const view=await fromviewmodel.create({ipaddress,recipeid});
        return res.status(200).send(view);
    }catch(error){
        return res.status(200).send({error:`${error}`})
    } 
})

router.get('/:id',async(req,res)=>{
    try{
        // const {email}=req.user;
        // const{findall}=req.body;
        // const user=fromusermodel.get_one2(email);
        // const ownerid=findall==true?null:user['id'];
        const{id}=req.params;
        const result=await fromviewmodel.getall(id);
        return res.status(200).send(result);
    }catch(error){
        return res.status(200).send({error:`${error}`})
    }
})






