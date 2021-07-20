import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notification.scss";
import { GiFilmProjector } from "react-icons/gi";
import { GiFilmSpool } from "react-icons/gi";
import { BiCommentError } from "react-icons/bi";

const notificationSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const NotifyAddedSucces = ({ title, list }) => {
  return (
    <div className="notify--add__wrapper">
      <GiFilmProjector className="notify--add__icon" />
      <p className="notify--add__text">
        <span>{title}</span> was successfully added to the <span>{list}</span>{" "}
        list
      </p>
    </div>
  );
};

const NotifyDeleteSucces = ({ title, list }) => {
  return (
    <div className="notify--delete__wrapper">
      <GiFilmSpool className="notify--delete__icon" />
      <p className="notify--delete__text">
        <span>{title}</span> was successfully deleted from the{" "}
        <span>{list}</span> list
      </p>
    </div>
  );
};

const EmptyRequestNotify = () => {
  return (
    <div className="notify--empty__wrapper">
      <BiCommentError className="notify--empty__icon" />
      <p className="notify--empty__text">No matches found, please try again!</p>
    </div>
  );
};

const addedToListSuccessfully = (title, list) => {
  toast.success(
    <NotifyAddedSucces title={title} list={list} />,
    notificationSettings
  );
};

const deleteFromListSuccessfully = (title, list) => {
  toast.error(
    <NotifyDeleteSucces title={title} list={list} />,
    notificationSettings
  );
};

const handleEmptyRequestNotify = () => {
  toast.error(<EmptyRequestNotify />, notificationSettings);
};

export default {
  addedToListSuccessfully,
  deleteFromListSuccessfully,
  handleEmptyRequestNotify,
};
