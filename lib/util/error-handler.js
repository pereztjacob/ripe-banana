module.exports = function createErrorHandler(log = console.log) { //eslint-disable-line

    return (err, req, res, next) => { //eslint-disable-line
        let code = 500;
        let error = 'Internal Server Error';

        if(err.status){
            error = err.error;
        } else if(err.name === 'CastError'){
            code = 400;
            error = err.message;
        } else if(err.name === 'ValidationError') {
            code = 400;
            error = Object.values(err.errors).map(e => e.message);
        } else {
            log(err);
        }

        res.status(code).json({ error });
    };
};