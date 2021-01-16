import React, { Component } from 'react';
import {observable} from 'mobx' ; 
import {createContext} from 'react';



 class ClientStore  {

  render() {
    return (
        <div></div>
           )
  }
}

export const ClientStoreContext = createContext(new ClientStore()) ;