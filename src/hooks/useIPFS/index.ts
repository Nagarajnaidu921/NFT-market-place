import { uploadImage, uploadJson } from "@app/pages/api/uploadToIPFS";
import { useEffect, useState } from "react"

type Attribute = {
    key: string;
    value: string;
};

type IPFSData = {
    name: string;
    description: string;
    location: string;
    type: string;
    image: File;
    attributes?: Array<Attribute>
}

export const useIPFS = () => {
    const [isInProgress, setIsInProgress] = useState(false);
    const [ipfsUrl, setIpfsUrl] = useState<string>();
    const [isError, setIsError] = useState<boolean>();

    const uploadData = async (data: IPFSData) => {
        try {
            setIsInProgress(true);
            setIsError(false)
            const imageUploadRes = await uploadImage(data.image);
            const metadata = {...data, image: `${process.env.IPFS_GATEWAY}/${imageUploadRes?.cid.toJSON()['/']}`}
            const metaDataRes = await uploadJson(metadata);
            setIpfsUrl(`${process.env.IPFS_GATEWAY}/${ metaDataRes?.cid.toString()}`);
            setIsInProgress(false);
        } catch (error) {
            console.log(error);
            setIsError(true);
            setIsInProgress(false);
        }
    }

    return {isError, isInProgress, uploadData, ipfsUrl}
}