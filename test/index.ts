import { SourcedEntity } from '../src'

import { EventEmitter } from 'events'

class Customer2 extends EventEmitter {
  constructor() {
    super()
  }
}

const customer2 = new Customer2()
customer2.on('test', () => {
  console.log('yay')
})
customer2.emit('test')

class Customer extends SourcedEntity {
  id: string
  companyName: string
  constructor(snapshot?, events?) {
    super()
    this.id = null
    this.companyName = null
    this.rehydrate(snapshot, events)
  }

  CreatedEvent(data: { companyName: string }) {
    this.companyName = data.companyName
    this.digest('CreatedEvent', data)
    this.emit('customer.created', data)
  }
}

const customer = new Customer()
customer.on('customer.created', (message) => {
  console.log('yay', message)
})
customer.CreatedEvent({ companyName: 'PDMLab' })
