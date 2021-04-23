import path from 'path';

export const INSTANCES: { [properties: string ]: string } = {
    CONFIG_FILE: process.env.NODE_ENV === "development" ? `${path.resolve(__dirname)}/instances.json` : "/usr/src/instances-manager/config/instances.json"
}