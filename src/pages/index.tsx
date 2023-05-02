import { Inter } from 'next/font/google'
import { uploadImage, uploadJson } from './api/uploadToIPFS'
import { AssetTokenisingForm } from '@app/components/AssetTokenisingForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleSubmit = async (data: any) => {
    try {
      const imageUploadRes = await uploadImage(data.image);
      const metadata = {...data, image: `${process.env.IPFS_GATEWAY}/${imageUploadRes?.cid.toJSON()['/']}`}
      const metaDataRes = await uploadJson(metadata);
      // TODO: Mint token with `${process.env.IPFS_GATEWAY}/${metaDataRes?.cid.toJSON()['/']}`
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AssetTokenisingForm onSubmit={handleSubmit}></AssetTokenisingForm>
  )
}
