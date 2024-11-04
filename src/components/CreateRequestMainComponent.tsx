import React, { ReactNode, useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { HiOutlineExclamationCircle, HiPlus, HiX } from "react-icons/hi";

interface CreateRequestMainComponentProps {
  title: string
}

interface IVideoUrlTextbox {
  id: number, 
  // validation: (id: number, value: string) => void, 
  // isValid: string
}

const VideoUrlTexbox: (props: IVideoUrlTextbox) => ReactNode = (props: IVideoUrlTextbox) => {
  const { id, /* validation, isValid */ } = props
  const [status, setStatus] = useState('none')

  const validation = (id: number, value: string) => {
    const hasEmail = /^(ftp|http|https):\/\/[^ "]+$/.test(value)
    return hasEmail === true ? 'success' : 'failure'
  }

  return (
  <div>
    <div className="mb-2 block">
      <Label htmlFor="email1" color={status} value={`Video/Folder URL ${id}`} className="font-inter font-bold" />
    </div>
    <TextInput 
      key={`link${id}`} 
      type="url"
      placeholder="https://drive.google.com/some-link" 
      onBlur={(ev) => setStatus(validation(id, ev.target.value))} 
      color={status}
      helperText={
        <>
          {status === 'failure' && (<span className="font-medium">Enter a valid URL</span>)}
        </>
      }
    />
  </div>
)}

export function CreateRequestMainComponent(
  props: CreateRequestMainComponentProps
) {
  const [openModal, setOpenModal] = useState(false)
  const [videoUrlCount, setVideoUrlCount] = useState<{id: number, status: string}[]>([{id: 0, status: 'none'}])
  const {title} = props

  // const validate = (id: number, value: string) => {
  //   const tmpItem = videoUrlCount.find(i => i.id === id)
  //   const tmpList = videoUrlCount
  //   const hasEmail = /^(ftp|http|https):\/\/[^ "]+$/.test(value)

  //   // success | failure | info (focused) | none (unfocused)

  //   console.log(`hasEmail ${hasEmail} ${value} tmpItem ${JSON.stringify(tmpItem)} ${hasEmail === true ? 'success' : 'failure'}`)

  //   if (tmpItem) {
  //     const tmpItemIdx = tmpList.indexOf(tmpItem)
  //     tmpItem.status = hasEmail === true ? 'success' : 'failure'
  //     tmpList[tmpItemIdx] = tmpItem
  //     setVideoUrlCount(tmpList)
  //   }
  // }

  return (
    <div className="flex flex-col self-center">
      <div className="flex items-center justify-between p-2 border-b rounded-t">
        <h3 className="pl-4 font-inter font-size-md text-xl font-semibold text-gray-900 dark:text-white font-extrabold">
          Create New Request
        </h3>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-6 self-center content-center">
        <div>
          <h4 className="text-lg font-bold font-inter text-gray-900 dark:text-white">
            Add videos or folders
          </h4>
          <p className="text-sm font-inter text-gray-900 dark:text-gray-400">
            These videos would be cut, labeled and made available in your
            Recharm video library
          </p>
          
        </div>
        <>
      
      <form className="flex max-w-md flex-col gap-4">
        <>
          {videoUrlCount.map(i => (
            <VideoUrlTexbox id={i.id} /* validation={validate} isValid={i.status} */ />
          ))}
        </>
        <>
          {/* {(Array.apply(null, {length<number>: ParseInt(videoUrlCount)}).map(Number.call, Number)).map(i => (
            <>{renderVideoUrlTexbox?(i)}</>
          ))} */}
        </>
        <Button
            color="light"
            className="text-sm w-32 font-medium hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
            onClick={() => {
              const tmp = videoUrlCount
              tmp.push({id: videoUrlCount[videoUrlCount.length - 1].id + 1, status: 'none' })
              setVideoUrlCount(tmp)
              setOpenModal(true)
            }}
          >
            <span className="flex items-center font-inter font-medium">
              <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                <HiPlus className="h-3 w-3 text-white" />
              </span>
              {title}
            </span>
          </Button>
      </form>
      
      

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>

        <div>
          {/** What was I going to do here? Who knows...  */}
        </div>
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
        <Button
          color="primary"
          className="text-sm font-inter font-medium bg-purple-700 hover:bg-purple-800"
        >
          <span className="flex items-center font-inter font-medium text-white">
            <span className="p-0.5 mr-1">
              <HiPlus className="h-3 w-3" />
            </span>
            Create Request
          </span>
        </Button>
      </div>
    </div>
  );
}
