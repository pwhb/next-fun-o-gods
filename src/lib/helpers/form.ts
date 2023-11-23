import { ZodBoolean } from "zod";

export interface IColumn
{
    label?: string;
    value: string;
    type: ColumnType;
}

export enum ColumnType
{
    Text = "text",
    Number = "number",
    Date = "date",
    Boolean = "boolean",
    ObjectId = "objectId",
    Icon = "icon",
}

function getColumn(key: string, typeName: string)
{
    switch (typeName)
    {
        case ("ZodString"): {
            return {
                label: key,
                value: key,
                type: key === "icon" ? ColumnType.Icon : ColumnType.Text
            };
        }
        case ("ZodBoolean"): {
            return {
                label: key,
                value: key,
                type: ColumnType.Boolean
            };
        }
        default: {
            return {
                label: key,
                value: key,
                type: ColumnType.Text
            };
        }
    }
}
export function getSchema(shape: object, customSchema: IColumn[] = [])
{
    const schema: IColumn[] = [{
        label: "ObjectId",
        value: "_id",
        type: ColumnType.ObjectId
    }];
    for (const [key, value] of Object.entries(shape))
    {
        schema.push(getColumn(key, value._def.typeName));
    }
    return schema;
};