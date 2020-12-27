import {useToasts} from 'react-toast-notifications';

const useNotification = () => {
  const {addToast} = useToasts();

  const handleSuccessNotification = (message) => {
    addToast(message, {
      appearance: 'success',
      autoDismiss: true,
    })
  }

  const handleErrorNotification = (error) => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    addToast(resMessage, {
      appearance: 'error',
      autoDismiss: true,
    })
  }

  return [handleSuccessNotification, handleErrorNotification];
}

export default useNotification;
