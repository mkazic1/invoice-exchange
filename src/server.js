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
        id: 0,
        sellerName: 'Microsoft',
        customerName: 'Medina Kazić',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('invoice', {
        id: 1,
        sellerName: 'Lanaco',
        customerName: 'Jane Smith',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('invoice', {
        id: 2,
        sellerName: 'Facebook',
        customerName: 'Janet Smoor',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('invoice', {
        id: 3,
        sellerName: 'Twitter',
        customerName: 'Elon Musk',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('invoice', {
        id: 4,
        sellerName: 'Instagram',
        customerName: 'Neko Nekić',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('invoice', {
        id: 5,
        sellerName: 'HTC',
        customerName: 'Jan Seal',
        date: '01/01/2022',
        amount: 100,
      });
      server.create('seller', {
        id: 0,
        companyName: 'Microsoft',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('seller', {
        id: 1,
        companyName: 'Facebook',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('seller', {
        id: 2,
        companyName: 'Twitter',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('seller', {
        id: 3,
        companyName: 'Instagram',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('seller', {
        id: 4,
        companyName: 'Lanaco',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('seller', {
        id: 5,
        companyName: 'HTC',
        hqAddress: '123 Main St',
        isActive: true,
      });
      server.create('customer', {
        id: 0,
        name: 'Medina',
        surname: 'Kazić',
        address: '456 Park Ave',
        age: 30,
      });
      server.create('customer', {
        id: 1,
        name: 'Jane',
        surname: 'Smith',
        address: '456 Park Ave',
        age: 30,
      });
      server.create('customer', {
        id: 2,
        name: 'Elon',
        surname: 'Musk',
        address: '456 Park Ave',
        age: 30,
      });
      server.create('customer', {
        id: 3,
        name: 'Janet',
        surname: 'Smoor',
        address: '456 Park Ave',
        age: 30,
      });
      server.create('customer', {
        id: 4,
        name: 'Neko',
        surname: 'Nekić',
        address: '456 Park Ave',
        age: 30,
      });
      server.create('customer', {
        id: 4,
        name: 'Jan',
        surname: 'Seal',
        address: '456 Park Ave',
        age: 30,
      });
    },
    routes() {
      this.namespace = 'api';

      this.get('/invoices', (schema) => schema.invoices.all());
      this.get('/sellers', (schema) => schema.sellers.all());
      this.get('/customers', (schema) => schema.customers.all());

      this.post('/invoices', (schema, request) => {
        const invoice = JSON.parse(request.requestBody);
        return schema.invoices.create(invoice);
      });

      this.delete('/invoices', (schema, request) => {
        const ids = JSON.parse(request.requestBody);
        return schema.invoices.all().filter((invoice) => ids.includes(invoice.id)).destroy();
      });
    },
  });
};

export default mockedServer;
