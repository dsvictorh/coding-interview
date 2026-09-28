import HttpStatus from 'http-status-codes';

import * as candidateService from '../services/candidate.service';



/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const listCandidates = async (req, res, next) => {
  try {
    let { q, status, page, pageSize } = req.query;
    page = parseInt(page ?? 1);
    pageSize = parseInt(pageSize ?? 10);

    if (page < 1) {
      page = 1;
    } else if (page > 50) {
      page = 50
    }

    if (pageSize < 5) {
      pageSize = 5;
    } else if (pageSize > 50) {
      pageSize = 50
    }

    if (!['', 'new', 'contacted', 'interviewing', 'hired'].includes(status)) {
      status = '';
    }

    const response = candidateService.listCandidates(q, status, page, pageSize);

    res.status(HttpStatus.OK).json({
      data: response.list,
      page: page,
      pageSize: pageSize,
      total: response.total
    });
  } catch (error) {
    next(error);
  }
};
