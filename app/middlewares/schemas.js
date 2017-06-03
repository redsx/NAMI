import { schema, normalize } from 'normalizr'

const history = new schema.Entity('histories',{},{ idAttribute: '_id' });
const room = new schema.Entity('rooms', {histories: [history]}, { idAttribute: '_id' });

export const roomsSchema = [room]

const user = new schema.Entity('rooms',{},{ 
    idAttribute: '_id',
    processStrategy: (entity) => {
        entity.name = entity.nickname;
        entity.isPrivate = true;
        delete entity.nickname; 
        return entity
    }
 });
const privateM = new schema.Entity('histories',{from: user},{ idAttribute: '_id' });

export const privateSchema = [privateM];
export const historySchema = [history];

export const getInitPrivateData = (data) => {
    const normalizeData = normalize(data,privateSchema);
    const { entities, result } = normalizeData;
    let { rooms, histories } = entities;
    result.forEach((key) => {
        const from = histories[key].from;
        rooms[from]['histories'] = rooms[from]['histories'] ? rooms[from]['histories'].concat(key) : [key];
    })
    return { rooms, histories };
}