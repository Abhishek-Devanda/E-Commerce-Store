import PropTypes from 'prop-types'

const InputField = ({disabled, labelText, id, type, placeholder, value, onChange, icon: Icon }) => {

  InputField.propTypes = {
    labelText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.elementType
  }
  
  return (
    <>
      <div className="relative">
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-300">{labelText}</label>
        <div className='absolute inset-y-0 left-0 top-5 pl-3 flex items-center pointer-events-none'>
          {Icon && <Icon className='h-5 w-5 text-gray-400' aria-hidden='true' />}
        </div>
        <input
          disabled={disabled}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 pl-10  text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
    </>
  )
}

export default InputField
