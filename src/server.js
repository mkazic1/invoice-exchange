import { createServer, Model } from 'miragejs';

const mockedServer = () => {
  createServer({
    models: {
      invoice: Model,
      seller: Model,
      customer: Model,
    },
    seeds(server) {
      server.create('invoice', {
        id: 1,
        sellerName: 'John Doe',
        customerName: 'Jane Smith',
        date: '01/01/2022',
        amount: 100,
        sellerId: 1,
        customerId: 1,
      });
      server.create('seller', {
        id: 1,
        companyName: 'Acme Inc',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('customer', {
        id: 1,
        name: 'Jane',
        surname: 'Smith',
        address: '456 Park Ave',
        age: 30,
      });
    },
    routes() {
      this.namespace = 'api';

      this.get('/invoices', (schema) => schema.invoices.all());
    },
  });
};

export default mockedServer;
