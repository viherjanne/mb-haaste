import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import MBTodo from '../../MBTodo';
import DropdownBoolean from '../filters/DropdownBoolean';
import { useState } from 'react';

const Table = ({ customers }) => {
  const navigate = useNavigate();

  const clicker = (customer) => {
    navigate(customer.id);
  }

  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  let filters = {
    isActive: null,
  };

  const filterCustomers = (newFilters) => {
    filters = {
      ...filters,
      ...newFilters
    };

    setFilteredCustomers(customers.filter((customer) => {
      return filters.isActive === null || customer.isActive === filters.isActive;
    }));
  }

  return (
    <>
      <div className='card my-3'>
        <div className='card-body'>
          <i className="bi bi-filter" />
          {' '}
          Filters
          <div>
            <MBTodo isCompleted={true} task='Create solution to filters customers by activity' />
            <DropdownBoolean 
              labels={{true: 'Show only active', false: 'Show only inactive'}}
              changeHandler={(value) => {filterCustomers({isActive: value})}}
            />
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Is Active</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => {
            return (
              <tr
                key={index}
                className=''
                onClick={() => clicker(customer)}
              >
                <td scope="row">{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.country}</td>
                <td>{customer.isActive ? '✅' : '❌'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

Table.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    isActive: PropTypes.bool
  }))
}


export default Table