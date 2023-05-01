import { create } from 'ipfs-http-client';
console.log(process.env.IPFS_API_KEY)
const auth =
    'Basic ' + Buffer.from(`${process.env.IPFS_API_KEY}:${process.env.IPFS_API_SECRET}`).toString('base64');
console.log(auth)
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


export const uploadData = async () => {
    console.log(process.env.IPFS_API_KEY)


    try {
        const res = await client.add("Test");
        console.log(res.cid.toString())
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const uploadJson = async (data: any) => {
    try {
        const res = await client.add(JSON.stringify(data));
        return res;
    } catch (error) {
        console.log(error)
    }
}