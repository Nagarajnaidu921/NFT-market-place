import { Inter } from 'next/font/google'
import { uploadData, uploadJson } from './api/uploadToIPFS'
import { AssetTokenisingForm } from '@app/components/AssetTokenisingForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <AssetTokenisingForm></AssetTokenisingForm>
  )
}
