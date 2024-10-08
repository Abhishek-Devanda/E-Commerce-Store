import { Loader } from "lucide-react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const PrimaryButton = ({
  onClick,
  type = "button",
  loadingText = "Loading...",
  loadingState = false,
  icon: Icon,
  btnName,
  disabled = false,
}) => {
  return (
    <motion.button
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      disabled={loadingState || disabled}
    >
      {loadingState ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
          {btnName}
        </>
      )}
    </motion.button>
  );
};

PrimaryButton.propTypes = {
  type: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
  loadingState: PropTypes.bool.isRequired,
  btnName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
};

export default PrimaryButton;
