const mongoose = require('mongoose');

const conection = async runCall => {
  try {
    await mongoose
      .connect(
        'mongodb://root:1234@localhost:27017/catalogodb?authSource=admin'
      )
      .then(data => {
        console.log(':: DB connected ::', data.status);
        runCall();
      });
  } catch (error) {
    console.log({error});
  }
};

module.exports = conection;
