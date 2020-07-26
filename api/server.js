const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// GET all accounts
server.get('/accounts', async (req, res) => {
  try {
    const allAccounts = await db('accounts');
    
    res.status(200).json({
      status: 'GET_SUCCESS',
      accounts: allAccounts
    })
  }
  catch(err) {
    res.status(500).json({
      error: 'Cannot retrieve data from the server.'
    })
  }
})

server.get('/accounts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const account = await db('accounts').where({ id });

    res.status(200).json({
      status: 'GET_SUCCESS',
      account
    })
  }
  catch(err) {
    res.status(500).json({
      error: 'Cannot retrieve data from the server.'
    })
  }
})

server.post('/accounts', async (req, res) => {
  const queryStr = req.body;
  try {
    const account = await db('accounts').insert(queryStr);
    res.status(200).json({
      status: 'POST_SUCCESS',
      account
    })
  }
  catch(err) {
    res.status(500).json({
      error: 'Cannot retrieve data from the server.'
    })
  }
})

server.put('/accounts/:id', async (req, res) => {
  const id = req.params.id;
  const queryStr = { ...req.body };
  try {
    const account = await db('accounts').where({ id }).update(queryStr);
    res.status(200).json({
      status: 'PUT_SUCCESS',
      account
    })
  }
  catch(err) {
    res.status(500).json({
      error: 'Cannot retrieve data from the server.'
    })
  }
})

server.delete('/accounts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const account = await db('accounts').where({ id }).del();
    res.status(200).json({
      status: 'DELETE_SUCCESS',
      account
    })
  }
  catch(err) {
    res.status(500).json({
      error: 'Cannot retrieve data from the server.'
    })
  }
})

module.exports = server;
