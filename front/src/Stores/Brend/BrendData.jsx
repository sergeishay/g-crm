import { observable } from 'mobx'

export default class BrendData {
    @observable clientBrendId
    @observable id
    @observable clientBrendName
    @observable brendName
    @observable brendLink
    @observable indestry
    @observable dollarCo
    @observable pricing
    @observable owner = []
    @observable paymehod
    @observable posts = []
    constructor(clientBrendId, id, clientBrendName, brendName, brendLink, indestry, dollarCo, pricing, owner, paymehod, posts) {
        this.clientBrendId = clientBrendId
        this.id = id
        this.clientBrendName = clientBrendName
        this.brendName = brendName
        this.brendLink = brendLink
        this.indestry = indestry
        this.dollarCo = dollarCo
        this.pricing = pricing
        this.owner = owner
        this.paymehod = paymehod
        this.posts = posts
    }
}
