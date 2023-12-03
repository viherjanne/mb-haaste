import { useDispatch } from 'react-redux'
import { createCustomerContact } from '../customerSlices'
import PropTypes from 'prop-types';

const NewCustomerContact = ({ customerId, contacts}) => {
  const dispatch = useDispatch()

  // Add random contact to customer
  const createNewCustomerContact = () => {
    const contactId = contacts[Math.floor(Math.random() * contacts.length) + 1].id;
    dispatch(createCustomerContact({customerId, contactId}))
  }

  return (
    <button className='btn btn-outline-primary' onClick={createNewCustomerContact}>
      <i className="bi bi-plus" />
      {' '}
      Add new random contact
    </button>
  )
}

NewCustomerContact.propTypes = {
  customerId: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }))
}

export default NewCustomerContact