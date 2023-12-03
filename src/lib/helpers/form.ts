import { ZodBoolean } from "zod";

export interface IColumn
{
    label?: string;
    name: string;
    type: ColumnType;
    options?: any[];
}

export enum ColumnType
{
    Text = "text",
    Number = "number",
    Date = "date",
    Boolean = "boolean",
    ObjectId = "objectId",
    Icon = "icon",
    Option = "option",
    MultiSelect = "multiSelect",
    Skip = "skip"
}

function getColumn(key: string, typeName: string)
{
    console.log({ key, typeName });

    switch (typeName)
    {
        case "ZodString": {
            return {
                label: key,
                name: key,
                type: key === "icon" ? ColumnType.Icon : ColumnType.Text
            };
        }
        case "ZodBoolean": {
            return {
                label: key,
                name: key,
                type: ColumnType.Boolean
            };
        }
        case "ZodArray": {
            return {
                label: key,
                name: key,
                type: ColumnType.MultiSelect
            };
        }
        default: {
            return {
                label: key,
                name: key,
                type: ColumnType.Text
            };
        }
    }
}
export function getSchema(shape: object, customSchema: IColumn[] = [])
{
    const schema: IColumn[] = [{
        label: "ObjectId",
        name: "_id",
        type: ColumnType.ObjectId
    }];

    for (const [key, name] of Object.entries(shape))
    {
        if (customSchema.find(column => column.name === key))
        {
            schema.push(customSchema.find(column => column.name === key)!);
            continue;
        }
        schema.push(getColumn(key, name._def.typeName));
    }
    return schema;
};