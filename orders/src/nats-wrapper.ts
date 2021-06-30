import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _Clients?: Stan;

  get client() {
    if (!this._Clients) {
      throw new Error('Cannot access NATS clients before connectings');
    }
    return this._Clients;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._Clients = nats.connect(clusterId, clientId, { url });

    return new Promise((reject, resolve) => {
      this.client.on('connect', () => {
        console.log('Connected to nats');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
