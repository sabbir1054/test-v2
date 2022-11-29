const Tour = require('../model/Tour.model');

exports.checkById = async ( id) => {
    const result = await Tour.findById({ _id: id });
    return result;
}

exports.getTourService = async (filters, queries) => {
    const result = await Tour.find(filters)
        .skip(queries.skipArea)
        .skip(queries.limit)
        .select(queries.fields)
        .sort(queries.sort);
    const total = await Tour.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, result};
}

exports.createTourService = async (data) => {
    const result = await Tour.create(data);
    return result;
}

exports.updateTourByIdService = async (id, data) => {
    const result = await Tour.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;
}

exports.getTourDetailsByIdService = async (id, data) => {
    const result = await Tour.findByIdAndUpdate({ _id: id} );
    return result;
}

exports.getTourCheapestService = async () => {
    const result = await Tour.find({}).sort({ price: 1 }).limit(3);
    return result;
}

exports.getTourViewService = async () => {
    const result = await Tour.find({}).sort({ view: 1 }).limit(3);
    return result;
}