import User from "../types/user.types";
import db from "../database"
class UserModel{
    //create
    async create(user:User):Promise<User>{
        try{
            //open conncection
            const conncection = await db.connect();
            const query = `INSERT INTO users(email, username, firstname, lastname, password)
            VALUES($1,$2,$3,$4,$5) RETURNING id, email, username, firstname, lastname`;
            //run query
            const result = await conncection.query(query,[user.email,user.username, user.firstname,user.lastname, user.password]);
            //release conncetion
            conncection.release();
            //return user
            return result.rows[0];

        }catch(err){
            throw new Error(`Cannot Create User: ${user.username} because ${(err as Error).message}`);
        }

    }
    //list
    async list():Promise<User[]>{
        try{
            //open conncection
            const conncection = await db.connect();
            const query = `SELECT id, email, username, firstname, lastname FROM users`;
            //run query
            const result = await conncection.query(query);
            //release conncetion
            conncection.release();
            //return user
            return result.rows;

        }catch(err){
            throw new Error(`Cannot Return Users because ${(err as Error).message}`);
        }

    }
    //get specific
    async getUser(id:String):Promise<User>{
        try{
            //open conncection
            const conncection = await db.connect();
            const query = `SELECT id, email, username, firstname, lastname FROM users WHERE id=($1)`;
            //run query
            const result = await conncection.query(query,[id]);
            //release conncetion
            conncection.release();
            //return user
            return result.rows[0];

        }catch(err){
            throw new Error(`Cannot Find User ${id} because ${(err as Error).message}`);
        }

    }
    //update user
    async updateUser(user:User):Promise<User>{
        try{
            //open conncection
            const conncection = await db.connect();
            const query = `UPDATE users SET email=$1, username=$2, firstname=$3, lastname=$4, password=$5 WHERE id=$6
            RETURNING id, email, username, firstname, lastname`;
            //run query
            const result = await conncection.query(query,[user.email,user.username, user.firstname,user.lastname, user.password,user.id]);
            //release conncetion
            conncection.release();
            //return user
            return result.rows[0];

        }catch(err){
            throw new Error(`Cannot Update User ${user.id} because ${(err as Error).message}`);
        }

    }
    //delete user
    async deleteUser(id:String):Promise<User>{
        try{
            //open conncection
            const conncection = await db.connect();
            const query = `DELETE FROM users WHERE id=($1) RETURNING id, email, username, firstname, lastname`;
            //run query
            const result = await conncection.query(query,[id]);
            //release conncetion
            conncection.release();
            //return user
            return result.rows[0];

        }catch(err){
            throw new Error(`Cannot Delete User ${id} because ${(err as Error).message}`);
        }

    }
    //authenticate

}
export default UserModel;