import { Inter } from 'next/font/google'
import { AssetTokenisingForm } from '@app/components/AssetTokenisingForm'
import { useIPFS } from '@app/hooks/useIPFS'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { isError, isInProgress, uploadData, ipfsUrl } = useIPFS()

  const handleSubmit = async (data: any) => {
    try {
      await uploadData(data)
      // TODO: Mint token with `${process.env.IPFS_GATEWAY}/${metaDataRes?.cid.toJSON()['/']}`
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AssetTokenisingForm onSubmit={handleSubmit} submitOnProgress={isInProgress}></AssetTokenisingForm>
    </>
  )
}
