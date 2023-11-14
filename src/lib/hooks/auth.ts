export default function useAuth()
{
    const parsed: any = document.cookie && document.cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc: any, v: any) =>
        {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
    const user = parsed["user"];
    const token = parsed["token"];

    return {
        authenticated: parsed ? true : false,
        user: user ? JSON.parse(user) : null,
        token: token ? JSON.parse(token) : null
    };
}