const { response } = require('express');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const API_KEY = process.env.API_KEY;

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

const createContact = async (req, res) => {
  const contact =
  {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDb().collection('contacts').insertOne(contact);
  if(response.acknowledged){
    res.status(201).json({message: 'Contact created', contact: response});
}else{
  res.status(500).json({message: 'There was an Error creating contact', error: err});
}
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: userId }, contact );

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: 'There was an Error updating contact', error: err });
  }
}

const deleteContact = async (req, res) => {
  const userId= new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('contacts').deleteOne({_id: userId}, true);

  if (response.deletedCount > 0) {
      return res.status(200).send();
    }else{
      res.status(500).json({message: 'There was an Error deleting contact', error: err});
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
