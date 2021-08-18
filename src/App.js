import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [product, setProduct] = useState('')
  const [bud, setBud] = useState([])
  const [editCondition, setEditCondition] = useState(false)
  const [editedId, setEditedId] = useState('')
  const [alert, setAlert] = useState({
    isAlert: false,
    alertType: '',
    alertText: '',
  })

  const submitHandler = (e) => {
    e.preventDefault()
    if (product) {
      const newitem = { id: new Date().getTime().toString(), product }
      setBud((bud) => {
        return [...bud, newitem]
      })
      setProduct('')
      setAlert({
        isAlert: true,
        alertType: 'alert alert-success',
        alertText: 'item added to the bud',
      })
    } else {
      setAlert({
        isAlert: true,
        alertType: 'alert alert-danger',
        alertText: 'please enter value',
      })
    }
  }
  const deleteHandler = (id) => {
    setBud(bud.filter((item) => id !== item.id))

    setAlert({
      isAlert: true,
      alertType: 'alert alert-danger',
      alertText: 'item deleted',
    })
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
      setAlert({
        isAlert: true,
        alertType: 'alert alert-success',
        alertText: 'item changed',
      })
      setEditCondition(!editCondition)
    })
  }

  useEffect(() => {
    let timeout = setTimeout(() => setAlert({ isAlert: false }), 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [alert])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={submitHandler}>
        {alert.isAlert && <Alert alert={alert} />}
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
              setAlert({
                isAlert: true,
                alertType: 'alert alert-danger',
                alertText: 'list cleared',
              })
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
