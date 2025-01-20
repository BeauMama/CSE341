const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
   

    const result = await mongodb.getDb().collection('contacts').find();
    const lists = await result.toArray();

   

    res.status(200).json(lists);
  } catch (err) {
    

    res.status(500).json({ message: 'Error retrieving contacts', error: err });
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;

   if (!ObjectId.isValid(id)) {
    

    return res.status(400).json({ message: 'Invalid ObjectId' });
  }

  try {
    const userId = new ObjectId(id);

   
    const contact = await mongodb.getDb().collection('contacts').findOne({ _id: userId });
    
    if (!contact) {
     

      return res.status(404).json({ message: 'Contact not found' });
    }
   

    res.status(200).json(contact);
  } catch (err) {
    

    res.status(500).json({ message: 'Error retrieving contact', error: err });
  }
};

module.exports = { getAll, getSingle };
