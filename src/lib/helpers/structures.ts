export function makeTree(all: any[], keyName = "children")
{
    const tree: any = {};
    all.forEach((document) =>
    {
        const docId = document._id.toString();
        const parent = document.parent && document.parent.toString();

        if (!tree[docId])
        {
            tree[docId] = { ...document, [keyName]: [] };
        } else
        {
            tree[docId] = { ...document, [keyName]: tree[docId][keyName] };
        }

        if (parent && !tree[parent])
        {
            tree[parent] = { [keyName]: [] };
        }

        if (parent)
        {
            if (!tree[parent][keyName])
            {
                tree[parent][keyName] = [];
            }
            tree[parent][keyName].push(tree[docId]);
        }
    });

    return Object.values(tree).filter((document: any) => !document.parent);
}


export function serialize(data: any)
{
    return JSON.parse(JSON.stringify(data));
}