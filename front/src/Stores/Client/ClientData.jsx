import { observable, action, computed } from 'mobx'

export default class ClientData {
    @observable id 
    @observable clientName 
    @observable clientLink 
    @observable brends = [] 
    @observable urlPick 
    constructor(id , clientName , clientLink , brends , urlPick) {
        this.id = id
        this.clientName = clientName
        this.clientLink = clientLink
        this.brends = brends
        this.urlPick = urlPick
    }
}
