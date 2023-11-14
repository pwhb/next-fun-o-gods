import { Filter, ObjectId, Sort } from "mongodb";
import { ParsedUrlQuery } from "querystring";


export enum KeyType
{
    String,
    Boolean,
    ObjectId,
    DateBefore,
    DateAfter,
    Regex,
    Any
}

export interface Key
{
    type: KeyType;
    key: string;
    field?: string;
    searchedFields?: string[];
}


export function getFilter(keys: Key[], query: ParsedUrlQuery)
{
    const or: Filter<any>[] = [];
    const and: Filter<any>[] = [];

    const filter: Filter<any> = {};

    for (let key of keys)
    {
        if (query[key.key])
        {


            switch (key.type)
            {
                case KeyType.String: {
                    filter[key.field ? key.field : key.key] = query[key.key];
                    break;
                }
                case KeyType.Boolean: {
                    filter[key.field ? key.field : key.key] = query[key.key] === "true";
                    break;
                }
                case KeyType.ObjectId: {
                    filter[key.field ? key.field : key.key] = new ObjectId(query[key.key] as string);
                    break;
                }
                case KeyType.DateAfter: {
                    and.push({
                        [key.field ? key.field : key.key]: { $gte: new Date(query[key.key] as string) }
                    });
                    break;
                }
                case KeyType.DateBefore: {
                    and.push({
                        [key.field ? key.field : key.key]: { $lt: new Date(query[key.key] as string) }
                    });
                    break;
                } case KeyType.Regex: {
                    if (key.searchedFields)
                    {
                        for (let searchedKey of key.searchedFields)
                        {
                            or.push({
                                [searchedKey]: { $regex: query[key.key], $options: "i" }
                            });
                        }
                    }
                    break;
                }
            }
        }
    }

    if (and.length && or.length)
    {
        filter["$and"] = [...and, { "$or": or }];
    } else if (or.length)
    {
        filter["$or"] = or;
    } else if (and.length)
    {
        filter["$and"] = and;
    }

    return filter;

}

export function getSort(sort_by?: any)
{
    const sort: Sort = {};
    if (sort_by)
    {
        const split = sort_by.split(",");
        for (let key of split)
        {
            const trimmed = key.trim();
            const field = trimmed.replace("-", "");
            sort[field] = trimmed[0] === "-" ? -1 : 1;
        }
    } else
    {
        sort["createdAt"] = -1;
    }
    return sort;
}