import React from 'react'
import { isNil } from 'lodash'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import StopIcon from 'react-icons/lib/fa/circle'
import ErrorIcon from 'react-icons/lib/fa/exclamation-circle';
import Subreddit from '../../components/Subreddit'
import redditIcon from 'react-icons/lib/fa/reddit'

const API_ENDPOINT = function(keyword) {
  return `https://www.reddit.com/r/${keyword}.json`
}

export default function getFeedConfig(keyword) {
  var name = `${keyword}Subreddit`

  return {
    name,
    itemComponent: Subreddit,
    itemIdKey: 'id',
    itemHeight: 120,
    headerComponent: function() {
      return Header({ name, iconComponent: redditIcon })
    },
    loaderComponent: function() {
      return <Spinner spinnerName="pulse" fadeIn={0} />
    },
    errorComponent () {
      return (
        <span style={{color: 'red'}}>
          <ErrorIcon color='red'/> {' Loading Feed'}
        </span>

      )
    },
    noItemsComponent () {
      return (
        <span>
          <StopIcon color='gray'/>
        </span>
      )
    },
    getItems(results) {
      if (isNil(results)) {
        return []
      } else {
        return results.data.children.map(function (item) {
          return item.data
        })
      }
    },
    getInitialEndpoint(getState) {
      return API_ENDPOINT(keyword)
    },
    updateEndpoint({results}) {
        return `${API_ENDPOINT(keyword)}?after=${results.data.after}`
    },
    hasMoreItems({results}) {
      if (isNil(results)) {
        return false
      }

      return results.data.after ? true : false
    }
  }
}
