import * as React from "react";
import {
  useId,
  Spinner,
  Avatar,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastIntent,
} from "@fluentui/react-components";

// Define the types for props
interface IntentProps {
  message: string;
  intent: ToastIntent | "progress" | "avatar";
}

export const ToastMsg: React.FC<IntentProps> = ({ message, intent }) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notify = () => {
    switch (intent) {
      case "progress":
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>{message}</ToastTitle>
          </Toast>
        );
        break;
      case "avatar":
        dispatchToast(
          <Toast>
            <ToastTitle media={<Avatar name="Erika Mustermann" size={16} />}>
              {message}
            </ToastTitle>
          </Toast>
        );
        break;
      case "error":
      case "info":
      case "success":
      case "warning":
        dispatchToast(
          <Toast>
            <ToastTitle>{message}</ToastTitle>
          </Toast>,
          { intent }
        );
        break;
    }
  };
React.useEffect(()=>{

    if(message!==""){
        notify()
    }
},[message])
  return (
    <>
      <Toaster toasterId={toasterId} />
    </>
  );
};
