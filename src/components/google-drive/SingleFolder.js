import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolder} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

export default function SingleFolder({foldr}) {
  return (
    <Button as={Link} to={{pathname:`/folder/${foldr.id}`,state:{folder:foldr}}} variant='outline-dark' className='text-truncate w-100'> <FontAwesomeIcon icon={faFolder} className='mx-2'/>{foldr.name}</Button>
  )
}
