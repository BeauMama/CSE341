const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res, next) => {
  try {
    console.log('Fetching all contacts...');

    const result = await mongodb.getDb().collection('contacts').find();
    const lists = await result.toArray();

    console.log(`Found ${lists.length} contact(s)`);

    res.status(200).json(lists);
  } catch (err) {
    console.error('Error retrieving contacts:', err);

    res.status(500).json({ message: 'Error retrieving contacts', error: err });
  }
};

const getSingle = async (req, res, next) => {
  const { id } = req.params;

  console.log(`Received request for contact with ID: ${id}`);

  if (!ObjectId.isValid(id)) {
    console.warn(`Invalid ObjectId received: ${id}`);

    return res.status(400).json({ message: 'Invalid ObjectId' });
  }

  try {
    const userId = new ObjectId(id);

    console.log(`Searching for contact with _id: ${userId}`); 

    const contact = await mongodb.getDb().collection('contacts').findOne({ _id: userId });
    
    if (!contact) {
      console.warn(`Contact not found with _id: ${userId}`); 

      return res.status(404).json({ message: 'Contact not found' });
    }
    console.log(`Contact found:`, contact);

    res.status(200).json(contact);
  } catch (err) {
    console.error('Error retrieving contact:', err);

    res.status(500).json({ message: 'Error retrieving contact', error: err });
  }
};

module.exports = { getAll, getSingle };
