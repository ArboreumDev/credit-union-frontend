import AWS from "aws-sdk"
import DecentroKYCClient, {
  decentroKYCClient,
  KYCStatus,
} from "gql/wallet/decentro_kyc_client"
import { PostToSlack } from "lib/logger"
import { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"
import { UploadRequest } from "./upload"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
}

async function checkKYC(uploadRequest: UploadRequest) {
  const key =
    "user_uploads/" + uploadRequest.email + "/" + uploadRequest.file_name

  const formdata = new FormData()
  formdata.append("reference_id", "arbo" + new Date())
  formdata.append("document_type", "pan")
  formdata.append("consent", "Y")
  formdata.append("consent_purpose", "for bank account purpose only")
  formdata.append("document", Buffer.from(uploadRequest.data, "base64"), {
    filename: uploadRequest.file_name,
    contentType: uploadRequest.ctype,
  })
  return decentroKYCClient.doKYCOnImage(formdata)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const uploadRequest: UploadRequest = req.body
      const kycCheck = await checkKYC(uploadRequest)
      if (kycCheck.kycStatus === "SUCCESS")
        res.status(200).json({ status: KYCStatus.KYC_CHECK_SUCCESS })
      else res.status(200).json({ status: KYCStatus.KYC_CHECK_FAILED })
    } catch (e) {
      console.log(e)
      res.status(500).json({ status: e })
    }
  }
}
