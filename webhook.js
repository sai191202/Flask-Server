const express = require('express');
const router = express.Router();
const Event = require('./models/Event');

router.post('/', async (req, res) => {
  const event = req.body;

  let log = {
    author: event.sender?.login,
    timestamp: new Date()
  };

  if (event.pull_request) {
    const pr = event.pull_request;
    log.from_branch = pr.head.ref;
    log.to_branch = pr.base.ref;

    if (event.action === 'opened') {
      log.action = 'PULL_REQUEST';
    } else if (event.action === 'closed' && pr.merged) {
      log.action = 'MERGE';
    }
  } else if (event.ref && event.head_commit) {
    log.action = 'PUSH';
    log.to_branch = event.ref.split('/').pop();
  }

  try {
    await Event.create(log);
    res.status(200).send('Event saved');
  } catch (err) {
    res.status(500).send('Error saving event');
  }
});

module.exports = router;
