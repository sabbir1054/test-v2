const { getTourService, createTourService, updateTourByIdService, checkById, getTourDetailsByIdService, getTourCheapestService, getTourViewService } = require("../services/Tour.service")

exports.getTour = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        // exclude page, sort, limit
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        let queries = {};

        // pagination 
        if (req.query.page) {
            const { page = 1, limit = 7 } = req.query;
            const skip = (page - 1) * parseInt(limit); 
            queries.skip = skip;
            queries.limit = parseInt(limit);
            console.log(queries.skip, queries.limit);
        }
        // fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            console.log(fields);
        }
        // sort by price
        if (req.query.sort) {
            const sort = req.query.sort.split(',').join(' ');
            queries.sort = sort;
            console.log(sort);
        }
        const result = await getTourService(filters,queries);
        res.status(200).json({
            status: 'Successful',
            message: 'Tour get successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Tour could not successfully be get',
            error: error.message
        })
    }
}

exports.createTour = async (req, res, next) => {
    try {
        const result = await createTourService(req.body);
        res.status(200).json({
            status: 'Successful',
            message: 'Tour create successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Tour could not be created successfully',
            error: error.message
        })
    }
}

exports.updateTourById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idValidation = await checkById(id);
        const result = await updateTourByIdService(id, req.body);
        if (!idValidation) {
          res.status(400).json({
            status: 'Failed',
            error: 'Invalid Id, please check your id and provide valid id'
          })
        } else if (!result.modifiedCount) {
          return res.status(400).json({
            status: 'Fail',
            error: "Product could not be updated successfully"
          })
        } else res.status(200).json({
          status: 'successful',
          message: 'Product updated successfully',
          data: result
        })
      } catch (error) {
        res.status(400).json({
          status: 'Failed',
          message: "Product could not be updated successfully",
          error: error.message
        })
    }
}

exports.getTourDetailsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getTourDetailsByIdService(id);
        res.status(200).json({
            status: 'Successful',
            message: 'Tour read successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: "Product could not be updated successfully",
            error: error.message
        })
    }
}

exports.getTourView = async (req, res, next) => {
    try {
        const result = await getTourViewService();
        res.status(200).json({
            status: 'Successful',
            message: 'Successfully get tour filtering by view.',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could not get tour filtering by view',
            error: error.message
        })
    }
}

exports.getTourCheapest = async (req, res, next) => {
    try {
        const result = await getTourCheapestService();
        res.status(200).json({
            status: 'success',
            message: 'Cheapest tour get are successful',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Cheapest tour get are failed',
            error: error
        })
    }
}