import { combineReducers } from 'redux'
import peoples from './pessoasReducers'
import ufs from './estadosReducers.js'


export default combineReducers ({
    peoples,
    ufs
})