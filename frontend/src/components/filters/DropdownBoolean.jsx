import PropTypes from 'prop-types'

const DropdownBoolean = ({ labels, changeHandler }) => {
    const onChangeHandler = (e) => {
        changeHandler(e.currentTarget.value === 'null' ? null : e.currentTarget.value === 'true');
    }

    // It's silly that it requires 2 clicks to clear the filter.
    // Should be a fancier component whose selection can be cleared with 1 click.
    return (
        <>
            <select onChange={onChangeHandler}>
                <option value="null">-</option>
                <option value="true">{labels.true}</option>
                <option value="false">{labels.false}</option>
            </select>
        </>
    );
}

DropdownBoolean.propTypes = {
    labels: PropTypes.shape({
        true: PropTypes.string,
        false: PropTypes.string,
    }),
    changeHandler: PropTypes.func
}

export default DropdownBoolean