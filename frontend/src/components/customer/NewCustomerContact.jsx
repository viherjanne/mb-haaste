import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCustomerContact } from './customerSlices'
import PropTypes from 'prop-types';

const NewCustomerContact = ({ customerId, contacts}) => {
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false);

  // Add random contact to customer
  const createNewCustomerContact = async () => {
    const contactId = contacts[Math.floor(Math.random() * contacts.length) + 1].id;
    const response = await dispatch(createCustomerContact({customerId, contactId}))

    if (response.meta.requestStatus === 'fulfilled') {
      setShowSuccess(true)
      setTimeout(() => {setShowSuccess(false)}, 5000)
    }
  }

  return (
    <>
      {showSuccess ? <div className="fixed-top text-center text-bg-success">Saved, see database.json because contact fetching is broken</div> : null}
      <h1 className='fw-bold'>Customer</h1>
      <button className='btn btn-outline-primary' onClick={createNewCustomerContact}>
        <i className="bi bi-plus" />
        {' '}
        Add new random contact
      </button>
    </>
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