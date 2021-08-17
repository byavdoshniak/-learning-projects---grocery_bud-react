import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [product, setProduct] = useState('')
  const [bud, setBud] = useState([])
  const [editCondition, setEditCondition] = useState(false)
  const [editedId, setEditedId] = useState('')
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertDanger, setAlertDanger] = useState(false)
  const [alertText, setAlertText] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (product) {
      const newitem = { id: new Date().getTime().toString(), product }
      setBud((bud) => {
        return [...bud, newitem]
      })
      console.log(bud)
      setProduct('')
      setAlertSuccess(true)
      setAlertText('item added')
      setTimeout(() => setAlertSuccess(false), 3000)
    } else {
      setAlertDanger(true)
      setAlertText('please enter value')
      setTimeout(() => setAlertDanger(false), 3000)
    }
  }

  const deleteHandler = (id) => {
    setBud(bud.filter((item) => id !== item.id))
    setAlertDanger(true)
    setAlertText('item deleted')
    setTimeout(() => setAlertDanger(false), 3000)
  }

  const editHandler = (id) => {
    bud.map((item) => {
      if (item.id === id) {
        setProduct(item.product)
        setEditCondition(!editCondition)
        setEditedId(item.id)
      }
    })
  }

  const submitEdit = (e) => {
    e.preventDefault()
    bud.map((item) => {
      if (item.id === editedId) {
        item.product = product
      }
      setProduct('')
      setEditCondition(false)
      setAlertSuccess(true)
      setAlertText('item changed')
      setTimeout(() => setAlertSuccess(false), 3000)
    })
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={submitHandler}>
        <Alert
          alertSuccess={alertSuccess}
          alertDanger={alertDanger}
          text={alertText}
        />
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          {editCondition ? (
            <button className='submit-btn' onClick={submitEdit}>
              Edit
            </button>
          ) : (
            <button type='submit' className='submit-btn'>
              submit
            </button>
          )}
        </div>
      </form>
      <div className='grocery-container'>
        <div className='grocery-list'>
          {bud.map((item) => {
            return (
              <List
                item={item}
                key={item.id}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            )
          })}
        </div>
        {bud.length > 0 ? (
          <button
            className='clear-btn'
            onClick={() => {
              setBud([])
              setAlertDanger(true)
              setAlertText('list cleared')
              setTimeout(() => setAlertDanger(false), 3000)
            }}
          >
            clear items
          </button>
        ) : (
          <></>
        )}
      </div>
    </section>
  )
}

export default App
