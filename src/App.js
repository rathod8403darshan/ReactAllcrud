import logo from './logo.svg';
import './App.css';
import Reducer from './ReducerReact/Reducer';
import ApiForm from './ReducerReact/ApiReducer/ApiForm';
import ApiReducerForm from './ReducerReact/ApiReducer/UseApi/ApiReducerForm';
import ApiReducerTable from './ReducerReact/ApiReducer/UseApi/ApiReducerTable';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ApiRedClassForm from './ReducerReact/ApiReducer/UseApi/ApiRedClassForm';
import ApiRedClassTable from './ReducerReact/ApiReducer/UseApi/ApiRedClassTable';

import RestApiFun from './Api Crud/ApiWithTokan/RestApiFun';

import FetchApi from './Api Crud/FetchApi/FetchApi';

import ApiProductClass from './Api Crud/ProductApi/ApiProductClass';
import ApiProductfun from './Api Crud/ProductApi/ApiProductfun';

import ApiClass from './Api Crud/studentApi/ApiClass';
import ApiFun from './Api Crud/studentApi/ApiFun';

import PerentFirst from './CardCrud/PerentFirst'; 


import Anim from './Funcompo crud/AnimationCrud/Anim'; 
import ExamFuncrud from './Funcompo crud/ExamCrud/ExamFuncrud';
import Functioncompo2 from './Funcompo crud/FunCompoDeefcrud/Functioncompo2';
import FunctionCrud1 from './Funcompo crud/Funcrud/FunctionCrud1';
import Reactmodul1 from './Funcompo crud/ModelReact/Reactmodul1';
import UseEffectLocalStorege from './Funcompo crud/UseEffectcrud/UseEffectLocalStorege';



function App() {
  return (

    <>




      <div className="App">
        {/* <PerentFirst/> */}
      </div>
      {/* <Reducer/>   */}

      {/* <ApiForm/> */}

      <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate to={"/formApi"}/>}/>
        <Route path='/formApi' element={<ApiReducerForm/>}> 
        <Route path=":id1"/>
        </Route>
        <Route path='/tableApi' element={<ApiReducerTable/>}/> */}
        {/* <Route path='/' element={<Navigate to={"/formApi"}/>}/>
        <Route path='/formApi' element={<ApiRedClassForm/>}> 
        <Route path=":id1"/>
        </Route>
        <Route path='/tableApi' element={<ApiRedClassTable/>}/> */}
      </Routes>
     </BrowserRouter>



      {/*==============ApiWithTokan==================== */}
     {/* <RestApiFun/> */}

        {/* ===========FetchApi============ */}
     {/* <FetchApi/> */}


      {/* ========ProductApiCrud========== */}
     {/* <ApiProductClass/> */}
     {/* <ApiProductfun/> */}


          {/* ============= studentApi ================ */}
     {/* <ApiClass/> */}
     {/* <ApiFun/> */}
      

      {/* ================= CardCrud ============= */}

      {/* <PerentFirst/> */}



        {/* =============Funcompo crud ============ */}

        {/* <Anim/> */}
        {/* <ExamFuncrud/> */}
        {/* <Functioncompo2/> */}
        {/* <FunctionCrud1/> */}
        {/* <Reactmodul1/> */}
        <UseEffectLocalStorege/>

    </>
  );
}

export default App;
