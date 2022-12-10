import { Fragment } from "react"
import ReactDOM from "react-dom";
import { ArrowLeftShort } from "react-bootstrap-icons";
import { Dialog, Transition } from '@headlessui/react'

const ModalOverlay = props => {
  console.log(props.headerIsShown);
  console.log(props.user);
    return (
      <Fragment>
        <Transition appear show={props.isShown} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={props.hideModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="scale-50"
                >
                  <Dialog.Panel className="h-full w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="rounded-sm w-full h-full flex flex-col bg-white m-auto overflow-x-hidden overflow-y-auto fixed h-modal inset-0 z-40 justify-between items-center">
                        {props.headerIsShown && <div className="bg-white/80 w-full flex items-center font-medium modal-header px-1 py-3">
                            <button onClick={props.hideModal} className="rounded-full w-9 h-9 flex justify-center items-center hover:text-rose-500 hover:bg-gray-100"><ArrowLeftShort className="w-6 h-6"/></button>
                            <h3 className="w-10/12 text-center">{props.modalTitle}</h3>
                        </div>
                        }
                        <div className="modal-content overflow-auto bg-slate-100 w-full h-full">
                            {props.children}
                        </div>
                        <div className="w-full modal-bottom">
                            {props.modalBottom}
                        </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Fragment>
    )
}

const Modal = (props) => {  
    return (
        <Fragment>
            {ReactDOM.createPortal(<ModalOverlay user={props.user} headerIsShown={props.headerIsShown} isShown={props.isShown} hideModal={props.hideModal} modalTitle={props.modalTitle} children={props.children} modalBottom={props.modalBottom}/>,document.getElementById("overlay-root"))}
        </Fragment>
    )
}

export default Modal;