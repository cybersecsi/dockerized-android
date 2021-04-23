import fs from 'fs';
import joi from 'joi';
import Logger from './loaders/logger';
const fsPromisified = fs.promises;

// Config
import { INSTANCES } from './config';

// Types
import { IInstances } from './types';

// Schema
import { InstanceSchema } from './schema'

// Validator fn
export const joiValidator = (schema: joi.Schema, data: any) => {
    const { error } = schema.validate(data);
    if (error){
        return false;
    }
    else {
        return true;
    }
}

export const getInstances = async (): Promise<IInstances> => {
    return new Promise(async (resolve, reject) => {
        try {
            const rawInstances = await fsPromisified.readFile(`${INSTANCES.CONFIG_FILE}`, 'utf-8');
            const instances: IInstances = JSON.parse(rawInstances);
            const isValidated = joiValidator(InstanceSchema, instances);
            if(isValidated){
                resolve(instances)
            }
            else {
                reject()
            }
        }
        catch (error) {
            Logger.error("Errow in helpers.getInstances")
            Logger.error(error)
            reject()
        }
    })
}