import TestComponent from  './components/TestComponent/TestComponent';
import AutoComplete from './components/AutoComplete/AutoComplete'
import MonitorApi from './components/FGPMonitoring/MonitorAPI/MonitorApi';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faWifi, faSpinner } from '@fortawesome/free-solid-svg-icons'
import "./ext/bootstrap/bootstrap.css";
import "./baseStyles.css";
import "./components/AutoComplete/AutoComplete.css"
import "./components/AutoComplete/AutoCompleteItem/AutoCompleteItem.css"
library.add(fab, faCheckSquare, faCoffee, faWifi, faSpinner)
export { 
    TestComponent,
    AutoComplete,
    MonitorApi
 }