import PropTypes from 'prop-types';
import NewCustomerContact from './components/NewCustomerContact'
const Table = ({ customerId, contacts }) => {
  const customerContacts = [
    // { customerId: 'id-1', contactId: 'id-11' } // MB-TODO: Example response
  ]
  // MB-TODO: Implement fetch customer's contacts
  // MB-TODO: Implement add contact to customer
  // MB-TODO: Implement remove contact of customer
  return (
    <>
      <NewCustomerContact customerId={customerId} contacts={contacts} />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {customerContacts.map((customerContact, index) => {
            return (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{customerContact.contactId}</td>
                <td>
                  <button
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

Table.propTypes = {
  customerId: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }))
}


export default Table