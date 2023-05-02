import { create } from 'ipfs-http-client';

const auth =
    'Basic ' + Buffer.from(`${process.env.IPFS_API_KEY}:${process.env.IPFS_API_SECRET}`).toString('base64');4

// Create ipfs http client
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


// upload file image
export const uploadImage = async (file: File) => {
    try {
        const res = await client.add(file);
        return res;
    } catch (error) {
        console.log(error)
    }
}


// upload json to ipfs
export const uploadJson = async (data: any) => {
    try {
        const res = await client.add(JSON.stringify(data));
        return res;
    } catch (error) {
        console.log(error)
    }
}