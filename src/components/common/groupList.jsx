import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemsSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {!Array.isArray(items) &&
                typeof items === "object" &&
                Object.keys(items).map((item) => (
                    <li
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemsSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            {Array.isArray(items) &&
                items.map((item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemsSelect(item)}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemsSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
