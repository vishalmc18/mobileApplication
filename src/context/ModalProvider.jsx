import React, {useState,createContext,useContext} from 'react'; 
import ModalComp from '../Components/Modal';
const ModalContext = createContext();

export default function ShowModal  ({children})  {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");

    const setModal=(val)=>{
       setModalVisible(val)
    }


    return (
        <ModalContext.Provider value={{setModalVisible, setModalText, setModalTitle,setModal}}>
            {children}
            {modalVisible && <ModalComp title={modalTitle} setModal={setModal} modalText={modalText} modalPopUp={modalVisible}/>}
        </ModalContext.Provider>
    )
    }


export function useModal() {
    return useContext(ModalContext);
}    
