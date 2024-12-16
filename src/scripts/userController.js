import { db } from '../config/database.js';
import errorFactory from '../utils/errorFactory.js';
import sendResponse from '../utils/sendResponse.js';
import HTTP_STATUS_CODES from '../utils/statusCode.js';


export const getAllUsers = (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) {
            console.error(err);
            const error = errorFactory.getError(err);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }
        sendResponse(res, HTTP_STATUS_CODES.OK, results);
    });
};


export const getUserById = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM User WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error(err);
            const error = errorFactory.getError(err);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }
        if (result.length === 0) {
            const error = errorFactory.notFound();
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(error);
        }
        sendResponse(res, HTTP_STATUS_CODES.OK, result[0]);
    });
};


export const createUser = (req, res) => {
    const { id, name, surname, email, password } = req.body;
    if (!id || !name || !surname || !email || !password) {
        const error = errorFactory.missingFields();
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(error);
    }
    db.query('INSERT INTO User (id, name, surname, email, password) VALUES (?, ?, ?, ?, ?)',
        [id, name, surname, email, password],
        (err) => {
            if (err) {
                console.error(err);
                const error = errorFactory.createError(err);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
            }
            sendResponse(res, HTTP_STATUS_CODES.CREATED);
        });
};


export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, surname, email, password } = req.body;

    if (!name && !surname && !email && !password) {
        const error = errorFactory.missingFields();
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(error);
    }

    db.query(
        'UPDATE User SET name = COALESCE(?, name), surname = COALESCE(?, surname), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?',
        [name, surname, email, password, userId],
        (err, result) => {
            if (err) {
                console.error(err);
                const error = errorFactory.updateError(err);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
            }
            if (result.affectedRows === 0) {
                const error = errorFactory.notFound();
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(error);
            }
            sendResponse(res, HTTP_STATUS_CODES.OK);
        }
    );
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM User WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error(err);
            const error = errorFactory.deleteError(err);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }
        if (result.affectedRows === 0) {
            const error = errorFactory.notFound();
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(error);
        }
        sendResponse(res, HTTP_STATUS_CODES.OK);
    });
};
