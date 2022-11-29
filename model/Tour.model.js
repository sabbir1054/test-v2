const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your tour management'],
        trim: true,
        unique: [true, 'Name must be an unique'],
        minLength: [3, 'At least written name with 3 characters'],
        maxLength: [100, "Can't written name over 100 characters"]
    },
    description: {
        type: String,
        required: [true, 'Must be need a description about management']
    },
    location: {
        type: String,
        required: [true, 'Must be provide a location for management']
    },
    price: {
        type: Number,
        required: [true, 'Must be provided management price'],
        min: [0, 'price can not be less than 0'],
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    view: { 
        type: Number,
        required: [true, 'Must be provide tour view']
    }
});

// mongoose middleware
    tourSchema.pre('save', function (next) {
  
    // this
    console.log('Before saving data');
    if (this.quantity === Number(0)) {
      this.status = 'out-of-stock';
    }
  
    next();
    })
  
    // productSchema.methods.logger = function () {
    //     console.log(`save data for ${this.name}`);
    // }

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;