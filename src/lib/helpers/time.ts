export async function time(f: () => Promise<any>, name?: string)
{
    const start = new Date().getTime();
    const res = await f();
    const end = new Date().getTime();
    console.log(`"${f.name || name}" took ${end - start}ms`);
    return res;

};