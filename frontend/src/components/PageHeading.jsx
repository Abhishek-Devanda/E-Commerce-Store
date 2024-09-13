import PropTypes from "prop-types";

const PageHeading = ({ mainHeading, subHeading, textSize }) => {
    return (
        <div className="text-center">
            <h1
                className={`font-bold text-emerald-400 mb-4 ${textSize} sm:text-4xl md:text-5xl lg:text-6xl`}
            >
                {mainHeading}
            </h1>
            <p className="text-gray-300 mb-8 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                {subHeading}
            </p>
        </div>
    );
};

PageHeading.propTypes = {
    mainHeading: PropTypes.string,
    subHeading: PropTypes.string,
    textSize: PropTypes.string,
};

export default PageHeading;
