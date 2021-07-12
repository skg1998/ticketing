import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // create an instance of ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  //Save the ticket to database
  await ticket.save();

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two seprate change to the ticket we fetch
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 10 });

  //Save the first fetch ticket
  firstInstance!.save();

  //expect(async () => {secondInstance!.save()}).toThrow();

  try {
    await secondInstance!.save();
  } catch (e) {
    return done();
  }

  throw new Error('Should not reach this point');
});
