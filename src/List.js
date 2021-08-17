import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ item, deleteHandler, editHandler }) => {
  const { id, product } = item

  return (
    <div className='grocery-item'>
      <p className='title'>{product}</p>
      <div className='btn-container'>
        <button className='edit-btn' onClick={() => editHandler(id)}>
          <FaEdit />
        </button>
        <button className='delete-btn' onClick={() => deleteHandler(id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default List
