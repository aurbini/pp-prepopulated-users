import pool from '../dbconfig/dbconnector';
import express, { Request, Response, NextFunction } from 'express';
import { fec_url } from '../utils/url'
import * as dotenv from 'dotenv';
// import fetch from 'node-fetch';
import axios from 'axios'

dotenv.config();
const url_param = '/candidates/?page=1&sort_nulls_last=false&sort_hide_null=false&per_page=20&sort_null_only=false&sort=name&api_key='

class SearchDataController {

    public async getCandidates(req: Request, res: Response) {
        try {
            const result = await axios.get(fec_url + url_param + process.env.API_KEY);
            console.log(result.data)
            res.send(result.data)
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }
}

export default SearchDataController;