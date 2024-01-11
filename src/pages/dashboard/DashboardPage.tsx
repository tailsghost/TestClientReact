import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate"
import {BsGlobeAmericas} from 'react-icons/bs'


const DownloadPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="#000" icon={BsGlobeAmericas} role="Dashboard">
        <div className="text-3xl space-y-2">
          <h1>Информация по приложению....</h1>
        </div>
      </PageAccessTemplate>
    </div>
  )
}

export default DownloadPage