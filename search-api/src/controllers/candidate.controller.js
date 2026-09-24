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
    const { q, status, page, pageSize } = req.query;
    const currentPage = parseInt(page ?? 1);
    const currentPageSize = parseInt(pageSize ?? 10);

    const response = candidateService.listCandidates(q, status, currentPage, currentPageSize);

    res.status(HttpStatus.OK).json({
      data: response.list,
      page: currentPage,
      pageSize: currentPageSize,
      total: response.total
    });
  } catch (error) {
    next(error);
  }
};
