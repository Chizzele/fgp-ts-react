import TestComponent from  './components/TestComponent/TestComponent';
import AutoComplete from './components/AutoComplete/AutoComplete'
import MonitorApi from './components/FGPMonitoring/MonitorAPI/MonitorApi';
import DeviceWidget from './components/DeviceWidget/DeviceWidget';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Crumbs from './components/Breadcrumbs/Crumb/Crumb';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faWifi, faSpinner, faExpandAlt, faCompressAlt, faSearchPlus, faSearchMinus, faAngleDoubleLeft, faAngleDoubleRight, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import Splash from './components/SplashScreen/Splash';
import "./ext/bootstrap/bootstrap.css";
import "./baseStyles.css";
import "./components/AutoComplete/AutoComplete.css"
import "./components/AutoComplete/AutoCompleteItem/AutoCompleteItem.css"
library.add(fab, faCheckSquare, faCoffee, faWifi, faSpinner, faExpandAlt, faCompressAlt, faSearchPlus, faSearchMinus, faAngleDoubleLeft, faAngleDoubleRight, faInfoCircle);
export { 
    TestComponent,
    AutoComplete,
    MonitorApi,
    DeviceWidget,
    Splash,
    Breadcrumbs,
    Crumbs
 }