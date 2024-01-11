import { useEffect, useState } from "react"
import { IFeedbackDto } from "../../types/feedback.types"
import axiosInstance from "../../utils/axiosInstance"
import { MY_FEEDBACK_URL } from "../../utils/globalConfig"
import { toast } from "react-hot-toast"
import Spinner from "../../components/general/Spinner"
import moment from "moment"
import {MdInput, MdOutput} from 'react-icons/md'
import useAuth from "../../hooks/useAuth.hook"

const MyFeedbackPage = () => {

  const {user} = useAuth();
  const [feedback, setFeedback] = useState<IFeedbackDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>В процессе разработки....</div>
  )
}

export default MyFeedbackPage